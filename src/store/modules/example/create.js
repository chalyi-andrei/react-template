// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ExampleT } from '../../../api/modules/users';

const CREATE: 'example/CREATE' = 'example/CREATE';
export const CREATE_SUCCESS: 'example/CREATE_SUCCESS' = 'example/CREATE_SUCCESS';
const CREATE_FAILURE: 'example/CREATE_FAILURE' = 'example/CREATE_FAILURE';

type CreateT = {
  type: typeof CREATE,
};
export type CreateSuccessT = {
  type: typeof CREATE_SUCCESS,
  result: {
    data: ExampleT,
  },
};
type CreateFailureT = {
  type: typeof CREATE_FAILURE,
  error: {
    message: string,
  },
};

type ActionTypeT = CreateT | CreateSuccessT | CreateFailureT;

export type StateT = {
  creating: boolean,
  error: ?string,
}

const initialState: StateT = {
  creating: false,
  error: null,
};

export default function exampleCreateReducer(state: StateT = initialState, action: ActionTypeT): StateT {
  switch (action.type) {
    case CREATE:
      return {
        ...initialState,
        creating: true,
      };

    case CREATE_SUCCESS:
      return {
        ...initialState,
      };

    case CREATE_FAILURE:
      return {
        ...initialState,
        error: action.error.message,
      };

    default:
      return state;
  }
}

// @TODO Check params
export function createExample(data: $Shape<ExampleT>): ApiRequestT<ExampleT> {
  return {
    type: API_REQUEST,
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE],
    // @TODO Check api path
    call: () => api().example.create(data),
  };
}
