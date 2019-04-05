import React, {Component} from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Library from './pages/Library'
import EditFolder from './pages/EditFolder'

import { createStore } from 'redux'
import { saveLibraryToJSON } from './common_functions.js'

const initialState = {
  library: {
    childs: []
  }
}

function reduser(state, action) {

  function getNeedFolder (state, action) {
    let path = action.path.split('.')
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
        let need_folder = getNeedFolder(state, action)
        need_folder.childs.push(action.child)
      }
      saveLibraryToJSON(state)
      return state
    }
    case 'DELETE_CHILD': {
      return state.count - action.amount
    }
    case 'RENAME': {
      let need_folder = getNeedFolder(state, action)
      need_folder.name = action.name
      saveLibraryToJSON(state)
      return state
    }
    default: return state
  }

}

const store = createStore(reduser, initialState)




const incrementAction = {
  type: 'INCREMENT',
  amount: 1
}
const decrementAction = {
  type: 'DECREMENT',
  amount: 1
}

const increment = () => {
  store.dispath(incrementAction)
}

const decrement = () => {
  store.dispath(decrementAction)
}






const RootStack = createStackNavigator(
  {
    Library: Library,
    EditFolder: EditFolder
  },
  {
    initialRouteName: 'Library',
    headerMode: 'none'
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer screenProps={store} />
  }
}
