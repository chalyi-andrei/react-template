// @flow
import type { ReqTypeT } from '../index';

type CrudConfigT = {|
  url: string,
  request: ReqTypeT,
  id: string,
|};

class CRUD<M: Object> {
  config: CrudConfigT;
  r: ReqTypeT;

  constructor(config: CrudConfigT) {
    this.config = config;
    this.r = this.config.request;
  }

  get(params: Object): Promise<Array<M>> {
    return this.r({
      method: 'GET',
      url: this.config.url,
      params,
    });
  }

  one(id: number): Promise<M> {
    return this.r({
      method: 'GET',
      url: `${this.config.url}/${id}`,
    });
  }

  update(data: $Shape<M>): Promise<M> {
    return this.r({
      method: 'PUT',
      url: `${this.config.url}/${data[this.config.id]}`,
      data,
    });
  }

  create(data: *): Promise<M> {
    return this.r({
      method: 'POST',
      url: this.config.url,
      data,
    });
  }

  delete(id: number) {
    return this.r({
      method: 'DELETE',
      url: `${this.config.url}/${id}`,
    });
  }
}

export default CRUD;
