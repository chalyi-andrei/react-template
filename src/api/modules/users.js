// @flow
import type { ReqTypeT } from "../index";
import API from "../base/api";

class SomeApi extends API {
  async getUsers() {
    return this.r({
      method: "GET",
      url: "/users"
    });
  }
}

export default function someApi(request: ReqTypeT) {
  return new SomeApi(request);
}
