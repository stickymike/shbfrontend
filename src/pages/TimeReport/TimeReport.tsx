import React from "react";

import { useQuery } from "@apollo/client";
import { NEW_GET_ME } from "../../gql/queries/userQuery";

import NewPaper from "../../components/NewPaper";
import TimeReportFilter2 from "../../resources/punchcards/PersonalTimeReportFilter/TimeReportFilter";
import FilterDisplayer from "../../components/FilterComp/FilterDisplayer";
import TimeReportDisplayWrapper from "../../resources/punchcards/PersonalTimeReportFilter/TimeReportDisplayWrapper";
import TimeReportPaperWrapper from "../../resources/punchcards/PersonalTimeReportFilter/TimeReportPaperWrapper";
import TimeReportTableLoader from "./Components/TimeReportTableLoader";

const TimeReport: React.FC = () => {
  const { loading, data } = useQuery(NEW_GET_ME);

  const id: string = data && data.me ? data.me.id : "";

  if (loading) return <></>;

  return (
    <TimeReportFilter2 id={id}>
      <TimeReportPaperWrapper as={NewPaper} size={8} title="Time Report">
        <TimeReportDisplayWrapper
          as={FilterDisplayer}
          boxProps={{ marginTop: "-8px", marginBottom: "8px" }}
          chipProps={{ color: "primary" }}
        />
        <TimeReportTableLoader />
      </TimeReportPaperWrapper>
    </TimeReportFilter2>
  );
};

export default TimeReport;
