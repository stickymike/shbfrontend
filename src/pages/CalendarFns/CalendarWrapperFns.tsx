import React, { useState } from "react";
import createCtx from "../../helpers/createCtx";

interface Props {
  activeMonth: Date;
  firstDate: Date;
  secondDate: Date;
  changeFirst: (a: Date) => void;
  changeSecond: (a: Date) => void;
  style?: React.CSSProperties;
}

const [useCalendarCtx, ContextProvider] = createCtx<{
  state: {
    firstDate: Date;
    secondDate: Date;
    previewDate: Date;
    preview: boolean;
  };
  setState: {
    changeFirst: (a: Date) => void;
    changeSecond: (a: Date) => void;
    setPreviewDate: React.Dispatch<React.SetStateAction<Date>>;
    setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  };
}>();

const CalendarWrapper: React.FC<Props> = ({
  firstDate,
  secondDate,
  changeFirst,
  changeSecond,
  style,
  children
}) => {
  const [previewDate, setPreviewDate] = useState(new Date(""));
  const [preview, setPreview] = useState(false);

  const state = { firstDate, secondDate, previewDate, preview };
  const setState = { changeFirst, changeSecond, setPreviewDate, setPreview };

  return (
    <ContextProvider value={{ state, setState }}>
      <div
        style={style}
        onMouseLeave={() => setPreview(false)}
        onMouseEnter={() => setPreview(true)}
      >
        {children}
      </div>
    </ContextProvider>
  );
};

export default CalendarWrapper;
export { useCalendarCtx };
