import * as types from './types';

export function setDraftPostCoordinates(coordinate) {
  return {
    type: types.SET_DRAFT_POST_PARAMS,
    params: {
      coordinate: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    },
  };
}

export function setDraftPostName(name) {
  return {
    type: types.SET_DRAFT_POST_PARAMS,
    params: {
      name,
    },
  };
}
