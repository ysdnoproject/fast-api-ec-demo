import { ValidationError } from "@/types/ErrorInterface";
import { ElFormExtend } from "@/index.d";
import { ValidateStates } from "@/types/Enums";

// eslint-disable-next-line import/prefer-default-export
export const serverValidationError = (
  error: ValidationError,
  form: ElFormExtend
): void => {
  error.detail.forEach(e => {
    const field = form.fields.find(f => f.prop === e.field);
    if (field) {
      field.validateMessage = e.msg;
      field.validateState = ValidateStates.ERROR;
    }
  });
};
