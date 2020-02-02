import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useSubmitPassBack from "../../helpers/hooks/useSubmitPassBack";
import CreateTimeRequest from "./Components/CreateTimeRequest";
import { Me_me } from "../../generated/Me";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
import DeleteTimeRequest from "./Components/DeleteTimeRequest";
import usePrevious from "../../helpers/hooks/usePrevious";
import EditTimeRequest from "./Components/EditTimeRequest";

interface IProps {
  changeScreen: (a: string) => void;
  dates: [Date, Date];
  dialogueScreen: string;
  user: Me_me;
  qInfoTimeRequests: Record<string, any>;
  timeRequest?: GetTimeRequestsIDandDates_timeRequests;
}

const TimeRequestHandler: React.FC<IProps> = ({
  dates,
  dialogueScreen,
  changeScreen,
  user,
  timeRequest,
  qInfoTimeRequests
}) => {
  const [newSubmitForm, formHandle] = useSubmitPassBack();
  const prevScreen = usePrevious(dialogueScreen);

  const newScreen: string = dialogueScreen === "" ? prevScreen : dialogueScreen;
  const deletescrn = newScreen === "DELETE";

  const handleClose = () => {
    changeScreen("");
  };

  const content = () => {
    const repeatProps = { changeScreen, formHandle, qInfoTimeRequests };
    switch (newScreen) {
      default: {
        return <CreateTimeRequest {...repeatProps} dates={dates} user={user} />;
      }
      case "EDIT": {
        return (
          <EditTimeRequest
            {...repeatProps}
            dates={dates}
            user={user}
            timeRequest={timeRequest!}
          />
        );
      }
      case "DELETE": {
        return <DeleteTimeRequest {...repeatProps} id={timeRequest?.id} />;
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
        {timeRequest?.id && (
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

export default TimeRequestHandler;
