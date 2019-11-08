import React from "react";
import { makeStyles } from "@material-ui/styles";
import { DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";

import { Theme } from "@material-ui/core";
import { useCtx } from "./NewFilterHeader";

const useStyles = makeStyles((theme: Theme) => ({
  bkColor: {
    "& input": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "4px"
    }
  },
  stupidDates: {
    maxWidth: "120px",
    minWidth: "80px",
    "& input": {
      padding: "8px",
      textAlign: "center",
      fontSize: ".8em",
      minWidth: "80px"
    }
  }
}));

interface IProps {
  type: any;
}

const DateSelector: React.FC<IProps> = ({ type }) => {
  const classes = useStyles();
  const { qParams: nParams, setParams: setnParams } = useCtx();

  function dateLabel(date: MaterialUiPickersDate) {
    if (!date) return "No Date Selected";
    return `From: ${date.format("MM/DD")}`;
  }

  return (
    <DatePicker
      inputVariant="outlined"
      clearable
      value={nParams[type]}
      onChange={date => {
        setnParams((params: any) => ({ ...params, [type]: date }));
      }}
      labelFunc={dateLabel}
      animateYearScrolling
      className={[
        classes.stupidDates,
        nParams[type] ? classes.bkColor : null
      ].join(" ")}
    />
  );
};

export default DateSelector;
