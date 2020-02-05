import React, { useState, useMemo } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import NewCalendar from "../../components/CalendarFns/NewCalendarFns";
import CalendarWrapper from "../../components/CalendarFns/CalendarWrapperFns";
import {
  addMonths,
  subMonths,
  isValid,
  isBefore,
  startOfMonth,
  endOfMonth,
  isAfter,
  isSameDay,
  addDays
} from "date-fns/esm";

import isBetween from "../../helpers/Dates/isBetween";
import CalControlsFns from "../../components/CalendarFns/CalControlsFns";
import Button from "@material-ui/core/Button";
import TimeRequestHandler from "./TimeRequestHandler";

import useTimeRequestData from "./hooks/useTimeRequestData";
import GenericTable from "../../components/Table/GenericTable";
import TRTableLoader from "./Components/TRTableLoader";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
import NewPaper from "../../components/NewPaper";

interface Props {}

const TimeRequestFns: React.FC<Props> = () => {
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [firstDate, setfirstDate] = useState(new Date(""));
  const [secondDate, setSecondDate] = useState(new Date(""));
  const [dialogueScreen, setdialogueScreen] = useState("");
  const [timeRequest, setTimeRequest] = useState<
    GetTimeRequestsIDandDates_timeRequests | undefined
  >(undefined);

  const firstQDate = () => {
    if (!isValid(firstDate)) return startOfMonth(activeMonth);
    if (isBefore(firstDate, startOfMonth(activeMonth))) return firstDate;
    return startOfMonth(activeMonth);
  };
  const secondQDate = () => {
    const defaultDate = endOfMonth(addMonths(activeMonth, 1));
    if (!isValid(firstDate) || !isValid(secondDate)) return defaultDate;
    if (isAfter(secondDate, defaultDate)) return secondDate;
    return defaultDate;
  };

  const [me, timeRequests, qInfoTimeRequests] = useTimeRequestData(
    firstQDate(),
    secondQDate()
  );

  const changeScreen = (screen: string) => {
    if (screen === "") {
      setTimeout(() => setTimeRequest(undefined), 200);
      if (dialogueScreen === "CREATE") {
        setfirstDate(new Date(""));
        setSecondDate(new Date(""));
      }
    }
    setdialogueScreen(screen);
  };

  const changeFirst = (a: Date) => {
    setfirstDate(a);
  };

  const changeSecond = (a: Date) => {
    setSecondDate(a);
  };

  const nextMonth = useMemo(
    () => () => {
      setActiveMonth(date => addMonths(date, 1));
    },
    [setActiveMonth]
  );
  const prevMonth = useMemo(
    () => () => {
      setActiveMonth(month => subMonths(month, 1));
    },
    [setActiveMonth]
  );

  const Props = {
    activeMonth,
    nextMonth,
    prevMonth,
    timeRequests
  };

  const wrapperProps = {
    activeMonth,
    firstDate,
    secondDate,
    changeFirst,
    changeSecond,

    setActiveMonth
  };

  const filterTimeRequest = (
    timeRequests: GetTimeRequestsIDandDates_timeRequests[]
  ) => {
    return timeRequests.filter(
      ({ startTime, endTime, isAllDay }) =>
        (isValid(firstDate) &&
          !isValid(secondDate) &&
          isSameDay(new Date(startTime), firstDate)) ||
        (isValid(firstDate) &&
          isValid(secondDate) &&
          isAfter(new Date(startTime), addDays(firstDate, -1)) &&
          isBefore(new Date(endTime), addDays(secondDate, 1))) ||
        (isValid(firstDate) &&
          isAllDay &&
          isBetween(firstDate, new Date(startTime), new Date(endTime))) ||
        (isValid(firstDate) &&
          isValid(secondDate) &&
          isAllDay &&
          isBetween(secondDate, new Date(startTime), new Date(endTime)))
    );
  };

  return (
    <NewPaper size={8} title="Time Off Request">
      <CalendarWrapper
        {...wrapperProps}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <MemoNewCaledar {...Props} nextMonth={undefined} />
          <MemoNewCaledar
            {...Props}
            activeMonth={addMonths(activeMonth, 1)}
            prevMonth={undefined}
          />
          <div
            style={{
              marginTop: "16px",
              marginBottom: "16px",
              width: `${280 * 2 + 3 * 8}px`,
              alignItems: "center",
              display: "flex"
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              disabled={!isValid(firstDate)}
              onClick={() => changeScreen("CREATE")}
            >
              Create New Request
            </Button>
            <div style={{ flexGrow: 1 }} />
            <CalControlsFns />
          </div>
        </div>
      </CalendarWrapper>

      <TRTableLoader
        changeScreen={changeScreen}
        changeTR={setTimeRequest}
        timeRequests={filterTimeRequest(timeRequests)}
        table={GenericTable}
        tableWrapperStyles={{ tableLayout: "auto" }}
        messageNoEntries="Select Dates to show Requests"
      />

      <TimeRequestHandler
        dialogueScreen={dialogueScreen}
        changeScreen={changeScreen}
        dates={[firstDate, secondDate]}
        user={me}
        timeRequest={timeRequest}
        qInfoTimeRequests={qInfoTimeRequests}
      />
    </NewPaper>
  );
};

const MemoNewCaledar = NewCalendar;

export default TimeRequestFns;
