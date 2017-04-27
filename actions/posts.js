import * as types from './types';

export function createPost(post) {
  return {
    type: types.CREATE_POST,
    post,
  };
}

export function deletePost(post) {
  return {
    type: types.DELETE_POST,
    post,
  };
}

export function restorePosts(posts) {
  return {
    type: types.SET_POSTS,
    posts: JSON.parse(posts),
  };
}
