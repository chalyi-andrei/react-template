// @flow
import { API_REQUEST } from '../apiAction';

function deferred() {
  const d = {};

  d.promise = new Promise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
  });

  return d;
}

export default () => (next: (a: Object) => void) => (action: Object) => {
  if (action.type !== API_REQUEST) {
    return next(action);
  }

  const d = deferred();
  next({ ...action, deferred: d });
  return d.promise;
};
