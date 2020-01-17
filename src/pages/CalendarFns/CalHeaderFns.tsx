import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import { format } from "date-fns";

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
  }
}));

const CalHeader: React.FC<CHProps> = ({
  currentMonth,
  prevMonth,
  nextMonth
}) => {
  const dateFormat = "MMMM yyyy";
  const { calendarHeader, iconButton } = useStyles();

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
          <Typography variant="body1">
            {format(currentMonth, dateFormat)}
          </Typography>
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

export default React.memo(CalHeader);
