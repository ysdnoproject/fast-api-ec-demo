export interface ValidationError {
  detail: Array<ValidationErrorDetail>;
}

export interface ValidationErrorDetail {
  field: string;
  msg: string;
}
