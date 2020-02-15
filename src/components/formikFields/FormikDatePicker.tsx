import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker, DatePickerProps } from "@material-ui/pickers/";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface Props extends DatePickerProps {
  name: string;
  tiedValues?: {
    name: string;
    compare: (date: number | Date, dateToCompare: number | Date) => boolean;
    correction: (date: Date) => Date;
  }[];
  highlighting?: boolean;
}
// const useStyles = makeStyles((theme: Theme) => ({
//   timePicker: {
//     width: "100px",
//     marginRight: theme.spacing(2)
//   }
// }));

const useStyles = makeStyles((theme: Theme) => ({
  // smallpadding: {
  //   padding: "8px",
  //   fontSize: ".8em",
  //   fontStyle: "italic"
  // },
  // bkColor: {
  //   "& input": {
  //     backgroundColor: theme.palette.primary.light,
  //     borderRadius: "4px"
  //   }
  // },
  // selected: {
  //   backgroundColor: theme.palette.action.selected,
  //   fontWeight: theme.typography.fontWeightMedium
  // },
  label: {
    color: theme.palette.primary.main
  },
  textArea: {
    "&:after": {
      transform: "scaleX(1)"
    }
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

const FormikDatePicker: React.FC<Omit<Props, "onChange" | "value">> = ({
  label,
  disabled,
  name,
  tiedValues,
  highlighting,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext<formikContext>();
  const classes = useStyles();
  const onChange = (date: any) => {
    const fncDate = date ? date.toDate() : null;
    // console.log(fncDate);
    helpers.setValue(fncDate);
    tiedValues?.forEach(({ name, compare, correction }) => {
      if (compare(values[name as keyof formikContext] as Date, date.toDate()))
        setFieldValue(name, correction(date.toDate()));
    });
    // helpers.setValue(date!.toDate());
  };

  const value = (date: MaterialUiPickersDate, invalidLabel: string) => {
    if (date === null) return "No Date Selected";
    return date.format("MMMM Do, YYYY");
  };
  // console.log(field.value);

  const usedDate = highlighting && field.value;

  return (
    <DatePicker
      label={label}
      {...field}
      // className={timePicker}
      // value={value}
      labelFunc={value}
      onChange={onChange}
      error={!!meta.error}
      helperText={meta.error || " "}
      disabled={disabled}
      fullWidth
      format={"LL"}
      InputLabelProps={usedDate ? { className: classes.label } : undefined}
      InputProps={usedDate ? { className: classes.textArea } : undefined}
      {...props}
    />
  );
};

export default FormikDatePicker;
