import React, { useReducer } from "react";
import PaperWrapper from "../../components/PaperWrapper";

import Button from "@material-ui/core/Button";
import createCtx from "../../helpers/createCtx";
import useUpdatedLoading from "../../helpers/hooks/useUpdatedLoading";
import TimeRoleTableWrapper from "./TimeRoleTableWrapper";
import TimeRoleHandler from "./TimeRoleHandler";
import useRefreshLoader from "../../helpers/hooks/useRefreshLoader";
import NewPaper from "../../components/NewPaper";

const [useTimeRoleCtx, ContextProvider] = createCtx<any>();

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

const TimeRolePage: React.FC = () => {
  // const [returnFunction, loadingElement] = useUpdatedLoading();

  const [myReturnFnc, actionIcon] = useRefreshLoader();

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
    <NewPaper size={8} title="Time Roles" actionIcons={[actionIcon]}>
      <ContextProvider value={dispatch}>
        <TimeRoleTableWrapper returnFunction={myReturnFnc} />
        <div
          style={{
            display: "flex",
            marginTop: "16px"
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={e => {
              changeScreen("CREATE");
            }}
          >
            Create Time Role
          </Button>
          <TimeRoleHandler
            handleClose={handleClose}
            open={open}
            timeRole={formData}
            timeRoleScreen={userScreen}
            changeScreen={changeScreen}
          />
        </div>
      </ContextProvider>
    </NewPaper>
  );
};

export default TimeRolePage;

export { useTimeRoleCtx };
