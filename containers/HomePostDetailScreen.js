import React from 'react'
import { styles, palette } from "../styles";
import {
  AppState,
  AsyncStorage,
  Button,
  Image,
	ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

	backPressed() {
		this.props.navigateBack();
  }

	deletePressed() {
		this.props.deletePost(this.post());
		// NOTE: this could be handled in the ActionCreator with Saga or Thunk:
    AsyncStorage.setItem('@Backup:posts', JSON.stringify(this.props.posts) ).then( () => {
      this.props.navigateHome();
    });
	}

	post() {
		const postId = this.props.nav.routes[this.props.nav.index].id;
		return postId && this.props.posts.find((post) => post.id === postId );
	}

	renderEmpty() {
		return <View style={styles.container}></View>
	}

	render() {
		const post = this.post();
		if (post === undefined) { return this.renderEmpty(); }
		return <View style={styles.container}>
      <Text style={styles.heading1} >{post.name}</Text>
			<View style={styles.postCard} >
        <Image source={ { uri: post.path } } style={ { height: 150 }  } />
				<MapView style={screenStyles.map}
					initialRegion={this.getLocationRegion(post)}
					showsUserLocation={true}
					zoomEnabled={false}
					scrollEnabled={false}
					rotateEnabled={false}
					legalLabelInsets={{bottom: 20, right: 20}} >
				 <MapView.Marker coordinate={this.annotation(post)}  />
				</MapView>
        <View style={styles.toolbar}>
          <PrimaryButton label="Back" onPress={ () => this.backPressed() } />
          <SecondaryButton label="Delete" onPress={ () => this.deletePressed() } />
        </View>
			</View>
		</View>
	}

	getLocationRegion(post) {
		const delta = 0.01
		return {
			latitude: post.coordinate.latitude || 1,
			longitude: post.coordinate.longitude || 1,
			latitudeDelta: delta,
			longitudeDelta: delta,
		}
	}

	annotation(post) {
		return {
			id: post.id,
			latitude: post.coordinate.latitude || 1,
			longitude: post.coordinate.longitude || 1,
		}
	}

}

function mapStateToProps(state) {
  return {
		posts: state.posts,
		nav: state.nav
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const screenStyles = StyleSheet.create({
  map: {
    height: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
