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

export function navigatePostDetail(post) {
  return {
    type: 'Navigation/NAVIGATE',
    routeName: 'PostDetail',
    id: post.id,
  };
}

export function navigateMapPost() {
  return {
    type: 'Navigation/NAVIGATE',
    routeName: 'MapPost',
  };
}
