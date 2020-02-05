import React from "react";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@material-ui/pickers";

import { Theme } from "@material-ui/core";
import { useCtx } from "./NewFilterHeader";
import moment from "moment";
import { isValid } from "date-fns/esm";

const useStyles = makeStyles((theme: Theme) => ({
  bkColor: {
    "& input": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "4px"
    }
  },
  stupidDates: {
    // maxWidth: "120px",
    minWidth: "80px"
    // "& input": {
    //   padding: "8px",
    //   textAlign: "center",
    //   fontSize: ".8em",
    //   minWidth: "80px"
    // }
  }
}));

interface IProps {
  type: string;
  setDate: (date: Date, type: string) => void;
  date: Date;
}

const DateSelectorMod: React.FC<IProps> = ({ date, setDate, type }) => {
  const classes = useStyles();
  // const { qParams: nParams, setParams: setnParams } = useCtx();

  function dateLabel(date: any) {
    if (!date) return "No Date Selected";
    return `From: ${date.format("MM/DD")}`;
  }

  return (
    <DatePicker
      // inputVariant="outlined"
      fullWidth
      clearable
      value={isValid(date) ? moment(date) : null}
      onChange={date =>
        !!date ? setDate(date!.toDate(), type) : setDate(new Date(""), type)
      }
      labelFunc={dateLabel}
      animateYearScrolling
      className={[
        classes.stupidDates,
        isValid(date) ? classes.bkColor : null
      ].join(" ")}
    />
  );
};

export default DateSelectorMod;
