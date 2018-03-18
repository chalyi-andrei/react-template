module.exports = function (name, nameUcFirst, apiModule, apiKey, typeName) {
  return `// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ${typeName} } from '../../../api/modules/${apiModule}';

const DELETE: '${name}/DELETE' = '${name}/DELETE';
export const DELETE_SUCCESS: '${name}/DELETE_SUCCESS' = '${name}/DELETE_SUCCESS';
const DELETE_FAILURE: '${name}/DELETE_FAILURE' = '${name}/DELETE_FAILURE';

type DeleteT = {
  type: typeof DELETE,
};
export type DeleteSuccessT = {
  type: typeof DELETE_SUCCESS,
  result: {
    data: ${typeName},
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

export default function ${name}DeleteReducer(state: StateT = initialState, action: ActionTypeT): StateT {
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
export function delete${nameUcFirst}(id: number): ApiRequestT<${typeName}> {
  return {
    type: API_REQUEST,
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    // @TODO Check api path
    call: () => api().${apiKey}.delete(id),
  };
}
`;
}
