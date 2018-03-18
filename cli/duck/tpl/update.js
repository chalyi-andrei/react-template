module.exports = function (name, nameUcFirst, apiModule, apiKey, typeName) {
  return `// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ${typeName} } from '../../../api/modules/${apiModule}';

const UPDATE: '${name}/UPDATE' = '${name}/UPDATE';
export const UPDATE_SUCCESS: '${name}/UPDATE_SUCCESS' = '${name}/UPDATE_SUCCESS';
const UPDATE_FAILURE: '${name}/UPDATE_FAILURE' = '${name}/UPDATE_FAILURE';

type UpdateT = {
  type: typeof UPDATE,
};
// @TODO Check result format
export type UpdateSuccessT = {
  type: typeof UPDATE_SUCCESS,
  result: {
    data: ${typeName},
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

export default function ${name}UpdateReducer(state: StateT = initialState, action: ActionTypeT): StateT {
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
export function update${nameUcFirst}(data: ${typeName}): ApiRequestT<${typeName}> {
  return {
    type: API_REQUEST,
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE],
    // @TODO Check api path
    call: () => api().${apiKey}.update(data),
  };
}
`;
};
