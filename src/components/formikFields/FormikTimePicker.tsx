import React from "react";
import { useField, useFormikContext } from "formik";
import { TimePicker, DatePickerProps } from "@material-ui/pickers/";
import moment from "moment";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

interface Props extends DatePickerProps {
  name: string;
  tiedValues?: {
    name: string;
    compare: (date: number | Date, dateToCompare: number | Date) => boolean;
    correction: (date: Date) => Date;
  }[];
}
const useStyles = makeStyles((theme: Theme) => ({
  timePicker: {
    width: "100px",
    marginRight: theme.spacing(2)
  }
}));

interface formikContext {
  id: string;
  reason: string;
  approved: boolean;
  isMultipleDays: boolean;
  startTime: Date;
  firstDate: Date;
  secondDate: Date;
  endTime: Date;
  isAllDay: boolean;
}

const FormikTimePicker: React.FC<Omit<Props, "onChange" | "value">> = ({
  label,
  disabled,
  name,
  tiedValues,

  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { timePicker } = useStyles();

  const { values, setFieldValue } = useFormikContext<formikContext>();

  const onChange = (date: any) => {
    helpers.setValue(date!.toDate());
    tiedValues?.forEach(({ name, compare, correction }) => {
      if (compare(values[name as keyof formikContext] as Date, date.toDate()))
        setFieldValue(name, correction(date.toDate()));
    });
    helpers.setValue(date!.toDate());
  };

  return (
    <TimePicker
      label={label}
      {...field}
      className={timePicker}
      value={moment(field.value)}
      onChange={onChange}
      error={!!meta.error}
      helperText={meta.error || " "}
      disabled={disabled}
      minutesStep={5}
      // {...props}
    />
  );
};

// setValue(addHours(date!.toDate(),1)

export default FormikTimePicker;
