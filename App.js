import React, {Component} from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Library from './pages/Library'
import EditFolder from './pages/EditFolder'
import EditNote from './pages/EditNote'

import ErrorBoundary from "./pages/ErrorBoundary"

import { createStore } from 'redux'
import { saveLibraryToJSON } from './common_functions.js'

const initialState = {
  library: {
    childs: []
  }
}

function reduser(state, action) {

  function getNeedFolder (state, path_string) {
    let path = path_string.split('.')
    let need_folder = state.library

    for(let i = 0, length = path.length; i < length; i++) {
      need_folder = need_folder.childs[path[i]]
    }
    return need_folder
  }

  switch (action.type) {
    case 'INITIATE_LIBRARY': {
      state.library = action.library.library
      return state
    }
    case 'ADD_CHILD': {
      if(action.path.length === 0) {
        state.library.childs.push(action.child)
      }
      else {
        let need_folder = getNeedFolder(state, action.path)
        need_folder.childs.push(action.child)
      }
      saveLibraryToJSON(state)
      return state
    }
    case 'DELETE_CHILD': {
      if(action.path.length === 0) {
        state.library.childs.splice(action.delete_path , 1)
      }
      else {
        let need_folder = getNeedFolder(state, action.path)
        need_folder.childs.splice(action.delete_path , 1)
      }
      saveLibraryToJSON(state)
      return state
    }
    case 'RENAME': {
      let need_folder = getNeedFolder(state, action.path)
      need_folder.name = action.name
      saveLibraryToJSON(state)
      return state
    }
    case 'EDIT_NOTE_DESCRIPTION': {
      let need_folder = getNeedFolder(state, action.path)
      need_folder.description = action.description
      saveLibraryToJSON(state)
      return state
    }
    case 'MOVE': {
      let selected_folder = getNeedFolder(state, action.selected_path)

      if(action.target.length === 0) {
        state.library.childs.push(selected_folder)
      }
      else {
        let new_folder_parent = getNeedFolder(state, action.target)
        new_folder_parent.childs.push(selected_folder)
      }

      if(action.parent_path.length === 0) {
        state.library.childs.splice(action.selected_path, 1)
      }
      else {
        let need_folder = getNeedFolder(state, action.parent_path)
        need_folder.childs.splice(action.selected_path.slice(-1), 1)
      }

      saveLibraryToJSON(state)

      return state
    }
    default: return state
  }

}
const store = createStore(reduser, initialState)

const RootStack = createStackNavigator(
  {
    Library: Library,
    EditFolder: EditFolder,
    EditNote: EditNote
  },
  {
    initialRouteName: 'Library',
    headerMode: 'none'
  },
)



const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <AppContainer screenProps={store} />
      </ErrorBoundary>
    )
  }
}
