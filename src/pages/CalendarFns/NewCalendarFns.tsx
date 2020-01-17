import React, { useMemo } from "react";

import { makeStyles, Theme } from "@material-ui/core";

import CalHeaderDays from "./CalHeaderDaysFns";
import CalHeader from "./CalHeaderFns";
import CalArea from "./CalAreaFns";
import {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  format,
  formatISO,
  isSameMonth
} from "date-fns";

const useStyles = makeStyles((theme: Theme) => ({
  calendarContainer: {
    // overflow: "hidden",
    position: "relative",
    width: "280px",
    margin: "0 8px"
  }
}));

interface IProps {
  activeMonth: Date;

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
    let startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const dateFormat = "d";
    const createdMonth = [];
    let days: {
      formattedDate: string;
      total: number;
      iso: string;
      hidden: boolean;
    }[] = [];

    let formattedDate = "";
    while (isBefore(startDate, endDate)) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(startDate, dateFormat);
        days.push({
          formattedDate,
          total: i + 1 + (createdMonth.length + 1) * 7,
          iso: formatISO(startDate),
          hidden: isSameMonth(startDate, currentMonth)
        });
        startDate = addDays(startDate, 1);
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
