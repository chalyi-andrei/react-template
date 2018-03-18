// @flow
import { API_REQUEST } from "../../apiAction";
import api from "../../../api";

const GET_USERS: "users/GET_USERS" = "users/GET_USERS";
export const GET_USERS_SUCCESS: "users/GET_USERS_SUCCESS" =
  "users/GET_USERS_SUCCESS";
const GET_USERS_FAILED: "users/GET_USERS_FAILED" = "users/GET_USERS_FAILED";

const initialState = {
  isFetching: false,
  error: null,
  data: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...initialState,
        isFetching: true
      };

    case GET_USERS_SUCCESS:
      return {
        ...initialState,
        data: action.result.data
      };

    case GET_USERS_FAILED:
      return {
        ...initialState,
        error: action
      };

    default:
      return state;
  }
}

export function getUsers(): ApiRequest<Array<SomeType>> {
  return {
    type: API_REQUEST,
    types: [GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED],
    call: () => api().users.getUsers()
  };
}
