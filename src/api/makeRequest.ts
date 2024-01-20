export default (url: string, options?: Request): Promise<Response> =>
  fetch(url, options);
