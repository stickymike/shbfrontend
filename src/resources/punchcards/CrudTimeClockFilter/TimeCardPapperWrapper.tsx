import React from "react";
import { IPaperProps } from "../../../components/NewPaper";
import { useTimeCLockCTX } from "./TimeCardFilter";

interface Props extends IPaperProps {
  as: React.FC<IPaperProps>;
}

const TimeCardPapperWrapper: React.FC<Props> = ({ as: Paper, ...props }) => {
  const { actionIcons } = useTimeCLockCTX();
  return <Paper {...props} actionIcons={actionIcons} />;
};

export default TimeCardPapperWrapper;
