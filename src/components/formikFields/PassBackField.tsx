import React from "react";
import { useFormikContext } from "formik";

interface Props {
  formHandle: (arg: () => void) => void;
}

const PassBackField: React.FC<Props> = ({ formHandle }) => {
  const { submitForm } = useFormikContext();
  formHandle(submitForm);
  return <></>;
};

export default PassBackField;
