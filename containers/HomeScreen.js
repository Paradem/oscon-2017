import React from 'react';
import {
  AppState,
  AsyncStorage,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from '../styles';
import { ActionCreators } from '../actions';

class Screen extends React.Component {

  constructor(props) {
    super(props);
    AppState.addEventListener('change', (state) => {
      if (state === 'inactive') {
        AsyncStorage.setItem('@Backup:posts', JSON.stringify(this.props.posts));
      }
    });

    this.postPressed = this.postPressed.bind(this);
  }

  componentWillMount() {
    // run on first launch!
    AsyncStorage.getItem('@Backup:posts').then((postsFromStorage) => {
      if (postsFromStorage !== null && this.posts().length === 0) {
        this.props.restorePosts(postsFromStorage);
      }
    });
  }

  postPressed(post) {
    this.props.navigatePostDetail(post);
  }

  posts() {
    return this.props.posts;
  }

  renderEmpty() {
    if (this.posts().length > 0) { return null; }
    return (<View style={styles.postCard}>
      <Text style={styles.heading2}>Nothing to see here...</Text>
    </View>);
  }

  renderPost(post) {
    return (<View key={post.id} style={styles.postCard}>
      <Text style={styles.heading2}>{post.name}</Text>
      <TouchableHighlight onPress={() => this.postPressed(post)}>
        <Image
          key={post.path + post.tinted}
          source={{ uri: post.path }} style={{ height: 150 }}
        />
      </TouchableHighlight>
    </View>);
  }

  render() {
    return (<View style={styles.container}>
      <Text style={styles.heading1} >My Photos</Text>
      <ScrollView style={styles.scrollSection} >
        { this.renderEmpty() }
        { this.posts().map(post => this.renderPost(post)) }
      </ScrollView>
    </View>);
  }
}

Screen.propTypes = {
  navigatePostDetail: React.PropTypes.func.isRequired,
  restorePosts: React.PropTypes.func.isRequired,
  posts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
