import React from "react";
import PaperWrapper from "../../components/PaperWrapper";
import TimeReportFilter from "./TimeReportFilter";

import { useQuery } from "react-apollo";
import { NEW_GET_ME } from "../../gql/queries/userQuery";
import MyLoading from "../../components/MyLoading";
import TableReportWrapper from "./TableReportWrapper";
import useLoadingTrigger from "../../helpers/hooks/useLoadingTrigger";

const TimeReport: React.FC = () => {
  const [refresh, setSpinnerLoading, loadingElement] = useLoadingTrigger();

  const { loading, data } = useQuery(NEW_GET_ME);

  const id: string = data && data.me ? data.me.id : "";

  const content = () => {
    if (loading) return <MyLoading />;
    return (
      <TimeReportFilter id={id}>
        <TableReportWrapper refresh={refresh} loading={setSpinnerLoading} />
      </TimeReportFilter>
    );
  };

  return (
    <PaperWrapper
      size={8}
      title="Time Report"
      action={false}
      hookActionIcon={loadingElement}
    >
      {content()}
    </PaperWrapper>
  );
};

export default TimeReport;
