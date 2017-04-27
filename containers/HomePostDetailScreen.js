import React from 'react'
import { styles, colors, palette } from "../styles";
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
		  <Text>{post.name}</Text>
			<View>
				<MapView style={[styles.map, {flex: 1}]}
					initialRegion={this.getLocationRegion(post)}
					showsUserLocation={true}
					zoomEnabled={false}
					scrollEnabled={false}
					rotateEnabled={false}
					legalLabelInsets={{bottom: 20, right: 20}} >
				 <MapView.Marker coordinate={this.annotation(post)}  />
				</MapView>
			</View>
			<Button onPress={() => this.backPressed() } title='Back' />
			<Button onPress={() => this.deletePressed() } title='Delete' />
		</View>
	}

	getLocationRegion(post) {
		const delta = 0.1
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
			title: post.name ,
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
	postName: {
		fontSize: 21,
	},
	postCard: {
		marginBottom: 10,
		marginHorizontal: 7,
		backgroundColor: "#FFFFFF",
		shadowColor: "#F00",
		shadowOffset: { height: 2, width: -0},
		shadowRadius: 4,
		borderRadius: 10,
		shadowOpacity: 0.15,
		padding: 0,
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
