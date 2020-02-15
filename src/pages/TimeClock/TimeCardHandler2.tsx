import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useSubmitPassBack from "../../helpers/hooks/useSubmitPassBack";
// import CreateTimeRequest from "./Components/CreateTimeRequest";
import { Me_me } from "../../generated/Me";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
// import DeleteTimeRequest from "./Components/DeleteTimeRequest";
import usePrevious from "../../helpers/hooks/usePrevious";
import EditPunchCard2 from "./Components/EditPunchCard2";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import DeletePunchCard2 from "./Components/DeletePunchCard2";
import CreatePunchCard2 from "./Components/CreatePunchCard2";
import { useTimeCLockCTX, qGenerator } from "./Filter/TimeCardFilter";
import { PUNCHCARDS_WHEREQ } from "../../gql/queries/punchCardQuery";
// import EditTimeRequest from "./Components/EditTimeRequest";

export interface TimeRequestHandlerProps {
  changeScreen: (a: string) => void;
  dialogueScreen: string;
  punchCard?: PunchCardsWhereQ_punchCards;
}

const TimeClockHandler2: React.FC<TimeRequestHandlerProps> = ({
  dialogueScreen,
  changeScreen,
  punchCard
}) => {
  const [newSubmitForm, formHandle] = useSubmitPassBack();
  const prevScreen = usePrevious(dialogueScreen);

  const newScreen: string = dialogueScreen === "" ? prevScreen : dialogueScreen;
  const deletescrn = newScreen === "DELETE";

  const handleClose = () => {
    changeScreen("");
  };

  const { qParams } = useTimeCLockCTX();

  const refetch = [
    {
      query: PUNCHCARDS_WHEREQ,
      variables: { query: qGenerator(qParams) }
    }
  ];

  const content = () => {
    const repeatProps = { changeScreen, formHandle, refetch };
    switch (newScreen) {
      default: {
        return <CreatePunchCard2 {...repeatProps} />;
      }
      case "EDIT": {
        return <EditPunchCard2 {...repeatProps} punchCard={punchCard!} />;
      }
      case "DELETE": {
        return <DeletePunchCard2 {...repeatProps} punchCard={punchCard!} />;
      }
    }
  };

  return (
    <Dialog
      open={!!dialogueScreen}
      onClose={handleClose}
      style={{ top: "-30%" }}
    >
      <div style={{ display: "flex", minWidth: "500px" }}>
        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
          {title(newScreen)}
        </DialogTitle>
      </div>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        {punchCard?.id && (
          <Button
            onClick={() => changeScreen(deletescrn ? "EDIT" : "DELETE")}
            color={deletescrn ? "primary" : "default"}
          >
            {!deletescrn ? "Delete" : "Edit"}
          </Button>
        )}
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={newSubmitForm} color="primary">
          {button(newScreen)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const button = (userScreen: string) => {
  switch (userScreen) {
    default: {
      return "Update";
    }
    case "DELETE": {
      return "Delete";
    }
    case "CREATE": {
      return "Create";
    }
  }
};

const title = (userScreen: string) => {
  switch (userScreen) {
    default: {
      return "Create Time Off Request";
    }
    case "EDIT": {
      return `Edit Time Off Request`;
    }
    case "DELETE": {
      return `Delete Time Off Request`;
    }
  }
};

export default TimeClockHandler2;
