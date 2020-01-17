import React, { useState, useEffect } from "react";

import { makeStyles, IconButton, Theme, Badge, Color } from "@material-ui/core";

import { useCalendarCtx } from "./CalendarWrapperFns";
import {
  getDay,
  isSameDay,
  isBefore,
  isValid,
  isAfter,
  isEqual,
  startOfWeek,
  isSameWeek,
  addWeeks,
  isSameMonth,
  endOfMonth,
  startOfMonth,
  endOfWeek,
  startOfDay
} from "date-fns/esm";
import { relative } from "path";

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
  const leftSpace = (date: Date) => {
    const dayofWeek = getDay(new Date(date));
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
  const rightSpace = (date: Date) => {
    const dayofWeek = getDay(new Date(date));
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
      firstDate: dSelectedDate,
      secondDate: dSecondDate,
      previewDate: dPreviewDate,
      preview: showPreview
    },
    setState: { changeSecond, changeFirst, setPreviewDate }
  } = useCalendarCtx();

  const [dLastDate, setlastDate] = useState(new Date(""));

  const classes: any = useMoreStyles();

  const firstShownWeek = startOfMonth(new Date(month[0][6].iso));
  const lastShownWeek = endOfMonth(firstShownWeek);

  const DateHover = (event: any) => {
    const hoverDate = event.currentTarget.getAttribute("data-day2") || "";
    const dHoverDate = new Date(hoverDate);
    if (
      isSameDay(dHoverDate, dSelectedDate) ||
      isSameDay(dHoverDate, dSecondDate)
    )
      setlastDate(dHoverDate);
    setPreviewDate(dHoverDate);
  };

  const wrappedOnCLick = (event: any) => {
    const clickDate = event.currentTarget.getAttribute("data-day2") || "";
    const dClickDate = new Date(clickDate);

    const oldSelectedDate = dSelectedDate;
    const oldSecondDate = dSecondDate;

    if (!isValid(dSelectedDate)) changeFirst(dClickDate);
    else if (isValid(dSelectedDate) && !isValid(dSecondDate)) {
      if (isBefore(dClickDate, dSelectedDate)) {
        changeFirst(dClickDate);
        changeSecond(oldSelectedDate);
      } else if (isSameDay(dClickDate, dSelectedDate)) {
        changeFirst(new Date(""));
      } else changeSecond(dClickDate);
    } else {
      if (isSameDay(dClickDate, dSelectedDate)) {
        changeFirst(oldSecondDate);
        changeSecond(new Date(""));
      } else if (isSameDay(dClickDate, dSecondDate)) {
        changeSecond(new Date(""));
      } else if (
        isBefore(dClickDate, dSecondDate) &&
        isAfter(dClickDate, dSelectedDate)
      ) {
        if (isBefore(dPreviewDate, dLastDate)) changeSecond(dClickDate);
        else changeFirst(dClickDate);
      } else if (isBefore(dPreviewDate, dLastDate)) {
        changeFirst(dClickDate);
      } else {
        changeSecond(dClickDate);
      }
    }
  };

  useEffect(() => {
    if (!isValid(dSecondDate)) setlastDate(dSelectedDate);
    if (
      isValid(dLastDate) &&
      (isBefore(dPreviewDate, dSelectedDate) ||
        isEqual(dPreviewDate, dSelectedDate))
    )
      setlastDate(dSelectedDate);
    if (
      isValid(dLastDate) &&
      (isAfter(dPreviewDate, dSecondDate) || isEqual(dPreviewDate, dSecondDate))
    )
      setlastDate(dSecondDate);
    return () => {};
  }, [dLastDate, dPreviewDate, dSecondDate, dSelectedDate]);

  const createLeftRightPreviewFunctions = (f1: any, f2: any) => (i: number) => {
    const dWeekInLoop = addWeeks(firstShownWeek, i);
    const dTestDay = f1(firstShownWeek, lastShownWeek)
      ? firstShownWeek
      : lastShownWeek;
    const dAltTestDay = isSameDay(dTestDay, firstShownWeek)
      ? lastShownWeek
      : firstShownWeek;

    const testFunction2 = () => {
      if (f1(dPreviewDate, dLastDate)) {
        if (
          isSameWeek(dWeekInLoop, dPreviewDate) &&
          isSameMonth(dPreviewDate, dTestDay)
        )
          return classes[f2(dPreviewDate)!];
        else if (f1(dWeekInLoop, dPreviewDate)) {
          if (isSameWeek(dWeekInLoop, dAltTestDay)) {
            return classes[f2(dAltTestDay)];
          }
          return classes.sevenDay;
        } else if (isSameWeek(dWeekInLoop, dTestDay)) {
          return classes[f2(dTestDay)];
        } else return classes.oneDay;
      } else {
        if (
          isSameWeek(dWeekInLoop, dLastDate) &&
          isSameMonth(dTestDay, dLastDate)
        )
          return classes[f2(dLastDate)];
        else if (isSameWeek(dWeekInLoop, dTestDay)) {
          return classes[f2(dTestDay)];
        } else return classes.oneDay;
      }
    };

    if (!isValid(dSelectedDate)) {
      if (
        isSameWeek(dWeekInLoop, dPreviewDate) &&
        isSameMonth(dPreviewDate, dTestDay)
      )
        return classes[f2(dPreviewDate)];
      if (f1(dPreviewDate, dWeekInLoop)) return classes.oneDay;
      return classes.sevenDay;
    }

    return testFunction2();
  };

  const functionsLeft = createLeftRightPreviewFunctions(isBefore, leftSpace);
  const functionsRight = createLeftRightPreviewFunctions(isAfter, rightSpace);

  const singleStaticFunction = (f1: Date, f2: (arg: Date) => string) => (
    i: number
  ) => {
    const dWeekInLoop = addWeeks(firstShownWeek, i);

    if (isValid(dSecondDate)) {
      if (!isSameMonth(dSecondDate, dSelectedDate)) {
        if (isSameWeek(dWeekInLoop, f1) && isSameMonth(firstShownWeek, f1))
          return classes[f2(f1)];
        if (isSameWeek(dWeekInLoop, firstShownWeek))
          return isSameDay(f1, dSelectedDate)
            ? classes[f2(firstShownWeek)]
            : classes.oneDay;
        if (isSameWeek(dWeekInLoop, lastShownWeek))
          return isSameDay(f1, dSelectedDate)
            ? classes.oneDay
            : classes[f2(lastShownWeek)];
      } else if (isSameWeek(dWeekInLoop, f1)) return classes[f2(f1)];
    }
    return classes.oneDay;
  };

  const functionsLeft2 = singleStaticFunction(dSelectedDate, leftSpace);
  const functionsRight2 = singleStaticFunction(dSecondDate, rightSpace);

  const functionsPreviewContainer = (i: number) => {
    const theStartOfWeek = addWeeks(startOfDay(startOfWeek(firstShownWeek)), i);
    const theEndofWeek = addWeeks(startOfDay(endOfWeek(firstShownWeek)), i);
    const dWeekInLoopStart = isBefore(theStartOfWeek, firstShownWeek)
      ? startOfDay(firstShownWeek)
      : theStartOfWeek;

    const dWeekInLoopEnd = isAfter(theEndofWeek, lastShownWeek)
      ? startOfDay(lastShownWeek)
      : theEndofWeek;
    let myClasses: string[] = [
      isValid(dSelectedDate) ? classes.selectedBoarder : null
    ];
    myClasses.push(
      isBefore(dPreviewDate, dLastDate) ? classes.indicatorLeft : null
    );
    if (isValid(dLastDate))
      if (isBefore(dPreviewDate, dLastDate)) {
        if (isAfter(dWeekInLoopEnd, dPreviewDate)) {
          if (!isSameDay(dLastDate, dWeekInLoopStart)) {
            myClasses.push(classes.rightBorder);
          }
        }
        if (isAfter(dWeekInLoopStart, dPreviewDate)) {
          if (!isSameDay(dLastDate, dWeekInLoopStart))
            myClasses.push(classes.leftBorder);
        }
      }
    if (isAfter(dPreviewDate, dLastDate)) {
      if (isBefore(dWeekInLoopStart, dPreviewDate)) {
        if (!isSameDay(dLastDate, dWeekInLoopEnd))
          myClasses.push(classes.leftBorder);
      }
      if (isBefore(dWeekInLoopEnd, dPreviewDate)) {
        if (!isSameDay(dLastDate, dWeekInLoopEnd))
          myClasses.push(classes.rightBorder);
      }
    }
    return myClasses;
  };

  const hideCursor2 = (i: number) => {
    const dWeekInLoop = addWeeks(firstShownWeek, i);

    if (isValid(dSecondDate)) {
      if (
        (isSameWeek(dWeekInLoop, dSelectedDate) ||
          isAfter(dWeekInLoop, dSelectedDate)) &&
        (isSameWeek(dWeekInLoop, dSecondDate) ||
          isBefore(dWeekInLoop, dSecondDate)) &&
        !(
          isBefore(lastShownWeek, dSelectedDate) ||
          isAfter(firstShownWeek, dSecondDate)
        )
      )
        return classes.unhide;
      return classes.hide;
    }
    return classes.hide;
  };

  const hidecursor = (i: number) => {
    // return classes.unhide;

    const theStartOfWeek = addWeeks(startOfDay(startOfWeek(firstShownWeek)), i);
    const theEndofWeek = addWeeks(startOfDay(endOfWeek(firstShownWeek)), i);
    const dWeekInLoopStart = isBefore(theStartOfWeek, firstShownWeek)
      ? firstShownWeek
      : theStartOfWeek;

    const dWeekInLoopEnd = isAfter(theEndofWeek, lastShownWeek)
      ? lastShownWeek
      : theEndofWeek;

    if (showPreview) {
      if (!isValid(dSelectedDate) && isSameWeek(dWeekInLoopStart, dPreviewDate))
        return classes.unhide;
      if (isBefore(dPreviewDate, dLastDate)) {
        if (
          (isAfter(dWeekInLoopEnd, dPreviewDate) ||
            isSameDay(dWeekInLoopEnd, dPreviewDate)) &&
          isBefore(dWeekInLoopStart, dLastDate)
        )
          return classes.unhide;
      }
      if (isAfter(dPreviewDate, dLastDate)) {
        if (
          (isBefore(dWeekInLoopStart, dPreviewDate) ||
            isSameDay(dWeekInLoopStart, dPreviewDate)) &&
          isAfter(dWeekInLoopEnd, dLastDate)
        )
          return classes.unhide;
      }
    }
    return classes.hide;
  };

  return (
    <div className={classes.container}>
      {month.map((days, i) => (
        <div className={classes.week} key={`${i}-row`}>
          {isValid(dSecondDate) && (
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
                  isSameWeek(dPreviewDate, addWeeks(firstShownWeek, i)) &&
                  isSameMonth(dPreviewDate, firstShownWeek)
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
                  isSameDay(new Date(day.iso), dSelectedDate) ||
                  isSameDay(new Date(day.iso), dSecondDate)
                    ? classes.daySelected
                    : null
                ].join(" ")}
                key={`${day.total}-btn`}
              >
                <MemoMySpan show={day.formattedDate} key={day.iso} />
                {day.formattedDate === "16" && <MyBadge amount={2} />}
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
    </>
  );
};

const MemoMySpan = React.memo(MySpan);

const MemoButton = React.memo(IconButton, (first, second) => {
  return first.className === second.className;
});

const useStyles = makeStyles((theme: Theme) => ({
  defaultBadge: {
    position: "absolute",
    width: "6px",
    height: "6px",
    borderRadius: "60px",
    bottom: "3px",
    background: (amount: number) => theme.palette.grey[700]
  }
}));

const MyBadge: React.FC<{ amount: number }> = ({ amount }) => {
  const { defaultBadge }: any = useStyles(amount);

  return <span className={defaultBadge}> </span>;
};

export default CalArea;
