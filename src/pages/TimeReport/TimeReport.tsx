import React from "react";
import PaperWrapper from "../../components/PaperWrapper";
import TimeReportFilter from "./TimeReportFilter";

import TimeViewer from "./TimeViewer";
import { useQuery } from "react-apollo";
import { NEW_GET_ME } from "../../gql/queries/userQuery";
import MyLoading from "../../components/MyLoading";

const TimeReport: React.FC = () => {
  const { loading, data } = useQuery(NEW_GET_ME);

  const id: string = data && data.me ? data.me.id : "";

  return (
    <PaperWrapper size={8} title="Time Report">
      {loading ? (
        <MyLoading />
      ) : (
        <TimeReportFilter id={id}>
          <TimeViewer />
        </TimeReportFilter>
      )}
    </PaperWrapper>
  );
};

export default TimeReport;
