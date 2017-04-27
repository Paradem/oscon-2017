import * as types from '../actions/types'

const initialState = []
export const postsReducer = {
  posts: (state = initialState, action) => {
    switch (action.type) {
      case types.DELETE_POST:
        return state.filter( (post) => post.id !== action.post.id );

      case types.SET_POSTS:
        return action.posts;

      case types.CREATE_POST:
        id = `p_${action.post.coordinate.latitude}_${action.post.coordinate.longitude}`
        path = action.post.path || placeholderPath();
        return [ ...state , { ...action.post, id, path } ];

      default:
        return state;
    }
  }
};

function placeholderPath() {
  return "https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150"
}
