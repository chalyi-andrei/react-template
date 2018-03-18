// @flow
import type { ReqTypeT } from "../index";
import API from "../base/api";

class Auth extends API {
  async signUp() {
    return this.r({
      method: "POST",
      url: "/users"
    });
  }
}

export default function authApi(request: ReqTypeT) {
  return new Auth(request);
}
