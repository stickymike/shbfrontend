import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { getIn, FieldProps } from "formik";
import { IFormOpts } from "../Components/CreatePunchCard";

interface IProps extends FieldProps<IFormOpts> {
  label: string;
  format: string;
  adjust?: string[];
}

const DatePickerField: React.FC<IProps> = ({
  field,
  form,
  adjust,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <DatePicker
      error={!!errorText}
      helperText={errorText}
      {...field}
      {...props}
      onChange={(e: any) => {
        form.setFieldValue(field.name, e.startOf("day").toISOString());
        if (adjust)
          adjust.forEach(name =>
            form.setFieldValue(name, e.startOf("day").toISOString())
          );
      }}
    />
  );
};

export default DatePickerField;
