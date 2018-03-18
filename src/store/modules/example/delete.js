// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ExampleT } from '../../../api/modules/example';

const DELETE: 'example/DELETE' = 'example/DELETE';
export const DELETE_SUCCESS: 'example/DELETE_SUCCESS' = 'example/DELETE_SUCCESS';
const DELETE_FAILURE: 'example/DELETE_FAILURE' = 'example/DELETE_FAILURE';

type DeleteT = {
  type: typeof DELETE,
};
export type DeleteSuccessT = {
  type: typeof DELETE_SUCCESS,
  result: {
    data: ExampleT,
  },
};
type DeleteFailureT = {
  type: typeof DELETE_FAILURE,
  error: {
    message: string,
  },
};

type ActionTypeT = DeleteT | DeleteSuccessT | DeleteFailureT;

export type StateT = {
  deleting: boolean,
  error: ?string,
}

const initialState: StateT = {
  deleting: false,
  error: null,
};

export default function exampleDeleteReducer(state: StateT = initialState, action: ActionTypeT): StateT {
  switch (action.type) {
    case DELETE:
      return {
        ...initialState,
        deleting: true,
      };

    case DELETE_SUCCESS:
      return {
        ...initialState,
      };

    case DELETE_FAILURE:
      return {
        ...initialState,
        error: action.error.message,
      };

    default:
      return state;
  }
}

// @TODO Check params
export function deleteExample(id: number): ApiRequestT<ExampleT> {
  return {
    type: API_REQUEST,
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    // @TODO Check api path
    call: () => api().example.delete(id),
  };
}
