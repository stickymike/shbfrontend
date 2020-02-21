import React from "react";
import { IPaperProps } from "../../../components/NewPaper";
import { useTRFilterCtx } from "./AdminTRFilter";

interface Props extends IPaperProps {
  as: React.FC<IPaperProps>;
}

const TRPaperWrapper: React.FC<Props> = ({ as: Paper, ...props }) => {
  const { actionIcons } = useTRFilterCtx();
  return <Paper {...props} actionIcons={actionIcons} />;
};

export default TRPaperWrapper;
