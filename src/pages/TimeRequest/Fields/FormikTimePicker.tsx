import React from "react";
import { useField } from "formik";
import { TimePicker } from "@material-ui/pickers/";
import moment from "moment";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

interface Props {}
const useStyles = makeStyles((theme: Theme) => ({
  timePicker: {
    width: "100px",
    marginRight: theme.spacing(2)
  }
}));

const FormikTimePicker: React.FC<any> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { timePicker } = useStyles();
  return (
    <TimePicker
      label={label}
      {...field}
      className={timePicker}
      value={moment(field.value)}
      onChange={(date: any) => helpers.setValue(date!.toDate())}
      error={!!meta.error}
      helperText={meta.error || " "}
    />
  );
};

export default FormikTimePicker;
