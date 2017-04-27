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
        const newPost = { ...action.post, id }
        return [ ...state , newPost ];
      default:
        return state;
    }
  }
};
