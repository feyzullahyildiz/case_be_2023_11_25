export class ResponseBodyError {
  constructor(public readonly body: any, public readonly statusCode = 400) {}
}
