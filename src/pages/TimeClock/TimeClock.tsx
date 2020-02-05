import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import NewTimeCardFilter from "./NewTimeCardFilter";
import { Theme } from "@material-ui/core";
import { RouterProps } from "react-router";

import TimeCardViewer from "./TimeCardViewer";

import CreatePunchCard from "./Components/CreatePunchCard";
import EditPunchCard from "./Components/EditPunchCard";
import DeletePunchCard from "./Components/DeletePunchCard";
import NewPaper from "../../components/NewPaper";

const useStyles = makeStyles((theme: Theme) => ({
  shiftleft: {
    display: "flex",
    marginTop: theme.spacing(2)
  }
}));

const TimeClock: React.FC<RouterProps> = () => {
  const [cardID, setCardID] = React.useState<string | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const classes = useStyles();
  function handleCloseDialog() {
    setOpenDialog(false);
    setTimeout(() => setCardID(null), 200);
  }

  function handleEditTimecard(card: string) {
    setCardID(card);
    setOpenDialog(true);
  }

  return (
    <>
      <NewPaper size={8} title="Timecards">
        <NewTimeCardFilter>
          <TimeCardViewer editFunc={handleEditTimecard} />
          <TimeClockHandler
            open={openDialog}
            handleClose={handleCloseDialog}
            cardID={cardID}
          />
        </NewTimeCardFilter>
        <div className={classes.shiftleft}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpenDialog(true)}
          >
            Create New Timecard
          </Button>
        </div>
      </NewPaper>
    </>
  );
};

interface ITimeClockHandler {
  open: boolean;
  handleClose: () => void;
  cardID: string | null;
}

const TimeClockHandler: React.FC<ITimeClockHandler> = ({
  open,
  handleClose,
  cardID: id
}) => {
  let submitForm: (() => void) | null = null;
  const newSubmitForm = () => {
    if (submitForm) submitForm();
  };
  const formHandle = (newSubmit: () => void) => {
    submitForm = newSubmit;
  };

  useEffect(() => {
    setdeletescrn(false);
  }, [id]);

  const wrapclose = () => {
    handleClose();
  };

  const [deletescrn, setdeletescrn] = useState(false);

  const title = () => {
    if (deletescrn) return "Delete Time Card";
    if (id) return "Edit Time Card";
    return "Create Time Card";
  };

  const content = () => {
    if (id)
      return (
        <>
          <EditPunchCard
            formHandle={formHandle}
            handleClose={handleClose}
            id={id}
          />
          {deletescrn && (
            <DeletePunchCard
              formHandle={formHandle}
              wrapClose={wrapclose}
              id={id}
            />
          )}
        </>
      );

    return (
      <CreatePunchCard formHandle={formHandle} handleClose={handleClose} />
    );
  };
  const button = () => {
    if (deletescrn) return "Delete";
    if (id) return "Update";
    return "Create";
  };

  return (
    <Dialog
      open={open}
      onClose={wrapclose}
      aria-labelledby="form-dialog-title"
      style={{ top: "-30%" }}
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
        {title()}
      </DialogTitle>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        {id && (
          <Button
            onClick={() => setdeletescrn(!deletescrn)}
            color={deletescrn ? "primary" : "default"}
          >
            {!deletescrn ? "Delete" : "Edit"}
          </Button>
        )}

        <Button
          onClick={wrapclose}
          color={deletescrn ? "default" : "secondary"}
        >
          Cancel
        </Button>
        <Button
          onClick={newSubmitForm}
          color={deletescrn ? "secondary" : "primary"}
        >
          {button()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimeClock;
