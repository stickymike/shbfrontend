import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

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
  const dateFormat = "ddd";
  const days = [];
  const { dayLabel, daysHeader } = useStyles();

  let startDate = moment().startOf("week");

  for (let i = 0; i < 7; i++) {
    days.push(
      <Typography key={i} className={dayLabel} variant="caption">
        {startDate.add(i > 0 ? 1 : 0, "days").format(dateFormat)}
      </Typography>
    );
  }

  return <div className={daysHeader}>{days}</div>;
};

export default React.memo(CalHeaderDays);
