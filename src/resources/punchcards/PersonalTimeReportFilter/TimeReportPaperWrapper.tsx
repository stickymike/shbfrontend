import React from "react";
import { IPaperProps } from "../../../components/NewPaper";
import { useTimeReportFilterCtx } from "./TimeReportFilter";

interface Props extends IPaperProps {
  as: React.FC<IPaperProps>;
}

const TimeReportPaperWrapper: React.FC<Props> = ({ as: Paper, ...props }) => {
  const { actionIcons } = useTimeReportFilterCtx();
  return <Paper {...props} actionIcons={actionIcons} />;
};

export default TimeReportPaperWrapper;
