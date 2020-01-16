import React, { useState, useMemo } from "react";
import PaperWrapper from "../components/PaperWrapper";
import NewCalendar from "./CalendarFns/NewCalendarFns";
import moment from "moment";
import CalendarWrapper from "./CalendarFns/CalendarWrapperFns";

interface Props {}

const TimeRequestFns: React.FC<Props> = () => {
  const [activeMonth, setActiveMonth] = useState(moment().toISOString());
  const [firstDate, setfirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");

  const changeFirst = (a: string) => {
    setfirstDate(a);
  };

  const changeSecond = (a: string) => {
    setSecondDate(a);
  };

  const nextMonth = useMemo(
    () => () => {
      setActiveMonth(month =>
        moment(month)
          .add(1, "month")
          .toISOString()
      );
    },
    [setActiveMonth]
  );
  const prevMonth = useMemo(
    () => () => {
      setActiveMonth(month =>
        moment(month)
          .subtract(1, "month")
          .toISOString()
      );
    },
    [setActiveMonth]
  );

  const Props = {
    activeMonth,
    nextMonth,
    prevMonth
  };

  const wrapperProps = {
    activeMonth,
    firstDate,
    secondDate,
    changeFirst,
    changeSecond
  };

  return (
    <div style={{ marginTop: "-300px" }}>
      <PaperWrapper size={8} title="Test">
        <CalendarWrapper
          {...wrapperProps}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MemoNewCaledar {...Props} nextMonth={undefined} />
            <MemoNewCaledar
              {...Props}
              activeMonth={moment(activeMonth)
                .add(1, "month")
                .toISOString()}
              prevMonth={undefined}
            />
          </div>
        </CalendarWrapper>
      </PaperWrapper>
    </div>
  );
};

const MemoNewCaledar = React.memo(NewCalendar);

export default TimeRequestFns;
