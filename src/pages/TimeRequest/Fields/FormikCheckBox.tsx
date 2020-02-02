import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useField } from "formik";

import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  checkBox: {
    transform: "translate(0px,4px)",
    marginLeft: "8px",
    marginRight: "0px"
  }
}));

const FormikCheckBox: React.FC<any> = ({ label, disabled, ...props }) => {
  const [field] = useField(props);
  const { checkBox } = useStyles();
  return (
    <FormControlLabel
      control={
        <Checkbox
          // name="isMultipleDays"
          color="primary"
          checked={field.value}
          {...field}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            checked: boolean
          ) => field.onChange(event)}

          // checked={isAllDay}
          // onChange={() => setFieldValue("secondDate", firstDate)}
        />
      }
      className={checkBox}
      disabled={disabled}
      label={label}
    />
  );
};

export default FormikCheckBox;
