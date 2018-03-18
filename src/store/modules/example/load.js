// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ExampleT } from '../../../api/modules/example';

const LOAD: 'example/LOAD' = 'example/LOAD';
export const LOAD_SUCCESS: 'example/LOAD_SUCCESS' = 'example/LOAD_SUCCESS';
const LOAD_FAILURE: 'example/LOAD_FAILURE' = 'example/LOAD_FAILURE';

type LoadT = {
  type: typeof LOAD,
};
// @TODO Check result format
export type LoadSuccessT = {
  type: typeof LOAD_SUCCESS,
  result: {
    data: Array<ExampleT>,
  },
};
type LoadFailureT = {
  type: typeof LOAD_FAILURE,
  error: {
    message: string,
  },
};

type ActionTypeT = LoadT | LoadSuccessT | LoadFailureT;

export type StateT = {
  loading: boolean,
  loaded: boolean,
  error: ?string,
}

const initialState: StateT = {
  loading: false,
  loaded: false,
  error: null,
};

export default function exampleDataReducer(state: StateT = initialState, action: ActionTypeT): StateT {
  switch (action.type) {
    case LOAD:
      return {
        ...initialState,
        loading: true,
      };

    case LOAD_SUCCESS:
      return {
        ...initialState,
        loaded: true,
      };

    case LOAD_FAILURE:
      return {
        ...initialState,
        error: action.error.message,
      };

    default:
      return state;
  }
}

// @TODO Check params
export function loadExample(): ApiRequestT<Array<ExampleT>> {
  return {
    type: API_REQUEST,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    // @TODO Check api path
    call: () => api().example.get(),
  };
}
