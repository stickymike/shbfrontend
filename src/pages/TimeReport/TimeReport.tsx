import React from "react";
import TimeReportFilter from "./TimeReportFilter";

import { useQuery } from "react-apollo";
import { NEW_GET_ME } from "../../gql/queries/userQuery";
import MyLoading from "../../components/MyLoading";
import TableReportWrapper from "./TableReportWrapper";
import useRefreshLoader from "../../helpers/hooks/useRefreshLoader";
import NewPaper from "../../components/NewPaper";

const TimeReport: React.FC = () => {
  const [myReturnFnc, actionIcon] = useRefreshLoader();

  const { loading, data } = useQuery(NEW_GET_ME);

  const id: string = data && data.me ? data.me.id : "";

  const content = () => {
    if (loading) return <MyLoading />;
    return (
      <TimeReportFilter id={id}>
        <TableReportWrapper returnFunction={myReturnFnc} />
      </TimeReportFilter>
    );
  };

  return (
    <NewPaper size={8} title="Time Report" actionIcons={[actionIcon]}>
      {content()}
    </NewPaper>
  );
};

export default TimeReport;
