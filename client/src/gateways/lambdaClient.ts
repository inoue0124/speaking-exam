export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
export class LambdaClient {
  baseUrl: string = process.env.NEXT_PUBLIC_LAMBDA_URL;

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
