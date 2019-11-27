import React, { useReducer } from "react";
import PaperWrapper from "../../components/PaperWrapper";
import UserTableWrapper from "./UserTableWrapper";
import createUserCtx from "./createUserCtx";

import NewUserHandler from "./NewUserHandler";
import useLoadingTrigger from "../../helpers/hooks/useLoadingTrigger";

import Button from "@material-ui/core/Button";

const [useUserCtx, ContextProvider] = createUserCtx<any>();

type AppState = {
  open: boolean;
  formData: any;
  userScreen: string;
};

type Action =
  | { type: "OPEN"; payload: { user?: any; screen?: any } }
  | { type: "CLOSE" }
  | { type: "RESET" }
  | { type: "CHANGE"; payload: { screen: any } };

const initialState = {
  open: false,
  formData: null,
  userScreen: "CREATE"
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "CLOSE":
      return {
        ...state,
        open: false
      };
    case "RESET":
      return {
        ...initialState
      };
    case "OPEN":
      return {
        userScreen: action.payload.screen,
        open: true,
        formData: action.payload.user
      };
    case "CHANGE":
      return {
        ...state,
        open: true,
        userScreen: action.payload.screen
      };
    default:
      return state;
  }
};

const NewUserPage: React.FC = () => {
  const [refresh, setSpinnerLoading, loadingElement] = useLoadingTrigger();
  const [{ open, formData, userScreen }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleClose = () => {
    dispatch({ type: "CLOSE" });
    setTimeout(dispatch, 200, { type: "RESET" });
  };
  const changeScreen = (screen: string) => {
    dispatch({ type: "CHANGE", payload: { screen } });
  };

  return (
    <PaperWrapper
      size={8}
      title="Users"
      action={false}
      hookActionIcon={loadingElement}
    >
      <ContextProvider value={dispatch}>
        {/* <TimeReportFilter id={id}> */}
        <UserTableWrapper refresh={refresh} loading={setSpinnerLoading} />
        {/* </TimeReportFilter> */}
        <NewUserHandler
          handleClose={handleClose}
          open={open}
          user={formData}
          userScreen={userScreen}
          changeScreen={changeScreen}
        />
        <div
          style={{
            display: "flex",
            marginTop: "16px"
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={() => changeScreen("CREATE")}
          >
            Create New User
          </Button>
        </div>
      </ContextProvider>
    </PaperWrapper>
  );
};

export default NewUserPage;

export { useUserCtx };
