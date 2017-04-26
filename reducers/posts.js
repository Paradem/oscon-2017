import * as types from '../actions/types'

const initialState = {
}

export const postsReducer = {
  posts: (state = initialState, action) => {
    switch (action.type) {
      case types.DELETE_POST:
				delete state[action.post.id]
        return Object.assign({}, state);
      case types.SET_POSTS:
        return action.posts;
      case types.CREATE_POST:
        id = `p_${action.post.coordinate.latitude}_${action.post.coordinate.longitude}`
        state[id] = Object.assign({id}, action.post);
        return state;
      default:
        return state;
    }
  }
};

