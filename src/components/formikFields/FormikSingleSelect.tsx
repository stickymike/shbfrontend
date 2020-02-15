import React from "react";
import { useField } from "formik";
import SingleSelect from "../SingleSelect";

interface Props {
  name: string;
  listedItems: string[];
  options: any;
  label: string;
}

// interface IProps {
//   errors: FormikErrors<IFormOpts>;
//   options: any;
//   listedItems: [];
//   label: string;
//   field: field;
// }

const FormikSingleSelect: React.FC<Props> = ({ name, ...props }) => {
  const [field, { error }] = useField(name);

  return <SingleSelect field={field} errors={error} {...props} />;
};

export default FormikSingleSelect;
