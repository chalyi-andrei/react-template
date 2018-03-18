module.exports = function (name, nameUcFirst, apiModule, apiKey, typeName) {
  return `// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ${typeName} } from '../../../api/modules/${apiModule}';

const CREATE: '${name}/CREATE' = '${name}/CREATE';
export const CREATE_SUCCESS: '${name}/CREATE_SUCCESS' = '${name}/CREATE_SUCCESS';
const CREATE_FAILURE: '${name}/CREATE_FAILURE' = '${name}/CREATE_FAILURE';

type CreateT = {
  type: typeof CREATE,
};
export type CreateSuccessT = {
  type: typeof CREATE_SUCCESS,
  result: {
    data: ${typeName},
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

export default function ${name}CreateReducer(state: StateT = initialState, action: ActionTypeT): StateT {
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
export function create${nameUcFirst}(data: $Shape<${typeName}>): ApiRequestT<${typeName}> {
  return {
    type: API_REQUEST,
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE],
    // @TODO Check api path
    call: () => api().${apiKey}.create(data),
  };
}
`;
}
