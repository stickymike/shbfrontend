import React from "react";
import { FilterDisplayProps } from "../../../components/FilterComp/FilterDisplayer";
import { useTimeReportFilterCtx } from "./TimeReportFilter";
import { lightFormat } from "date-fns/esm";

interface Props extends FilterDisplayProps {
  as: React.FC<FilterDisplayProps>;
}

const TimeReportDisplayWrapper: React.FC<Omit<Props, "filters">> = ({
  as: Display,
  ...props
}) => {
  const {
    qParams: { startDate, endDate },
    setParams
  } = useTimeReportFilterCtx();

  let filters = [] as FilterDisplayProps["filters"];

  if (startDate && !endDate)
    filters.push({
      label: `After ${lightFormat(startDate, "M/dd")}`,
      onDelete: () => setParams(params => ({ ...params, startDate: null }))
    });
  if (startDate && endDate)
    filters.push({
      label: `${lightFormat(startDate, "M/dd")} To ${lightFormat(
        endDate,
        "M/dd"
      )}`,
      onDelete: () =>
        setParams(params => ({ ...params, startDate: null, endDate: null }))
    });
  if (!startDate && endDate)
    filters.push({
      label: `Before ${lightFormat(endDate, "M/dd")}`,
      onDelete: () => setParams(params => ({ ...params, endDate: null }))
    });

  return <Display filters={filters} {...props} />;
};

export default TimeReportDisplayWrapper;
