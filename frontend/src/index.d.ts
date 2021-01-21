// eslint-disable-next-line max-classes-per-file
import { ElForm } from "element-ui/types/form.d";
import { ElFormItem } from "element-ui/types/form-item.d";
import { ValidateStates } from "@/types/Enums";

export declare class ElFormItemExtend extends ElFormItem {
  validateMessage: string;

  validateState: ValidateStates;
}

export declare class ElFormExtend extends ElForm {
  fields: Array<ElFormItemExtend>;
}
