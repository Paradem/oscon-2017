import { StacksOverTabs } from '../routes'
import * as types from '../actions/types'
import {
  Platform,
} from 'react-native';
import {
  NavigationActions,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

export const AppNavigator = StackNavigator(StacksOverTabs, {
  initialRouteName: 'Root',
  headerMode: 'none',
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
});

const initialNavState = {
	index: 0,
	routes: [
    {
			key: 'Root', routeName: 'Root', routes: [
				{ key: "HomeTab", routeName: "HomeTab" },
				{ key: "MapTab", routeName: "MapTab" }
			],
			index: 0
		},
	]
}

export const navigationReducer = {
  nav: (state = initialNavState, action) => {
    switch (action.type) {
      case 'Navigation/NAVIGATE':
        return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: action.routeName, id: action.id }), state);
      case types.NAVIGATE_BACK:
        return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      case types.NAVIGATE_HOME:
        const resetState = {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Root'})
          ]
        }
        return AppNavigator.router.getStateForAction(NavigationActions.reset(resetState), state);
      default:
        return state;
    }
    return AppNavigator.router.getStateForAction(action, state);
  }
};
