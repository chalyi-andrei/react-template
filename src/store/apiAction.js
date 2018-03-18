// @flow

// eslint-disable-next-line import/prefer-default-export
export const API_REQUEST = 'API_REQUEST';

export type ApiRequest<M> = {
  type: typeof API_REQUEST,
  types: Array<string>,
  call: () => Promise<{ data: M }>,
};
