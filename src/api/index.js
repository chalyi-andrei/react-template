// @flow
import axios from "axios";

import users from "./modules/users";
import auth from "./modules/auth";
import address from "./modules/example-crud";

export type ReqTypeT = (config: Object) => Promise<*>;

class Client {
  token: ?string;
  req: ReqTypeT;
  // modules
  users: *;
  address: *;
  auth: *;

  constructor(baseURL: ?string = "") {
    this.req = axios.create({
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      baseURL
    });

    this.req.interceptors.request.use(config => {
      if (!this.token) {
        return config;
      }

      // eslint-disable-next-line no-param-reassign
      config.headers = Object.assign({}, config.headers, {
        "Access-Token": this.token
      });
      return config;
    });

    this.users = users(this.req);
    this.auth = auth(this.req);
    this.address = address(this.req);
  }

  setToken(token: string): void {
    this.token = token;
  }
}

let instance;
export default function api(baseUrl: ?string) {
  if (!instance) {
    instance = new Client(baseUrl);
  }

  return instance;
}
