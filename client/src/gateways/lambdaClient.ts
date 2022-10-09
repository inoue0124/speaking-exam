export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
export class LambdaClient {
  baseUrl: string = "https://2yk2vm9l8h.execute-api.us-east-1.amazonaws.com";

  async execute(
    endpoint: string,
    method: HTTPMethod,
    headers: Headers,
    bodyParams: Object
  ): Promise<Response> {
    const reqUrl = this.baseUrl + endpoint;
    try {
      const result = await fetch(reqUrl, {
        method,
        headers,
        body: JSON.stringify(bodyParams),
      });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
