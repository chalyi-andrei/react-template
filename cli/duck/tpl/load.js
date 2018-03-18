module.exports = function (name, nameUcFirst, apiModule, apiKey, typeName) {
  return `// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';
import type { ApiRequestT } from '../../apiAction';
// @TODO Check type name and import path
import type { ${typeName} } from '../../../api/modules/${apiModule}';

const LOAD: '${name}/LOAD' = '${name}/LOAD';
export const LOAD_SUCCESS: '${name}/LOAD_SUCCESS' = '${name}/LOAD_SUCCESS';
const LOAD_FAILURE: '${name}/LOAD_FAILURE' = '${name}/LOAD_FAILURE';

type LoadT = {
  type: typeof LOAD,
};
// @TODO Check result format
export type LoadSuccessT = {
  type: typeof LOAD_SUCCESS,
  result: {
    data: Array<${typeName}>,
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

export default function ${name}DataReducer(state: StateT = initialState, action: ActionTypeT): StateT {
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
export function load${nameUcFirst}(): ApiRequestT<Array<${typeName}>> {
  return {
    type: API_REQUEST,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    // @TODO Check api path
    call: () => api().${apiKey}.get(),
  };
}
`;
};
