import * as NavigationActions from './navigation'
import * as DraftPostActions from './draftPost'
import * as PostsActions from './posts'

export const ActionCreators = Object.assign({},
  NavigationActions,
  DraftPostActions,
  PostsActions,
);
