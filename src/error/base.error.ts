/* eslint-disable no-unused-vars */
export abstract class BaseError {
  constructor(
    public readonly message: string,
    public readonly status: number,
  ) {}
}
