import React, { useReducer } from "react";
import UserTableLoader from "./UserTableLoader";
import NewUserHandler from "./NewUserHandler";
// import useLoadingTrigger from "../../helpers/hooks/useLoadingTrigger";

import Button from "@material-ui/core/Button";
import GenericTable from "../../components/Table/GenericTable";
import NewPaper from "../../components/NewPaper";
import createCtx from "../../helpers/hooks/createCtx";
import useRLoader from "../../helpers/hooks/useRLoader";

const [useUserCtx, ContextProvider] = createCtx<any>();

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
  // const [myReturnFnc, actionIcon] = useRefreshLoader();

  const [resultsFunc, onCompleted, actionIcon] = useRLoader();

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
    <NewPaper size={8} title="Users" actionIcons={[actionIcon]}>
      <ContextProvider value={dispatch}>
        <UserTableLoader
          resultsFunc={resultsFunc}
          onCompleted={onCompleted}
          table={GenericTable}
        />
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
            fullWidth
            variant="outlined"
            onClick={e => {
              changeScreen("CREATE");
            }}
          >
            Create New User
          </Button>
        </div>
      </ContextProvider>
    </NewPaper>
  );
};

export default NewUserPage;

export { useUserCtx };
