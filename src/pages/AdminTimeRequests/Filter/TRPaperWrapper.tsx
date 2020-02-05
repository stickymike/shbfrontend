import React from "react";
import { IPaperProps } from "../../../components/NewPaper";
import FilterListIcon from "@material-ui/icons/FilterList";
import Refresh from "@material-ui/icons/Refresh";
import { useTRFilterCtx } from "./AdminTRFilter";

interface Props extends IPaperProps {
  as: React.FC<IPaperProps>;
}

const TRPaperWrapper: React.FC<Props> = ({
  as: Paper,

  ...props
}) => {
  const { actionIcons } = useTRFilterCtx();

  return <Paper {...props} actionIcons={actionIcons} />;
};

export default TRPaperWrapper;
