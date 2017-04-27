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

	renderEmpty() {
    if (this.posts().length > 0) { return null; }
    return <View style={screenStyles.postCard}>
      <Text style={styles.heading2}>Nothing to see here...</Text>
    </View>
  }

  renderPost(post) {
    return <View key={post.id} style={styles.postCard}>
      <Text style={styles.heading2}>{post.name}</Text>
      <TouchableHighlight onPress={ () => this.postPressed(post) }>
        <Image source={ { uri: post.path } } style={ { height: 150 }  } />
      </TouchableHighlight>
    </View>
  }

	render() {
		return <View style={styles.container}>
      <Text style={styles.heading1} >My Photos</Text>
			<ScrollView style={styles.scrollSection} >
			  { this.renderEmpty() }
				{ this.posts().map( (post) => this.renderPost(post) ) }
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

});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
