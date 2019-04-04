import React, {Component} from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Library from './pages/Library'
import EditFolder from './pages/EditFolder'

import { createStore } from 'redux'

const initialState = {
  library: {
    childs: []
  }
}

function reduser(state, action) {

  switch (action.type) {
    case 'INITIATE_LIBRARY': {
      console.log('action.library', action.library)
      state.library.childs = action.library
      return state
    }
    case 'ADD_CHILD': {
      state.library.push(action.child)
      return state
    }
    case 'DELETE_CHILD': {
      return state.count - action.amount
    }
    case 'RENAME': {
      return state.count - action.amount
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
