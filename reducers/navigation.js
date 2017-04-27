import {
  Platform,
} from 'react-native';
import {
  NavigationActions,
  StackNavigator,
} from 'react-navigation';

import { StacksOverTabs } from '../routes';
import * as types from '../actions/types';

export const AppNavigator = StackNavigator(StacksOverTabs, {
  initialRouteName: 'Root',
  headerMode: 'none',
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
});

const initialNavState = {
  index: 0,
  routes: [
    {
      key: 'Root',
      routeName: 'Root',
      routes: [
        { key: 'HomeTab', routeName: 'HomeTab' },
        { key: 'MapTab', routeName: 'MapTab' },
      ],
      index: 0,
    },
  ],
};

function navigateAction({ routeName, id }) {
  return NavigationActions.navigate({ routeName, params: { id } });
}

export const navigationReducer = {
  nav: (state = initialNavState, action) => {
    switch (action.type) {
      case 'Navigation/NAVIGATE':
        return AppNavigator.router.getStateForAction(navigateAction(action), state);
      case types.NAVIGATE_BACK:
        return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      case types.NAVIGATE_HOME: {
        const resetState = {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Root' }),
          ],
        };
        return AppNavigator.router.getStateForAction(NavigationActions.reset(resetState), state);
      }
      default:
        return state;
    }
  },
};
