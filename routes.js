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
import HomePostDetailScreen from './containers/HomePostDetailScreen';
import { palette } from './styles';

const mapRoutes = {
  MapIndex: {
    screen: MapScreen,
  },
  MapPost: {
    screen: MapPostScreen,
    navigationOptions: {
      title: null,
    },
  },
};

export const TabNav = TabNavigator({
  HomeTab: {
    screen: HomeScreen,
    navigationOptions: {
      tabBar: {
        label: 'Home',
        icon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  MapTab: {
    screen: MapScreen,
    navigationOptions: {
      title: null,
      tabBar: {
        label: 'Map',
        icon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
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
  PostDetail: {
    screen: HomePostDetailScreen,
    navigationOptions: ({ _navigation }) => {
      'navigation.state.params.name s Profile!';
    },
  },
};
