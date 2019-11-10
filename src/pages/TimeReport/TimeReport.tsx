import React, { useState } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import TimeReportFilter from "./TimeReportFilter";
import Refresh from "@material-ui/icons/Refresh";

import TimeViewer from "./TimeViewer";
import { useQuery } from "react-apollo";
import { NEW_GET_ME } from "../../gql/queries/userQuery";
import MyLoading from "../../components/MyLoading";

const TimeReport: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const { loading, data } = useQuery(NEW_GET_ME);

  const id: string = data && data.me ? data.me.id : "";

  return (
    <PaperWrapper
      size={8}
      title="Time Report"
      action={true}
      spinnerLoading={spinnerLoading}
      actionIcon={Refresh}
      actionFnc={() => setRefresh(!refresh)}
    >
      {loading ? (
        <MyLoading />
      ) : (
        <TimeReportFilter id={id}>
          <TimeViewer
            refresh={refresh}
            setRefresh={setRefresh}
            loading={setSpinnerLoading}
          />
        </TimeReportFilter>
      )}
    </PaperWrapper>
  );
};

export default TimeReport;
