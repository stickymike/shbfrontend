import React from "react";
import TextField, { StandardTextFieldProps } from "@material-ui/core/TextField";

interface IProps extends StandardTextFieldProps {
  id: string;
  type?: string;
  payload: any;
  label?: string;
  style?: {};
}

const FormikTextField: React.FC<IProps> = ({
  id,
  label,
  payload,
  type,
  style,
  ...rest
}) => {
  return (
    <TextField
      id={id}
      type={type}
      label={label}
      value={payload.values[id]}
      onChange={payload.handleChange}
      error={payload.errors[id] && payload.touched[id]}
      helperText={payload.touched[id] && payload.errors[id]}
      onBlur={payload.handleBlur}
      margin="normal"
      fullWidth
      style={style}
      {...rest}
    />
  );
};

export default FormikTextField;
