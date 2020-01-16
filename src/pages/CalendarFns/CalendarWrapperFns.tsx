import React, { useState } from "react";
import createCtx from "../../helpers/createCtx";

interface Props {
  activeMonth: string;
  firstDate: string;
  secondDate: string;
  changeFirst: (a: string) => void;
  changeSecond: (a: string) => void;
  style?: React.CSSProperties;
}

const [useCalendarCtx, ContextProvider] = createCtx<{
  state: {
    firstDate: string;
    secondDate: string;
    previewDate: string;
    preview: boolean;
  };
  setState: {
    changeFirst: (a: string) => void;
    changeSecond: (a: string) => void;
    setPreviewDate: React.Dispatch<React.SetStateAction<string>>;
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
  const [previewDate, setPreviewDate] = useState("");
  const [preview, setPreview] = useState(false);

  const state = { firstDate, secondDate, previewDate, preview };
  const setState = { changeFirst, changeSecond, setPreviewDate, setPreview };

  return (
    <ContextProvider value={{ state, setState }}>
      <div
        style={style}
        // onMouseLeave={() => setPreview(false)}
        onMouseEnter={() => setPreview(true)}
      >
        {children}
      </div>
    </ContextProvider>
  );
};

export default CalendarWrapper;
export { useCalendarCtx };
