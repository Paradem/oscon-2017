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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { NAV } from "../actions/types"

class Screen extends React.Component {

  constructor(props) {
    super(props);
    AppState.addEventListener('change', (state) => {
      if (state === "inactive") {
        AsyncStorage.setItem('@Backup:posts', JSON.stringify(this.props.posts) );
      }
    });

    this.postPressed = this.postPressed.bind(this);
  }

	componentWillMount() {
		// run on first launch!
		AsyncStorage.getItem('@Backup:posts').then((postsFromStorage) => {
			if (postsFromStorage !== null && this.posts().length === 0){
			  this.props.restorePosts(postsFromStorage);
			}
		});
	}

	postPressed(post) {
		this.props.navigation.dispatch( { type: "Navigation/NAVIGATE", routeName: "PostDetail",  id: post.id } );
  }

	posts() {
	  return this.props.posts;
	}

  renderPost(post) {
    return <View key={post.id} style={screenStyles.postCard}>
      <Text style={screenStyles.postName}>{post.name}</Text>
      <TouchableHighlight onPress={ () => this.postPressed(post) }>
      <Image source={ {
        uri: ( post.path ? post.path : "https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150" ) } }
    style={ { height: 150 }  } />
      </TouchableHighlight>
      <Text>{post.coordinate.latitude}, {post.coordinate.longitude}</Text>
    </View>
  }

	render() {
		return <View style={styles.container}>
			<ScrollView style={styles.scrollSection} >
				{ this.posts().map( (post) => { return this.renderPost(post) } ) }
			</ScrollView>
		</View>
	}
}
function mapStateToProps(state) {
  return {
		posts: state.posts
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
		backgroundColor: palette.WHITE,
		borderRadius: 10,
		paddingTop: 10,
		paddingBottom: 10,
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
