module.exports = function (name, nameUcFirst) {
  return `// @flow
import { combineReducers } from 'redux';

import type { StateT as DataStateT } from './data';
import type { StateT as LoadStateT } from './load';
import type { StateT as CreateStateT } from './create';
import type { StateT as UpdateStateT } from './update';
import type { StateT as DeleteStateT } from './delete';

import data from './data';
import load from './load';
import create from './create';
import update from './update';
import del from './delete';


export type ${nameUcFirst}StateT = {
  data: DataStateT,
  load: LoadStateT,
  create: CreateStateT,
  update: UpdateStateT,
  delete: DeleteStateT,
}

export default combineReducers({
  data,
  load,
  create,
  update,
  delete: del,
});
`;
}
