/* eslint no-console: 0
 */
import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeAppEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView from 'react-native-maps';

import { styles } from '../styles';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import { ActionCreators } from '../actions';

const screenStyles = StyleSheet.create({
  map: {
    height: 100,
  },
});

function getLocationRegion(post) {
  const delta = 0.01;
  return {
    latitude: post.coordinate.latitude || 1,
    longitude: post.coordinate.longitude || 1,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
}

function annotation(post) {
  return {
    id: post.id,
    latitude: post.coordinate.latitude || 1,
    longitude: post.coordinate.longitude || 1,
  };
}

class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.renderEmpty = this.renderEmpty.bind(this);
  }

  componentDidMount() {
    NativeAppEventEmitter.addListener('photoTinted', (path) => {
      this.props.setPostTinted(path);
    });
  }

  componentWillUnmount() {
    NativeAppEventEmitter.removeListener('photoTinted');
  }

  backPressed() {
    this.props.navigateBack();
  }

  deletePressed() {
    this.props.deletePost(this.props.post);
    // NOTE: this could be handled in the ActionCreator with Saga or Thunk:
    AsyncStorage.setItem('@Backup:posts', JSON.stringify(this.props.posts)).then(() => {
      this.props.navigateHome();
    }).catch(err => console.warn(err));
  }

  tint() {
    NativeModules.Sepiafy.tint(this.props.post.path);
  }

  renderEmpty() {
    return (<View style={styles.container} >
      <PrimaryButton label="Back" onPress={() => this.backPressed()} />
    </View>);
  }

  render() {
    const post = this.props.post;
    if (!post) { return (this.renderEmpty()); }
    return (<View style={styles.container}>
      <Text style={styles.heading1} >{post.name}</Text>
      <View style={styles.postCard} >
        <Image
          key={post.path + post.tinted}
          source={{ uri: post.path }} style={{ height: 150 }}
        />
        <MapView
          style={screenStyles.map}
          initialRegion={getLocationRegion(post)}
          showsUserLocation
          zoomEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          legalLabelInsets={{ bottom: 20, right: 20 }}
        >
          <MapView.Marker coordinate={annotation(post)} />
        </MapView>
        <View style={styles.toolbar}>
          { (post.tinted === false && Platform.OS === 'ios') ?
            <PrimaryButton label="Westernize" onPress={() => this.tint()} /> : null }
          <PrimaryButton label="Back" onPress={() => this.backPressed()} />
          <SecondaryButton label="Delete" onPress={() => this.deletePressed()} />
        </View>
      </View>
    </View>);
  }
}

Screen.propTypes = {
  navigateBack: React.PropTypes.func.isRequired,
  navigateHome: React.PropTypes.func.isRequired,
  deletePost: React.PropTypes.func.isRequired,
  setPostTinted: React.PropTypes.func.isRequired,
  posts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  post: React.PropTypes.shape({
    path: React.PropTypes.string,
    tinted: React.PropTypes.bool,
    name: React.PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  const params = state.nav.routes[state.nav.index].params;
  const post = params ? state.posts.find(postInStore => postInStore.id === params.id) : null;
  return {
    post,
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
