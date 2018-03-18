// @flow
export const SIGN_UP: "auth/SIGN_UP" = "auth/SIGN_UP";
export const SIGN_UP_SUCCESS: "auth/SIGN_UP_SUCCESS" = "auth/SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED: "auth/SIGN_UP_FAILED" = "auth/SIGN_UP_FAILED";

const initialState = {
  isFetching: false,
  error: null,
  data: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...initialState,
        isFetching: true
      };

    case SIGN_UP_SUCCESS:
      return {
        ...initialState,
        data: action.result
      };

    case SIGN_UP_FAILED:
      return {
        ...initialState,
        error: action
      };

    default:
      return state;
  }
}

export function signUp(data): ApiRequest<Array<SomeType>> {
  return {
    type: SIGN_UP,
    data
  };
}
