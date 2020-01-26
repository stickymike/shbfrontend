import React, { useState, useMemo } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import NewCalendar from "../CalendarFns/NewCalendarFns";
import CalendarWrapper from "../CalendarFns/CalendarWrapperFns";
import {
  addMonths,
  subMonths,
  isValid,
  endOfMonth,
  startOfMonth
} from "date-fns/esm";
import CalControlsFns from "../CalendarFns/CalControlsFns";
import Button from "@material-ui/core/Button";
import TimeRequestHandler from "./TimeRequestHandler";
import { useQuery } from "react-apollo";
import { NEW_GET_ME } from "../../gql/queries/userQuery";
import { Me, Me_me } from "../../generated/Me";
import {
  GetTimeRequestsIDandDates,
  GetTimeRequestsIDandDates_timeRequests
} from "../../generated/GetTimeRequestsIDandDates";
import { CREATE_TIMEREQUEST_ID_DATES } from "../../gql/queries/timeRequestQuery";
import MyLoading from "../../components/MyLoading";

interface Props {}

const TimeRequestFns: React.FC<Props> = () => {
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [firstDate, setfirstDate] = useState(new Date(""));
  const [secondDate, setSecondDate] = useState(new Date(""));

  const [dialogueScreen, setdialogueScreen] = useState("");

  const { data } = useQuery<Me>(NEW_GET_ME);

  let me = { id: "" } as Me_me;
  if (data) me = data.me!;

  const { data: timeData, loading } = useQuery<GetTimeRequestsIDandDates>(
    CREATE_TIMEREQUEST_ID_DATES,
    {
      variables: {
        userId: me.id,
        startTimeShown: startOfMonth(activeMonth),
        endTimeShown: endOfMonth(addMonths(activeMonth, 1))
      }
    }
  );

  let timeRequests = [] as GetTimeRequestsIDandDates_timeRequests[];
  if (timeData) timeRequests = timeData.timeRequests!;

  const changeScreen = (screen: string) => {
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

  const returnToNow = useMemo(
    () => () => {
      setActiveMonth(month => new Date());
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
    returnToNow,
    setActiveMonth
  };

  return (
    <div>
      <PaperWrapper size={8} title="Time Off Request">
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
            <div style={{ height: "0px", flexBasis: "100%" }} />
            <CalControlsFns />
          </div>
        </CalendarWrapper>

        <Button
          color="primary"
          variant="outlined"
          disabled={!isValid(firstDate)}
          onClick={() => changeScreen("CREATE")}
        >
          Create New Request
        </Button>
        <TimeRequestHandler
          dialogueScreen={dialogueScreen}
          changeScreen={changeScreen}
          dates={[firstDate, secondDate]}
          user={me}
        />
        {/* <CreateTimeRequest /> */}
      </PaperWrapper>
    </div>
  );
};

const MemoNewCaledar = NewCalendar;

export default TimeRequestFns;
