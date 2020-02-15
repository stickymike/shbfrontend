import React from "react";
import { useField } from "formik";

import TextField, { StandardTextFieldProps } from "@material-ui/core/TextField";

interface Props extends StandardTextFieldProps {
  name: string;
}

const FormikTextBox: React.FC<Props> = ({ name, type, ...props }) => {
  const [field, meta] = useField({ name, type });
  return (
    <TextField
      {...field}
      {...props}
      error={!!meta.error && meta.touched}
      helperText={(meta.touched && meta.error) || " "}
    />
  );
};

export default FormikTextBox;
