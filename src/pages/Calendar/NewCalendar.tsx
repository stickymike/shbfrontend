import React, { useMemo } from "react";

import { makeStyles, Theme } from "@material-ui/core";

import moment from "moment";

import CalHeaderDays from "./CalHeaderDays";
import CalHeader from "./CalHeader";
import CalArea from "./CalArea";

const useStyles = makeStyles((theme: Theme) => ({
  calendarContainer: {
    // overflow: "hidden",
    position: "relative",
    width: "280px",
    margin: "0 8px"
  }
}));

interface IProps {
  activeMonth: string;

  nextMonth?: () => void;
  prevMonth?: () => void;
}

const NewCalendar: React.FC<IProps> = ({
  activeMonth: currentMonth,

  nextMonth,
  prevMonth
}) => {
  const classes = useStyles();

  const [createdMonth] = useMemo(() => {
    const newStart = moment(currentMonth)
      .startOf("month")
      .startOf("week")
      .format("YYYY MM D");

    const newEnd = moment(currentMonth)
      .endOf("month")
      .endOf("week")
      .format("YYYY MM D");

    const dateFormat = "D";
    const createdMonth = [];
    let days: {
      formattedDate: string;
      total: number;
      iso: string;
      hidden: boolean;
    }[] = [];

    let day = moment(newStart);

    let formattedDate = "";
    while (day.isBefore(newEnd)) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.format(dateFormat);
        days.push({
          formattedDate,
          total: i + 1 + (createdMonth.length + 1) * 7,
          iso: day.toISOString(),
          hidden: day.isSame(currentMonth, "month")
        });
        day = day.add(1, "day");
      }
      createdMonth.push(days);
      days = [];
    }
    return [createdMonth] as const;
  }, [currentMonth]);

  return (
    <div className={classes.calendarContainer}>
      <CalHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalHeaderDays />
      <CalArea month={createdMonth} />
    </div>
  );
};

export default NewCalendar;
