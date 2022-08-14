export interface CustomError {
  code: number;
  message: string;
  errors: Error[];
}

export interface Error {
  message: string;
  domain: string;
  reson: string;
}
