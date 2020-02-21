import React from "react";
import { FieldProps, getIn } from "formik";
import SingleSelect from "../../../components/SingleSelect";
import { IFormOpts } from "../../../resources/punchcards/CreatePunchCard";

interface IProps extends FieldProps<IFormOpts> {
  options: any;
  listedItems: string[];
  label: string;
}

const SingleSelectField: React.FC<IProps> = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return <SingleSelect errors={errorText} field={field} {...props} />;
};

export default SingleSelectField;
