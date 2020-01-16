import React, { useState } from "react";

import PaperWrapper from "../components/PaperWrapper";

import { addDays, format } from "date-fns";

const Free: React.FC = () => {
  const [date, setdate] = useState(new Date());

  const rightClick = (e: any) => {
    setdate(addDays(date, 1));
  };

  return (
    <PaperWrapper size={8} title="Test">
      <div style={{ display: "flex" }} onClick={rightClick}>
        {format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
      </div>
    </PaperWrapper>
  );
};

export default Free;
