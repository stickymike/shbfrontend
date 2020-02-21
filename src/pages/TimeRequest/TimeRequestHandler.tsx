import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useSubmitPassBack from "../../helpers/hooks/useSubmitPassBack";
import CreateTimeRequest from "../../resources/TimeRequests/CreateTimeRequest";
import { Me_me } from "../../generated/Me";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
import DeleteTimeRequest from "../../resources/TimeRequests/DeleteTimeRequest";
import usePrevious from "../../helpers/hooks/usePrevious";
import EditTimeRequest from "../../resources/TimeRequests/EditTimeRequest";

export interface TimeRequestHandlerProps {
  changeScreen: (a: string) => void;
  dialogueScreen: string;
  refetch?: { query: any; variables: any }[];
  timeRequest?: GetTimeRequestsIDandDates_timeRequests;
  dates?: [Date, Date];
  user?: Me_me;
  admin?: boolean;
}

const TimeRequestHandler: React.FC<TimeRequestHandlerProps> = ({
  dates,
  dialogueScreen,
  changeScreen,
  user,
  timeRequest,
  admin,
  refetch
}) => {
  const [newSubmitForm, formHandle] = useSubmitPassBack();
  const prevScreen = usePrevious(dialogueScreen);

  const newScreen: string = dialogueScreen === "" ? prevScreen : dialogueScreen;
  const deletescrn = newScreen === "DELETE";

  const handleClose = () => {
    changeScreen("");
  };

  const content = () => {
    const repeatProps = { changeScreen, formHandle, refetch };
    switch (newScreen) {
      default: {
        return (
          <CreateTimeRequest
            {...repeatProps}
            dates={dates}
            user={user}
            admin={admin}
          />
        );
      }
      case "EDIT": {
        return (
          <EditTimeRequest
            {...repeatProps}
            user={user}
            timeRequest={timeRequest!}
            admin={admin}
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
