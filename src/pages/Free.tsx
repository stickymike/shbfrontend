import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  makeStyles,
  IconButton,
  Theme,
  Button
} from "@material-ui/core";
import PaperWrapper from "../components/PaperWrapper";
import { Calendar, MaterialUiPickersDate, Day } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import NewCalendar from "./NewCalendar";

const useStyles = makeStyles((theme: Theme) => ({
  base: {
    color: "rgba(0, 0, 0, 0.87)",
    width: "36px",
    height: "36px",
    margin: "0 2px",
    padding: "0",
    fontSize: ".75rem",
    fontWeight: 500
  },
  border: {
    borderRight: `2px solid ${theme.palette.primary.light}`,
    borderLeft: `2px solid ${theme.palette.primary.light}`
  },
  root: {
    margin: "0 -2px",
    padding: "0 2px"
  },
  highlighted: {
    backgroundColor: theme.palette.primary.light
  }
}));
interface IProps {
  day: MaterialUiPickersDate;
  setsecondDate: React.Dispatch<React.SetStateAction<string>>;
  determinMiddle: (day: MaterialUiPickersDate) => boolean;
}

const MyDay: React.FC<IProps> = ({ day, setsecondDate, determinMiddle }) => {
  const { highlighted, border, base } = useStyles();
  const onDateHover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setsecondDate(event.currentTarget.getAttribute("data-day") || "");
  };
  return (
    <IconButton
      className={determinMiddle(day) ? [base, highlighted].join(" ") : base}
      onMouseOver={onDateHover}
      data-day={day!.toISOString()}
    >
      <Typography variant="body2">{day!.format("D")}</Typography>
    </IconButton>
  );
};

const Free: React.FC = () => {
  const [date, setdate] = useState(moment("12-02-19").toISOString());
  const [secondDate, setsecondDate] = useState(moment().toISOString());

  const leftClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setdate(
      moment(date)
        .subtract(1, "month")
        .toISOString()
    );
    e.stopPropagation();
  };
  const rightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setdate(
      moment(date)
        .add(1, "month")
        .toISOString()
    );
    e.stopPropagation();
  };

  const determinMiddle = (day: MaterialUiPickersDate) =>
    day!.startOf("day") > moment(date).startOf("day") &&
    day!.startOf("day") < moment(secondDate).startOf("day");

  const newTestFunc = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    DayComponent: JSX.Element
  ) => {
    return (
      <MyDay
        day={day}
        setsecondDate={setsecondDate}
        determinMiddle={determinMiddle}
      />
    );
  };
  const selectionRange = {
    startDate: new Date("01 December 2019 14:48 UTC"),
    endDate: new Date("01 December 2019 14:48 UTC"),
    key: "selection"
  };

  return (
    <PaperWrapper size={8} title="Test">
      {/* <div
        style={{
          display: "inline-block",
          overflow: "hidden",
          marginRight: "8px"
        }}
      >
        <Calendar
          date={moment(date)}
          onChange={() => null}
          leftArrowButtonProps={{
            onClickCapture: leftClick
          }}
          rightArrowButtonProps={{
            style: { display: "none" }
          }}
          renderDay={newTestFunc}
          // onMonthChange={testFunc}
        />
      </div>
      <div
        style={{
          display: "inline-block",
          overflow: "hidden",
          marginLeft: "8px"
        }}
      > */}
      <Calendar
        date={moment(date)}
        // date={moment(date).add(1, "month")}
        onChange={() => null}
        rightArrowButtonProps={{
          onClickCapture: rightClick
        }}
        renderDay={newTestFunc}
        // leftArrowButtonProps={{
        //   style: { display: "none" }
        // }}
      />
      {/* </div> */}
      <NewCalendar />
      <DateRangePicker ranges={[selectionRange]} onChange={() => null} />
    </PaperWrapper>
  );
};

export default Free;
