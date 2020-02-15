import React from "react";
import { useFormikContext } from "formik";
import Button, { ButtonProps } from "@material-ui/core/Button";

interface Props extends ButtonProps {
  clearValues: any;
}

const FormikClearButton: React.FC<Props> = ({ clearValues, ...props }) => {
  const { setValues } = useFormikContext();

  return <Button onClick={() => setValues(clearValues)}>Clear</Button>;
};

export default FormikClearButton;
