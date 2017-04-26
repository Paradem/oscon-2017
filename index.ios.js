import React from 'react'
import {
  AppRegistry,
  AppState,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createLogger from 'redux-logger'
import {  reducer } from './reducers'
import { AppNavigator } from './reducers/navigation'
import {
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const AppWithNavigationState = connect(state => ({
  nav: state.nav,
}))(({ dispatch, nav }) => {
    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  }
);


const App = () => (
  <Provider store={configureStore({})}>
    <AppWithNavigationState />
  </Provider>
)

AppRegistry.registerComponent('Plimage', () => App);
