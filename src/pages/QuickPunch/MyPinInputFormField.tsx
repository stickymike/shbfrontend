import { FieldProps, getIn } from "formik";
import React from "react";
import MyPinInput from "../../components/MyPinInput";
import { makeStyles } from "@material-ui/styles";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(_ => ({
  formhelper: {
    marginTop: "2rem",
    marginBottom: "1rem",
    display: "inline-flex",
    visibility: "hidden",
    color: "red"
  },
  show: {
    visibility: "visible"
  }
}));

export const MyFormInputFormField: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const classes = useStyles();

  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <>
      <MyPinInput
        id="code"
        name="code"
        error={!!form.errors.code}
        value={field.value}
        onChange={form.setFieldValue}
        onTouch={form.setFieldTouched}
      />
      <FormHelperText
        className={[
          classes.formhelper,
          form.errors.code ? classes.show : ""
        ].join(" ")}
        id="component-error-text"
      >
        {errorText}
      </FormHelperText>
    </>
  );
};
