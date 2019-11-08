import React from "react";
import { TimePicker } from "@material-ui/pickers";
import { getIn, FieldProps } from "formik";
import { IFormOpts } from "../Components/CreatePunchCard";

interface IProps extends FieldProps<IFormOpts> {
  label: string;
  format: string;
  adjust: [string, number];
}

const TimePickerField: React.FC<IProps> = ({
  field,
  form,
  adjust,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TimePicker
      error={!!errorText}
      helperText={errorText}
      {...field}
      {...props}
      onChange={(e: any) => {
        form.setFieldValue(field.name, e.toISOString());
        if (adjust) form.setFieldValue(adjust[0], e.add("hours", adjust[1]));
      }}
    />
  );
};

export default TimePickerField;
