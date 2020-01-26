import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useSubmitPassBack from "../../helpers/hooks/useSubmitPassBack";
import CreateTimeRequest from "./Components/CreateTimeRequest";
import { Me_me } from "../../generated/Me";

interface IProps {
  changeScreen: (a: string) => void;
  dates: [Date, Date];
  dialogueScreen: string;
  user: Me_me;
}

const TimeRequestHandler: React.FC<IProps> = ({
  dates,
  dialogueScreen,
  changeScreen,
  user
}) => {
  const [newSubmitForm, formHandle] = useSubmitPassBack();

  const handleClose = () => changeScreen("");

  const content = () => {
    // const actionProps = { formHandle, handleClose, user };
    switch (dialogueScreen) {
      default: {
        return (
          <CreateTimeRequest
            dates={dates}
            formHandle={formHandle}
            user={user}
          />
        );
        // <CreateUser {...actionProps} />
      }
      case "EDIT": {
        return "Edit";
        // <UpdateUser {...actionProps} />
      }
      case "DELETE": {
        return "delete me";
        // <Mutation
        //   mutation={DELETE_USER}
        //   variables={{ id: user.id }}
        //   refetchQueries={[{ query: GET_USERS }]}
        //   onCompleted={handleClose}
        // >
        //   {(fnc: () => void) => {
        //     formHandle(fnc);
        //     return <>{`You sure you want to Delete ${user.firstName}?!?`}</>;
        //   }}
        // </Mutation>
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
          {title(dialogueScreen)}
        </DialogTitle>
      </div>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={newSubmitForm} color="primary">
          {button(dialogueScreen)}
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
