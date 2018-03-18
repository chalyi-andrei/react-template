// @flow
import CRUD from '../base/crud';

import type { ReqTypeT } from '../index';

export type SomeTypeT = {
  id: number,
};


export default function listCrud(request: ReqTypeT) {
  const crud: CRUD<SomeTypeT> = new CRUD({
    url: '/path/to/resource',
    request,
    id: 'id',
  });

  return crud;
}
