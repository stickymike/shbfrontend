import React, { useState, useMemo } from "react";

import { Typography, makeStyles, IconButton, Theme } from "@material-ui/core";

import moment, { Moment } from "moment";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

interface Props {}

const useMoreStyles = makeStyles((theme: Theme) => ({
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
  daysHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 16
  },
  dayLabel: {
    width: 36,
    margin: "0 2px",
    textAlign: "center",
    color: theme.palette.text.hint
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    padding: 0
  },
  week: {
    display: "flex",
    justifyContent: "center"
  },
  container: {
    minHeight: 36 * 6,
    marginTop: theme.spacing(1.5)
  },
  hidden: {
    opacity: 0,
    pointerEvents: "none"
  },
  daySelected: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const NewCalendar: React.FC<Props> = () => {
  const [currentMonth, setcurrentMonth] = useState(moment().toISOString());
  const [selectedDate, setSelectedDate] = useState(
    moment()
      .startOf("month")
      .toISOString()
  );
  const [secondDate, setsecondDate] = useState("");

  const classes = useMoreStyles();

  const cellProps = useMemo(() => {
    const monthStart = moment(currentMonth).startOf("month");
    const monthEnd = moment(currentMonth).endOf("month");
    const startDate = moment(monthStart.toISOString()).startOf("week");
    const endDate = moment(monthEnd.toISOString()).endOf("week");
    return [startDate, endDate] as const;
  }, [currentMonth]);

  const [startDate] = cellProps;

  // console.log(secondDate);

  const onDateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelectedDate(event.currentTarget.getAttribute("data-day") || "");
  };

  const onDateHover = (event: any) => {
    if (event.currentTarget.getAttribute("data-day")) {
      setsecondDate(event.currentTarget.getAttribute("data-day"));
      return;
    }
    if (event.currentTarget.getAttribute("data-day2")) {
      setsecondDate(
        moment(startDate)
          .add(event.currentTarget.getAttribute("data-day2"), "day")
          .toISOString()
      );
      return;
    }

    setsecondDate("");
  };
  const onDateLeave = (event: any) => {
    setsecondDate("");
  };

  const nextMonth = useMemo(
    () => () => {
      setcurrentMonth(month =>
        moment(month)
          .add(1, "month")
          .toISOString()
      );
    },
    [setcurrentMonth]
  );

  const prevMonth = useMemo(
    () => () => {
      setcurrentMonth(month =>
        moment(month)
          .subtract(1, "month")
          .toISOString()
      );
    },
    [setcurrentMonth]
  );

  return (
    <div className="calendar">
      {/* <CalHeader
        currentMonth={currentMonth}
        classes={classes}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      /> */}
      <MemoCalHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      {/* <CalHeaderDays currentMonth={currentMonth} classes={classes} /> */}
      <MemoCalHeaderDays currentMonth={currentMonth} classes={classes} />
      <CalDays
        cellProps={cellProps}
        onDateHover={onDateHover}
        selectedDate={selectedDate}
        secondDate={secondDate}
        classes={classes}
        onDateLeave={onDateLeave}
        currentMonth={currentMonth}
      />
    </div>
  );
};

interface CHProps {
  currentMonth: string;
  prevMonth?: () => void;
  nextMonth?: () => void;
}

const CalHeader: React.FC<CHProps> = ({
  currentMonth,
  prevMonth,
  nextMonth
}) => {
  const dateFormat = "MMMM YYYY";
  const { calendarHeader, iconButton } = useMoreStyles();

  return (
    <div>
      <div className={calendarHeader}>
        <IconButton className={iconButton} onClick={prevMonth}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <div>
          <Typography variant="body1">
            {moment(currentMonth).format(dateFormat)}
          </Typography>
        </div>
        <IconButton className={iconButton} onClick={nextMonth}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};
const MemoCalHeader = React.memo(CalHeader);

interface CHDProps {
  currentMonth: string;
  classes: Record<
    | "calendarHeader"
    | "hidden"
    | "iconButton"
    | "daysHeader"
    | "dayLabel"
    | "day"
    | "week"
    | "container"
    | "daySelected",
    string
  >;
}

const CalHeaderDays: React.FC<CHDProps> = ({ currentMonth, classes }) => {
  const dateFormat = "ddd";
  const days = [];

  let startDate = moment(currentMonth).startOf("week");

  for (let i = 0; i < 7; i++) {
    days.push(
      <Typography key={i} className={classes.dayLabel} variant="caption">
        {startDate.add(i > 0 ? 1 : 0, "days").format(dateFormat)}
      </Typography>
    );
  }

  return <div className={classes.daysHeader}>{days}</div>;
};

const MemoCalHeaderDays = React.memo(CalHeaderDays);

interface CDProps {
  cellProps: readonly [moment.Moment, moment.Moment];
  currentMonth: string;
  classes: Record<
    | "calendarHeader"
    | "hidden"
    | "iconButton"
    | "daysHeader"
    | "dayLabel"
    | "day"
    | "week"
    | "container"
    | "daySelected",
    string
  >;
  onDateHover: (event: any) => void;
  onDateLeave: (event: any) => void;
  selectedDate: string;
  secondDate: string;
}

const CalDays: React.FC<CDProps> = ({
  cellProps,
  onDateHover,
  selectedDate,
  secondDate,
  classes,
  onDateLeave
}) => {
  const [startDate, endDate] = cellProps;

  const [newRows] = useMemo(() => {
    const dateFormat = "D";
    const newRows = [];
    let days: { formattedDate: string; total: number }[] = [];
    let day = moment(startDate);
    let formattedDate = "";
    while (day.isBefore(endDate)) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.format(dateFormat);
        days.push({ formattedDate, total: i + 1 + (newRows.length + 1) * 7 });
        day = day.add(1, "day");
      }
      newRows.push(days);
      days = [];
    }
    return [newRows] as const;
  }, [startDate, endDate]);

  const addNewStar = (day: number) =>
    moment(startDate)
      .add(day, "days")
      .isBetween(selectedDate, secondDate) && "*";

  // const dateFormat = "D";
  // const rows = [];

  // let days = [];
  // let day = moment(startDate);
  // let formattedDate = "";

  // const addStar = (day: Moment) =>
  //   day.isBetween(selectedDate, secondDate) && "*";

  // while (day.isBefore(endDate)) {
  //   for (let i = 0; i < 7; i++) {
  //     formattedDate = day.format(dateFormat);
  //     days.push(
  //       <div
  //         key={day.toISOString()}
  //         className={classes.day}
  //         // className={classes.week}
  //         // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
  //         data-day={day.toISOString()}
  //         onMouseEnter={onDateHover}
  //       >
  //         {addStar(day)}
  //         {/* <IconButton
  //           className={[
  //             classes.day
  //             // day.isSame(monthStart, "month") ? null : classes.hidden,
  //             // day.isSame(selectedDate, "day") ? classes.daySelected : null
  //             // day.isBetween(selectedDate, secondDate)
  //             //   ? classes.daySelected
  //             //   : null
  //           ].join(" ")}
  //           // onClick={onDateClick}
  //           key={`${day.toISOString()}-btn`}
  //         > */}
  //         <Typography variant="body2">{formattedDate}</Typography>
  //         {/* </IconButton> */}
  //         {/* <span className="bg">{formattedDate}</span> */}
  //       </div>
  //     );
  //     day = day.add(1, "day");
  //   }
  //   rows.push(
  //     <div className={classes.week} key={day.toISOString()}>
  //       {days}
  //     </div>
  //   );
  //   days = [];
  // }
  return (
    <>
      {/* <div className={classes.container} onMouseLeave={onDateLeave}>
        {rows}
      </div> */}
      <div className={classes.container} onMouseLeave={onDateLeave}>
        {newRows.map((days, i) => (
          <div className={classes.week} key={`${i}-row`}>
            {days.map(day => (
              <div
                key={`${day.total}-day`}
                className={classes.day}
                // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                data-day2={day.total}
                onMouseEnter={onDateHover}
              >
                {addNewStar(day.total)}
                {/* <IconButton
                  className={[
                    classes.day
                    // day.isSame(monthStart, "month") ? null : classes.hidden,
                    // day.isSame(selectedDate, "day") ? classes.daySelected : null
                    // day.isBetween(selectedDate, secondDate)
                    //   ? classes.daySelected
                    //   : null
                  ].join(" ")}
                  // onClick={onDateClick}
                  key={`${day.total}-btn`}
                > */}
                <Typography variant="body2">{day.formattedDate}</Typography>
                {/* </IconButton> */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

interface DayProps {
  day: {
    formattedDate: string;
    total: number;
  };
  classDay: string;
  extRender: (arg: number) => false | "*";
  onDateHover: (event: any) => void;
}
const Day: React.FC<DayProps> = ({ day, classDay, extRender, onDateHover }) => {
  return (
    <div
      key={`${day.total}-day`}
      className={classDay}
      // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
      data-day2={day.total}
      onMouseEnter={onDateHover}
    >
      {extRender(day.total)}

      <Typography variant="body2">{day.formattedDate}</Typography>
    </div>
  );
};

export default NewCalendar;