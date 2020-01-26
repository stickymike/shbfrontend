import React, { useState, useEffect, useRef } from "react";
import { useCalendarCtx } from "./CalendarWrapperFns";
import Chip from "@material-ui/core/Chip";
import ClearIcon from "@material-ui/icons/Clear";
import ScheduleIcon from "@material-ui/icons/Schedule";
import HistoryIcon from "@material-ui/icons/History";
import {
  subYears,
  startOfDay,
  isSameDay,
  isValid,
  addYears
} from "date-fns/esm";
import { makeStyles } from "@material-ui/styles";

interface Props {}

const usePrevious = <T extends {}>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useStyles = makeStyles(() => ({
  chip: {
    margin: "4px"
  }
}));

const CalControlsFns: React.FC<Props> = () => {
  const [buttonState, setbuttonState] = useState("");

  const {
    state: { firstDate, secondDate, previewDate, preview, dLastDate },
    setState: { changeSecond, changeFirst, setPreviewDate }
  } = useCalendarCtx();
  const { chip } = useStyles();
  const prevState = usePrevious({
    firstDate,
    secondDate,
    previewDate,
    preview,
    dLastDate
  });

  useEffect(() => {
    if (
      isSameDay(firstDate, subYears(new Date(), 100)) &&
      isSameDay(secondDate, new Date())
    ) {
      setbuttonState("previous");
    } else if (
      isSameDay(firstDate, subYears(new Date(), 100)) &&
      isSameDay(secondDate, addYears(new Date(), 100))
    ) {
      setbuttonState("all");
    } else if (prevState) {
      if (
        !(
          !isSameDay(prevState.firstDate, firstDate) ||
          !(isValid(prevState.firstDate) === isValid(firstDate))
        ) ||
        !(
          !isSameDay(prevState.secondDate, secondDate) ||
          !(isValid(prevState.secondDate) === isValid(secondDate))
        )
      ) {
        setbuttonState("");
      }
    }
    return () => {};
  }, [firstDate, prevState, secondDate]);

  const clearButton = () => {
    if (buttonState === "clear") return setbuttonState("");
    changeFirst(new Date(""));
    changeSecond(new Date(""));
    setbuttonState("clear");
  };
  const previousButton = () => {
    if (buttonState === "previous") {
      changeFirst(new Date(""));
      changeSecond(new Date(""));
      return setbuttonState("");
    }
    changeFirst(subYears(new Date(), 100));
    changeSecond(startOfDay(new Date()));
    setbuttonState("previous");
  };
  const allButton = () => {
    if (buttonState === "all") {
      changeFirst(new Date(""));
      changeSecond(new Date(""));
      return setbuttonState("");
    }
    changeFirst(subYears(new Date(), 100));
    changeSecond(addYears(new Date(), 100));
    setPreviewDate(addYears(new Date(), 100));
    setbuttonState("all");
  };

  type size = "medium" | "small" | undefined;

  const reoccuringProps = {
    className: chip,
    size: "small" as size,
    clickable: true
  };

  return (
    <div style={{ marginTop: "8px", marginBottom: "8px", width: "576px" }}>
      <Chip
        icon={<ClearIcon />}
        label="Clear All"
        onClick={clearButton}
        color={buttonState === "clear" ? "primary" : undefined}
        {...reoccuringProps}
      />
      <Chip
        icon={<HistoryIcon />}
        label="Select Previous"
        onClick={previousButton}
        color={buttonState === "previous" ? "primary" : undefined}
        {...reoccuringProps}
      />
      <Chip
        icon={<ScheduleIcon />}
        label="Select All"
        onClick={allButton}
        color={buttonState === "all" ? "primary" : undefined}
        {...reoccuringProps}
      />
    </div>
  );
};

export default CalControlsFns;
