/* eslint react/prop-types: 0
 */
import React from 'react';
import {
  TabNavigator,
} from 'react-navigation';
import {
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './containers/HomeScreen';
import MapScreen from './containers/MapScreen';
import MapPostScreen from './containers/MapPostScreen';
import { palette } from './styles';

const TabBarIcon = props =>
  <Ionicons
    name={props.focused ? props.focusedName : props.unfocusedName}
    size={26}
    style={{ color: props.tintColor }}
  />;

TabBarIcon.propTypes = {
  focused: React.PropTypes.bool.isRequired,
  focusedName: React.PropTypes.string.isRequired,
  unfocusedName: React.PropTypes.string.isRequired,
  tintColor: React.PropTypes.string.isRequired,
};

export const TabNav = TabNavigator({
  HomeTab: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (<TabBarIcon
        focused={focused}
        tintColor={tintColor}
        focusedName="ios-home"
        unfocusedName="ios-home-outline"
      />),
    },
  },
  MapTab: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor, focused }) => (<TabBarIcon
        focused={focused}
        tintColor={tintColor}
        focusedName="ios-settings"
        unfocusedName="ios-settings-outline"
      />),
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? palette.RICH_NAVY : '#fff',
  },
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});


export const StacksOverTabs = {
  Root: {
    screen: TabNav,
  },
  MapPost: {
    screen: MapPostScreen,
    navigationOptions: {
      title: 'Notification Settings',
    },
  },
};
