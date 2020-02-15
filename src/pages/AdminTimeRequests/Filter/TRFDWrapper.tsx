import React from "react";
import { FilterDisplayProps } from "../../../components/FilterComp/FilterDisplayer";
import { useTRFilterCtx } from "./AdminTRFilter";
import { lightFormat } from "date-fns/esm";

interface Props extends FilterDisplayProps {
  as: React.FC<FilterDisplayProps>;
}

function filterValue(userIds: string[], source: string) {
  if (userIds.length === 0) return `All ${source}s Selected`;
  if (userIds.length === 1) return `One ${source} Selected`;
  if (userIds.length === 2) return `Two ${source}s Selected`;
  if (userIds.length === 3) return `Three ${source}s Selected`;
  if (userIds.length > 3) return `Mutliple ${source}s Selected`;
  return "";
}

const TRFDWrapper: React.FC<Omit<Props, "filters">> = ({
  as: Display,
  ...props
}) => {
  const {
    qParams: { startDate, endDate, userIds, approved },
    setParams
  } = useTRFilterCtx();

  let filters = [] as FilterDisplayProps["filters"];

  // if (adminSeen)
  //   filters.push({
  //     label: "Pending Approval",
  //     onDelete: () => setParams(params => ({ ...params, adminSeen: false }))
  //   });
  if (approved) {
    filters.push({
      label:
        approved === "pending"
          ? "Pending Approval"
          : approved === "approved"
          ? "Approved"
          : "Rejected",
      onDelete: () => setParams(params => ({ ...params, approved: "" }))
      // color: approved === "rejected" ? "secondary" : undefined
    });
    if (approved === "rejected")
      filters[filters.length - 1].color = "secondary";
    if (approved === "pending") filters[filters.length - 1].color = undefined;
  }
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
  if (userIds.length !== 0)
    filters.push({
      label: filterValue(userIds, "User"),
      onDelete: () => setParams(params => ({ ...params, userIds: [] }))
    });

  return <Display filters={filters} {...props} />;
};

export default TRFDWrapper;
