// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ExampleT } from '../../../api/modules/example';

const UPDATE: 'example/UPDATE' = 'example/UPDATE';
export const UPDATE_SUCCESS: 'example/UPDATE_SUCCESS' = 'example/UPDATE_SUCCESS';
const UPDATE_FAILURE: 'example/UPDATE_FAILURE' = 'example/UPDATE_FAILURE';

type UpdateT = {
  type: typeof UPDATE,
};
// @TODO Check result format
export type UpdateSuccessT = {
  type: typeof UPDATE_SUCCESS,
  result: {
    data: ExampleT,
  },
};
type UpdateFailureT = {
  type: typeof UPDATE_FAILURE,
  error: {
    message: string,
  },
};

type ActionTypeT = UpdateT | UpdateSuccessT | UpdateFailureT;

export type StateT = {
  updating: boolean,
  error: ?string,
}

const initialState: StateT = {
  updating: false,
  error: null,
};

export default function exampleUpdateReducer(state: StateT = initialState, action: ActionTypeT): StateT {
  switch (action.type) {
    case UPDATE:
      return {
        ...initialState,
        updating: true,
      };

    case UPDATE_SUCCESS:
      return {
        ...initialState,
      };

    case UPDATE_FAILURE:
      return {
        ...initialState,
        error: action.error.message,
      };

    default:
      return state;
  }
}

// @TODO Check params
export function updateExample(data: ExampleT): ApiRequestT<ExampleT> {
  return {
    type: API_REQUEST,
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE],
    // @TODO Check api path
    call: () => api().example.update(data),
  };
}
