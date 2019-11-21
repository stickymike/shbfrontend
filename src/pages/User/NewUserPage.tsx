import React, { useState } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import Refresh from "@material-ui/icons/Refresh";
import UserTableWrapper from "./UserTableWrapper";
import { UserHandler } from "./Users";
import createUserCtx from "./createUserCtx";

const [useUserCtx, ContextProvider] = createUserCtx<any>();

const NewUserPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [userScreen, setUserScreen] = useState("CREATE");

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, user?: any) => {
    if (user) setUserScreen("EDIT");
    setFormData(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(function() {
      setFormData({});
      setUserScreen("CREATE");
    }, 200);
  };

  return (
    <PaperWrapper
      size={8}
      title="Users"
      action={true}
      spinnerLoading={spinnerLoading}
      actionIcon={Refresh}
      actionFnc={() => setRefresh(!refresh)}
    >
      <ContextProvider value={{ func: handleOpen }}>
        {/* <TimeReportFilter id={id}> */}
        <UserTableWrapper
          refresh={refresh}
          setRefresh={setRefresh}
          loading={setSpinnerLoading}
          openMenu={handleOpen}
        />
        {/* </TimeReportFilter> */}
        <UserHandler
          handleClose={handleClose}
          open={open}
          user={formData}
          userScreen={userScreen}
        />
      </ContextProvider>
    </PaperWrapper>
  );
};

export default NewUserPage;

export { useUserCtx };
