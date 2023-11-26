/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class ResponseBodyError {
  constructor(
    public readonly body: any,
    public readonly statusCode = 400,
  ) {}
}
