/* global navigator */
/* eslint no-console: 0
 */
import React from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { styles } from '../styles';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const screenStyles = StyleSheet.create({
  pinOptionButton: {

  },
  pinOptionCard: Platform.select({
    ios: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      width,
      bottom: 0,
    },
    android: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      width,
      bottom: -10,
    },
  }),
});

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.onMapPress = this.onMapPress.bind(this);
    this.state = {
      pin: null,
      initialPosition: null,
      pinActionTabHeight: new Animated.Value(),
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position.coords;
        this.setState({ initialPosition });
      },
      error => console.log(JSON.stringify(error)),
    );
  }

  onMapPress(e) {
    this.setState({ pin: e.nativeEvent.coordinate });
    this.state.pinActionTabHeight.setValue(0);
    Animated.spring(
      this.state.pinActionTabHeight,
      {
        toValue: 80,
        friction: 3,
      },
    ).start();
  }

  onCancel() {
    Animated.timing(
      this.state.pinActionTabHeight,
      {
        toValue: 0,
        duration: 300,
      },
    ).start(() => this.setState({ pin: null }));
  }

  attachPhoto() {
    this.props.navigateMapPost();
  }

  showActions() {
    if (this.state.pin) {
      return (
        <Animated.View
          style={[screenStyles.pinOptionCard, { height: this.state.pinActionTabHeight }]}
        >
          <Button style={screenStyles.pinOptionButton} onPress={() => this.attachPhoto()} title="Attach Photo" />
          <Button style={screenStyles.pinOptionButton} onPress={() => this.onCancel()} title="Cancel" />
        </Animated.View>
      );
    }

    return null;
  }

  render() {
    if (this.state.initialPosition === null) { return (<View style={styles.mapContainer} />); }
    return (
      <View style={styles.mapContainer} >
        <Text>Map goes here</Text>
        {this.showActions()}
      </View>
    );
  }
}

Screen.propTypes = {
  navigateMapPost: React.PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Screen);
