import React, { useState } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import Refresh from "@material-ui/icons/Refresh";
import UserTableWrapper from "./UserTableWrapper";

const NewUserPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  return (
    <PaperWrapper
      size={8}
      title="Users"
      action={true}
      spinnerLoading={spinnerLoading}
      actionIcon={Refresh}
      actionFnc={() => setRefresh(!refresh)}
    >
      {/* <TimeReportFilter id={id}> */}
      <UserTableWrapper
        refresh={refresh}
        setRefresh={setRefresh}
        loading={setSpinnerLoading}
      />
      {/* </TimeReportFilter> */}
    </PaperWrapper>
  );
};

export default NewUserPage;
