import React, { useState, useEffect } from "react";

import { makeStyles, IconButton, Theme } from "@material-ui/core";

import moment from "moment";
import { useCalendarCtx } from "./CalendarWrapper";

const useMoreStyles = makeStyles((theme: Theme) => ({
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "2px",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    padding: 0,
    zIndex: 10
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
    backgroundColor: `${theme.palette.primary.light} !important`,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
    transform: "scale(1.01)"
  },
  dayPreview: {
    backgroundColor: theme.palette.grey[300]
  },
  newTest: {
    transition: theme.transitions.create(["opacity"]),
    height: "36px",
    flexGrow: 1,
    borderRadius: "60px",
    display: "flex",
    flexDirection: "row-reverse"
  },
  indicatorLeft: {
    flexDirection: "row"
  },
  selectedBoarder: {
    borderTop: "1.5px dashed black",
    borderBottom: "1.5px dashed black"
  },
  rightBorder: {
    borderRight: "1.5px dashed black"
  },
  leftBorder: {
    borderLeft: "1.5px dashed black"
  },
  other: {
    transition: theme.transitions.create(["opacity"]),
    height: "36px",
    width: "36px",
    border: "1.8px solid black",
    borderRadius: "60px",
    right: "36px",
    alignSelf: "center"
  },
  left: {
    transition: theme.transitions.create(["width"], {
      duration: theme.transitions.duration.complex,
      easing: "cubic-bezier(0.25, 0.46, 0.49, 1.32)"
    })
  },
  right: {
    transition: theme.transitions.create(["width"], {
      duration: theme.transitions.duration.complex,
      easing: "cubic-bezier(0.25, 0.46, 0.49, 1.32)"
    })
  },
  hide: {
    opacity: 0
  },
  unhide: {
    opacity: 1
  },
  flexContainer: {
    transition: theme.transitions.create(["opacity"]),
    position: "absolute",
    width: "360px",
    height: "40px",
    flexDirection: "row",
    display: "flex",
    alignItems: "center"
  },

  newestTest: {
    backgroundColor: theme.palette.grey[300]
  },
  zeroDay: {
    width: "2px"
  },
  oneDay: {
    width: "42px"
  },
  twoDay: {
    width: "82px"
  },
  threeDay: {
    width: "122px"
  },
  fourDay: {
    width: "162px"
  },
  fiveDay: {
    width: "202px"
  },
  sixDay: {
    width: "242px"
  },
  sevenDay: {
    width: "282px"
  },
  eightDay: {
    width: "322px"
  }
}));

interface CDProps {
  month: {
    formattedDate: string;
    total: number;
    iso: string;
    hidden: boolean;
  }[][];
}

const CalArea: React.FC<CDProps> = ({ month }) => {
  const leftSpace = (date: string) => {
    const dayofWeek = moment(date).weekday();
    switch (dayofWeek) {
      case 0:
        return "oneDay";
      case 1:
        return "twoDay";
      case 2:
        return "threeDay";
      case 3:
        return "fourDay";
      case 4:
        return "fiveDay";
      case 5:
        return "sixDay";
      case 6:
        return "sevenDay";
      default:
        return "oneDay";
    }
  };
  const rightSpace = (date: string) => {
    const dayofWeek = moment(date).weekday();
    switch (dayofWeek) {
      case 0:
        return "sevenDay";
      case 1:
        return "sixDay";
      case 2:
        return "fiveDay";
      case 3:
        return "fourDay";
      case 4:
        return "threeDay";
      case 5:
        return "twoDay";
      case 6:
        return "oneDay";
      default:
        return "sevenDay";
    }
  };

  const {
    state: {
      firstDate: selectedDate,
      secondDate,
      previewDate,
      preview: showPreview
    },
    setState: { changeSecond, changeFirst, setPreviewDate }
  } = useCalendarCtx();

  // const [previewDate, setPreviewDate] = useState("");
  const [lastDate, setlastDate] = useState("");
  const classes: any = useMoreStyles();

  const constDate = moment()
    .subtract(10, "years")
    .startOf("week");
  const iWeek = moment(month[0][6].iso).diff(constDate, "weeks");

  const createDates = (date: string) => {
    const b =
      moment(date).diff(
        moment()
          .subtract(10, "years")
          .startOf("week"),
        "weeks"
      ) - 1;
    const a = moment(date).format("x");
    const c = moment(date).weekday();
    return [a, b, c] as const;
  };

  const [
    previewDateMs,
    previewWeekMinusOne,
    previewDayOfWeek
  ] = React.useMemo(() => createDates(previewDate), [previewDate]);
  const [
    secondDateMs,
    secondWeekMinusOne,
    secondDayOfWeek
  ] = React.useMemo(() => createDates(secondDate), [secondDate]);
  const [lastDateMs, lastWeekMinusOne] = React.useMemo(
    () => createDates(lastDate),
    [lastDate]
  );
  const [
    selectedDateMs,
    selectedWeekMinusOne,
    selectedDayOfWeek
  ] = React.useMemo(() => createDates(selectedDate), [selectedDate]);

  const direction: "left" | "right" =
    previewDateMs < lastDateMs ? "left" : "right";

  const DateHover = (event: any) => {
    const hoverDate = event.currentTarget.getAttribute("data-day2") || "";
    if (hoverDate === selectedDate || hoverDate === secondDate)
      setlastDate(hoverDate);
    setPreviewDate(hoverDate);
  };

  const wrappedOnCLick = (event: any) => {
    const clickDate = event.currentTarget.getAttribute("data-day2") || "";
    const clickDateMs = moment(clickDate).format("x");
    const oldSelectedDate = selectedDate;
    const oldSecondDate = secondDate;

    if (!selectedDate) changeFirst(clickDate);
    else if (selectedDate && !secondDate) {
      if (clickDateMs < selectedDateMs) {
        changeFirst(clickDate);
        changeSecond(oldSelectedDate);
      } else if (clickDate === selectedDate) {
        changeFirst("");
      } else changeSecond(clickDate);
    } else {
      if (clickDate === selectedDate) {
        changeFirst(oldSecondDate);
        changeSecond("");
      } else if (clickDate === secondDate) {
        changeSecond("");
      } else if (clickDateMs < secondDateMs && clickDateMs > selectedDateMs) {
        if (direction === "left") changeSecond(clickDate);
        else changeFirst(clickDate);
      } else if (direction === "left") {
        changeFirst(clickDate);
      } else {
        changeSecond(clickDate);
      }
    }
  };

  useEffect(() => {
    if (!secondDate) setlastDate(selectedDate);
    if (lastDate && previewDateMs <= selectedDateMs) setlastDate(selectedDate);
    if (lastDate && previewDateMs >= secondDateMs) setlastDate(secondDate);
    return () => {};
  }, [
    lastDate,
    previewDateMs,
    secondDate,
    secondDateMs,
    selectedDate,
    selectedDateMs
  ]);

  const leftVersion = (a1: any, a2: any) => {
    return a1 < a2;
  };

  const rightVersion = (a1: any, a2: any) => {
    return a1 > a2;
  };

  const singleFunct = (f1: any, f2: (arg: string) => string) => (i: number) => {
    i += iWeek - 1;

    // const testFunction2 = (date: any) => {
    //   if (f1(previewDate, date)) {
    //     if (f1(i, previewWeekMinusOne)) {
    //       return classes.sevenDay;
    //     } else if (i === previewWeekMinusOne) return classes[f2(previewDate)!];
    //     else return classes.oneDay;
    //   } else {
    //     if (i === moment(date).diff(constDate, "weeks") - 1)
    //       return classes[f2(date)];
    //     else return classes.oneDay;
    //   }
    // };

    const testFunction2 = (date: any) => {
      if (f1(previewDate, date)) {
        if (f1(i, previewWeekMinusOne)) {
          return classes.sevenDay;
        } else if (
          i === previewWeekMinusOne
          // moment(month[0][6].iso).isSame(date, "month")
        )
          return classes[f2(previewDate)!];
        else if (
          i ===
            moment(month[0][6].iso)
              .startOf("month")
              .diff(constDate, "weeks") -
              1 &&
          f1(selectedDateMs, secondDateMs)
        ) {
          return classes[
            f2(
              moment(month[0][6].iso)
                .startOf("month")
                .toISOString()
            )
          ];
        } else if (
          i ===
            moment(month[0][6].iso)
              .endOf("month")
              .diff(constDate, "weeks") -
              1 &&
          f1(secondDateMs, selectedDateMs)
        ) {
          return classes[
            f2(
              moment(month[0][6].iso)
                .endOf("month")
                .toISOString()
            )
          ];
        } else return classes.oneDay;
      } else {
        if (
          i === moment(date).diff(constDate, "weeks") - 1 &&
          moment(month[0][6].iso).isSame(date, "month")
        )
          return classes[f2(date)];
        else if (
          i ===
            moment(month[0][6].iso)
              .endOf("month")
              .diff(constDate, "weeks") -
              1 &&
          f1(secondDateMs, selectedDateMs)
        ) {
          return classes[
            f2(
              moment(month[0][6].iso)
                .endOf("month")
                .toISOString()
            )
          ];
        } else if (
          i ===
            moment(month[0][6].iso)
              .startOf("month")
              .diff(constDate, "weeks") -
              1 &&
          f1(selectedDateMs, secondDateMs)
        ) {
          return classes[
            f2(
              moment(month[0][6].iso)
                .startOf("month")
                .toISOString()
            )
          ];
        } else return classes.oneDay;
      }
    };

    if (!selectedDate) {
      if (previewWeekMinusOne === i) return classes[f2(previewDate)];
      if (f1(previewWeekMinusOne, i)) return classes.oneDay;
      return classes.sevenDay;
    }

    return testFunction2(lastDate);
  };

  const functionsLeft = singleFunct(leftVersion, leftSpace);
  const functionsRight = singleFunct(rightVersion, rightSpace);

  const singleStaticFunction = (f1: any, f2: (arg: string) => string) => (
    i: number
  ) => {
    i += iWeek - 1;
    if (secondDate) {
      if (!moment(selectedDate).isSame(secondDate, "month")) {
        if (
          i === moment(f1).diff(constDate, "weeks") - 1 &&
          moment(month[0][6].iso).isSame(f1, "month")
        )
          return classes[f2(f1)];
        if (
          i ===
          moment(month[0][6].iso)
            .startOf("month")
            .diff(constDate, "weeks") -
            1
        )
          return f1 === selectedDate
            ? classes[
                f2(
                  moment(month[0][6].iso)
                    .startOf("month")
                    .toISOString()
                )
              ]
            : classes.oneDay;
        if (
          i ===
          moment(month[0][6].iso)
            .endOf("month")
            .diff(constDate, "weeks") -
            1
        )
          return f1 === selectedDate
            ? classes.oneDay
            : classes[
                f2(
                  moment(month[0][6].iso)
                    .endOf("month")
                    .toISOString()
                )
              ];
      } else if (i === moment(f1).diff(constDate, "weeks") - 1)
        return classes[f2(f1)];
    }

    return classes.oneDay;
  };

  const functionsLeft2 = singleStaticFunction(selectedDate, leftSpace);
  const functionsRight2 = singleStaticFunction(secondDate, rightSpace);

  const functionsPreviewContainer = (i: number) => {
    i += iWeek - 1;
    let myClasses: string[] = [selectedDate ? classes.selectedBoarder : null];
    myClasses.push(direction === "left" ? classes.indicatorLeft : null);
    if (selectedDate) {
      if (direction === "left") {
        if (!(i === selectedWeekMinusOne && selectedDayOfWeek === 0)) {
          if (i >= previewWeekMinusOne)
            if (
              !(
                (i === previewWeekMinusOne && previewDayOfWeek === 6) ||
                lastDateMs === previewDateMs ||
                moment(previewDate).isSame(
                  moment(month[0][6].iso).endOf("month"),
                  "day"
                )
              )
            )
              myClasses.push(classes.rightBorder);
          if (i > previewWeekMinusOne) myClasses.push(classes.leftBorder);
        }
      }
      if (direction === "right") {
        if (
          !(
            (i === selectedWeekMinusOne && selectedDayOfWeek === 6) ||
            (i === selectedWeekMinusOne && secondDayOfWeek === 6)
          )
        ) {
          if (i <= previewWeekMinusOne)
            if (
              !(
                (i === previewWeekMinusOne && previewDayOfWeek === 0) ||
                lastDateMs === previewDateMs ||
                moment(previewDate).isSame(
                  moment(month[0][6].iso).startOf("month"),
                  "day"
                )
              )
            )
              myClasses.push(classes.leftBorder);
          if (i < previewWeekMinusOne) myClasses.push(classes.rightBorder);
        }
      }
    }
    return myClasses;
  };

  const hideCursor2 = (i: number) => {
    i += iWeek - 1;
    if (secondDate) {
      if (i >= selectedWeekMinusOne && i <= secondWeekMinusOne)
        return classes.unhide;
      return classes.hide;
    }
    return classes.hide;
  };

  const hidecursor = (i: number) => {
    // return classes.unhide;
    i += iWeek - 1;
    if (showPreview) {
      if (!selectedDate && previewWeekMinusOne === i) return classes.unhide;

      if (direction === "left") {
        if (i >= previewWeekMinusOne && i <= lastWeekMinusOne)
          return classes.unhide;
      }
      if (direction === "right") {
        if (i <= previewWeekMinusOne && i >= lastWeekMinusOne)
          return classes.unhide;
      }
    }
    return classes.hide;
  };

  return (
    <div className={classes.container}>
      {month.map((days, i) => (
        <div className={classes.week} key={`${i}-row`}>
          {secondDate && (
            <span className={[classes.flexContainer, null].join(" ")}>
              <span className={[classes.left, functionsLeft2(i)].join(" ")} />
              <span
                className={[
                  classes.newTest,
                  hideCursor2(i),
                  classes.newestTest
                ].join(" ")}
              ></span>
              <span className={[classes.left, functionsRight2(i)].join(" ")} />
            </span>
          )}
          <span className={[classes.flexContainer].join(" ")}>
            <span className={[classes.left, functionsLeft(i)].join(" ")} />
            <span
              className={[
                classes.newTest,
                ...functionsPreviewContainer(i),
                hidecursor(i)
              ].join(" ")}
            >
              <div
                className={[
                  classes.other,
                  previewWeekMinusOne === iWeek + i - 1
                    ? classes.unhide
                    : classes.hide
                ].join(" ")}
              />
            </span>
            <span className={[classes.left, functionsRight(i)].join(" ")} />
          </span>
          {days.map((day, i) => (
            <div
              key={`${day.iso}-day`}
              className={!day.hidden ? classes.hidden : undefined}
              onClick={wrappedOnCLick}
              data-day2={day.iso}
              onMouseEnter={DateHover}
            >
              <MemoButton
                className={[
                  classes.day,
                  moment(day.iso).isSame(selectedDate, "day") ||
                  moment(day.iso).isSame(secondDate, "day")
                    ? classes.daySelected
                    : null
                ].join(" ")}
                key={`${day.total}-btn`}
              >
                <MemoMySpan show={day.formattedDate} key={day.iso} />
              </MemoButton>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MySpan: React.FC<{ show: string }> = props => {
  const { show } = props;
  return (
    <>
      <span
        key={show}
        className={"MuiTypography-body2 MuiTypography-root test"}
      >
        {show}
      </span>
      <span className={"test1"}> </span>
    </>
  );
};

const MemoMySpan = React.memo(MySpan);

const MemoButton = React.memo(IconButton, (first, second) => {
  return first.className === second.className;
});

export default CalArea;
