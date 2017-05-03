import * as NavigationActions from './navigation';
import * as PostsActions from './posts';

export const ActionCreators = Object.assign({},
  NavigationActions,
  PostsActions,
);

export default ActionCreators;
