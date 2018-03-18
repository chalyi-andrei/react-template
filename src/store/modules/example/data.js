// @flow
// @TODO Check type name and import path
import type { ExampleT } from '../../../api/modules/example';

import type { LoadSuccessT } from './load';
import type { CreateSuccessT } from './create';
import type { UpdateSuccessT } from './update';
import type { DeleteSuccessT } from './delete';
import { LOAD_SUCCESS } from './load';
import { CREATE_SUCCESS } from './create';
import { UPDATE_SUCCESS } from './update';
import { DELETE_SUCCESS } from './delete';


type ActionTypeT = LoadSuccessT | CreateSuccessT | UpdateSuccessT | DeleteSuccessT;

export type StateT = Array<ExampleT>;

const initialState: StateT = [];

export default function exampleDataReducer(state: StateT = initialState, action: ActionTypeT): StateT {
  switch (action.type) {
    // @TODO This should make sense. Check result format
    case LOAD_SUCCESS:
      return action.result.data;

    // @TODO This should make sense. Check result format in `./create.js`
    case CREATE_SUCCESS:
      return [
        ...state,
        action.result.data,
      ];

    // @TODO This should make sense. Check result format in `./update.js`
    case UPDATE_SUCCESS: {
      const data = state.map(item => {
        if (item.id === action.result.data.id) {
          return action.result.data;
        }

        return item;
      });

      return data;
    }

    // @TODO This should make sense. Check result format in `./delete.js`
    case DELETE_SUCCESS: {
      const data = state.filter(item => item.id !== action.result.data.id);

      return data;
    }

    default:
      return state;
  }
}
