import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import { startOfWeek, addDays, format } from "date-fns/esm";

interface CHDProps {}

const useStyles = makeStyles((theme: Theme) => ({
  dayLabel: {
    width: 36,
    margin: "0 2px",
    textAlign: "center",
    color: theme.palette.text.hint
  },
  daysHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 16
  }
}));

const CalHeaderDays: React.FC<CHDProps> = () => {
  const dateFormat = "EEE";
  const days = [];
  const { dayLabel, daysHeader } = useStyles();

  // let startDate = moment().startOf("week");

  let startDate = startOfWeek(new Date());

  for (let i = 0; i < 7; i++) {
    days.push(
      <Typography key={i} className={dayLabel} variant="caption">
        {format(startDate, dateFormat)}
      </Typography>
    );
    startDate = addDays(startDate, 1);
  }

  return <div className={daysHeader}>{days}</div>;
};

export default React.memo(CalHeaderDays);
