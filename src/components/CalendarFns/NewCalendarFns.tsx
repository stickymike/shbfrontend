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
  isSameMonth,
  isSameDay
} from "date-fns";
import { useCalendarCtx } from "./CalendarWrapperFns";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
import { isAfter, startOfDay, addHours } from "date-fns/esm";

const useStyles = makeStyles((theme: Theme) => ({
  calendarContainer: {
    position: "relative",
    width: "280px"
  },
  spacerLines: { width: "8px", zIndex: 1 }
}));

interface IProps {
  activeMonth: Date;
  nextMonth?: () => void;
  prevMonth?: () => void;
  timeRequests?: GetTimeRequestsIDandDates_timeRequests[];
}

const dotFunction = (
  testDate: Date,
  timeRequests: GetTimeRequestsIDandDates_timeRequests[]
) => {
  let color = "none";
  timeRequests.forEach(timeRequest => {
    if (
      isSameDay(testDate, new Date(timeRequest.startTime)) ||
      isSameDay(testDate, new Date(timeRequest.endTime))
    ) {
      if (timeRequest.isAllDay) color = "allDay";
      else if (
        isBefore(
          new Date(timeRequest.endTime),
          addHours(startOfDay(new Date(timeRequest.endTime)), 12)
        )
      ) {
        color = "pm";
      } else color = "am";
    }
    if (
      isBefore(testDate, new Date(timeRequest.endTime)) &&
      isAfter(testDate, new Date(timeRequest.startTime))
    ) {
      if (timeRequest.isAllDay) color = "allDay";
      else if (
        isBefore(
          new Date(timeRequest.endTime),
          addHours(startOfDay(new Date(timeRequest.endTime)), 12)
        )
      )
        color = "pm";
      else color = "am";
    }
  });
  return color;
};

const NewCalendar: React.FC<IProps> = ({
  activeMonth: currentMonth,
  nextMonth,
  prevMonth,
  timeRequests
}) => {
  const { calendarContainer, spacerLines } = useStyles();

  const createdDots = useMemo(() => {
    let startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const createdDots = [];
    let dots: string[] = [];

    while (isBefore(startDate, endDate)) {
      for (let i = 0; i < 7; i++) {
        dots.push(dotFunction(startDate, timeRequests || []));
        startDate = addDays(startDate, 1);
      }
      createdDots.push(dots);
      dots = [];
    }

    return createdDots;
  }, [currentMonth, timeRequests]);

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

  const {
    setState: { setPreview }
  } = useCalendarCtx();

  const spacerDiv = () => (
    <div
      className={spacerLines}
      onMouseOverCapture={() => {
        setPreview(false);
      }}
    />
  );

  return (
    <>
      {spacerDiv()}
      <div className={calendarContainer}>
        <CalHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <CalHeaderDays />
        <CalArea month={createdMonth} createdDots={createdDots} />
      </div>
      {spacerDiv()}
    </>
  );
};

export default NewCalendar;
