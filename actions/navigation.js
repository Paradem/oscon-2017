import * as types from './types'

export function navigateBack(dispatch) {
  return {
    type: types.NAVIGATE_BACK,
  }
}

export function navigateHome() {
  return {
    type: types.NAVIGATE_HOME,
  }
}
