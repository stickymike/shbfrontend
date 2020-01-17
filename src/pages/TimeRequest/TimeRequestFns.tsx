import React, { useState, useMemo } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import NewCalendar from "../CalendarFns/NewCalendarFns";
import CalendarWrapper from "../CalendarFns/CalendarWrapperFns";
import { addMonths, subMonths } from "date-fns/esm";

interface Props {}

const TimeRequestFns: React.FC<Props> = () => {
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [firstDate, setfirstDate] = useState(new Date(""));
  const [secondDate, setSecondDate] = useState(new Date(""));

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
    <div>
      <PaperWrapper size={8} title="Time Request">
        <CalendarWrapper
          {...wrapperProps}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MemoNewCaledar {...Props} nextMonth={undefined} />
            <MemoNewCaledar
              {...Props}
              activeMonth={addMonths(activeMonth, 1)}
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
