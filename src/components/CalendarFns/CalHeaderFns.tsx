import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import { differenceInMonths } from "date-fns";

import { DatePicker } from "@material-ui/pickers";

import { useCalendarCtx } from "./CalendarWrapperFns";
import { addMonths } from "date-fns/esm";

interface CHProps {
  currentMonth: Date;
  prevMonth?: () => void;
  nextMonth?: () => void;
}
const useStyles = makeStyles((theme: Theme) => ({
  calendarHeader: {
    display: "flex",
    marginTop: "4px",
    alignItems: "center",
    marginBottom: "8px",
    justifyContent: "space-between"
  },
  iconButton: {
    zIndex: 1,
    backgroundColor: theme.palette.background.paper
  },
  HoverClick: {
    "&:hover": { cursor: "pointer" }
  }
}));

const CalHeader: React.FC<CHProps> = ({
  currentMonth,
  prevMonth,
  nextMonth
}) => {
  const { calendarHeader, iconButton } = useStyles();

  const {
    state: { activeMonth },
    setState: { setActiveMonth }
  } = useCalendarCtx();

  const AddWeeks = differenceInMonths(activeMonth, currentMonth);

  return (
    <div>
      <div className={calendarHeader}>
        <IconButton
          className={iconButton}
          onClick={prevMonth}
          style={{ visibility: prevMonth ? "visible" : "hidden" }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <div>
          <DatePicker
            openTo="month"
            views={["year", "month"]}
            value={currentMonth}
            onChange={(date: any) =>
              setActiveMonth(addMonths(date.toDate(), AddWeeks))
            }
            TextFieldComponent={HeaderType}
            showTodayButton={true}
          />
        </div>

        <IconButton
          className={iconButton}
          onClick={nextMonth}
          style={{ visibility: nextMonth ? "visible" : "hidden" }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

const HeaderType: React.FC<any> = ({ value, onClick }) => {
  const { HoverClick } = useStyles();
  return (
    <Typography className={HoverClick} onClick={onClick} variant="body1">
      {value}
    </Typography>
  );
};

export default React.memo(CalHeader);
