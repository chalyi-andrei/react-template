// @flow
import type { ReqTypeT } from '../index';

class API {
  r: ReqTypeT;

  constructor(request: ReqTypeT) {
    this.r = request;
  }
}

export default API;
