import React, { useState, useEffect, useRef } from "react";
import createCtx from "../../helpers/createCtx";
import { isValid, isBefore, isEqual, isAfter, isSameDay } from "date-fns/esm";

interface Props {
  activeMonth: Date;
  firstDate: Date;
  secondDate: Date;
  changeFirst: (a: Date) => void;
  changeSecond: (a: Date) => void;
  style?: React.CSSProperties;
  returnToNow: () => void;
  setActiveMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const [useCalendarCtx, ContextProvider] = createCtx<{
  state: {
    firstDate: Date;
    secondDate: Date;
    previewDate: Date;
    preview: boolean;
    dLastDate: Date;
    activeMonth: Date;
  };
  setState: {
    changeFirst: (a: Date) => void;
    changeSecond: (a: Date) => void;
    setPreviewDate: React.Dispatch<React.SetStateAction<Date>>;
    setPreview: React.Dispatch<React.SetStateAction<boolean>>;
    setlastDate: React.Dispatch<React.SetStateAction<Date>>;
    returnToNow: () => void;
    setActiveMonth: React.Dispatch<React.SetStateAction<Date>>;
  };
}>();

const CalendarWrapper: React.FC<Props> = ({
  activeMonth,
  firstDate,
  secondDate,
  changeFirst,
  changeSecond,
  returnToNow,
  style,
  setActiveMonth,
  children
}) => {
  const [previewDate, setPreviewDate] = useState(new Date(""));
  const [preview, setPreview] = useState(false);
  const [dLastDate, setlastDate] = useState(new Date(""));
  const myRef = useRef(null);

  const state = {
    firstDate,
    secondDate,
    previewDate,
    preview,
    dLastDate,
    activeMonth
  };
  const setState = {
    changeFirst,
    changeSecond,
    setPreviewDate,
    setPreview,
    setlastDate,
    returnToNow,
    setActiveMonth
  };

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      if (!preview) setPreviewDate(dLastDate);
    }, 500);

    return () => {
      clearTimeout(myTimeOut);
    };
  }, [dLastDate, preview]);

  useEffect(() => {
    if (isSameDay(previewDate, firstDate)) setlastDate(firstDate);
    if (isSameDay(previewDate, secondDate)) setlastDate(secondDate);
    if (!isValid(secondDate)) setlastDate(firstDate);
    if (isBefore(previewDate, firstDate) || isEqual(previewDate, firstDate))
      setlastDate(firstDate);
    if (isAfter(previewDate, secondDate) || isEqual(previewDate, secondDate))
      setlastDate(secondDate);
    return () => {};
  }, [dLastDate, firstDate, previewDate, secondDate]);

  return (
    <ContextProvider value={{ state, setState }}>
      <div style={style} ref={myRef}>
        {children}
      </div>
    </ContextProvider>
  );
};

export default CalendarWrapper;
export { useCalendarCtx };
