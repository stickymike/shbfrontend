import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import NewTimeCardFilter from "./NewTimeCardFilter";
import { RouterProps } from "react-router";

import TimeCardViewer from "./TimeCardViewer";

import CreatePunchCard from "./Components/CreatePunchCard";
import EditPunchCard from "./Components/EditPunchCard";
import DeletePunchCard from "./Components/DeletePunchCard";
import NewPaper from "../../components/NewPaper";
import TimeCardFilter from "./Filter/TimeCardFilter";
import TimeCardPapperWrapper from "./Filter/TimeCardPapperWrapper";
import TCFilterDisplayW from "./Filter/TCFilterDisplayW";
import FilterDisplayer from "../../components/FilterComp/FilterDisplayer";
import TimeCardTableLoader from "./Components/TimeCardTableLoader";
import GenericTable from "../../components/Table/GenericTable";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import TimeClockHandler2 from "./TimeCardHandler2";

const TimeClock: React.FC<RouterProps> = () => {
  const [dialogueScreen, setdialogueScreen] = useState("");
  const [punchCard, setPunchCard] = useState<
    PunchCardsWhereQ_punchCards | undefined
  >(undefined);

  const [cardID, setCardID] = React.useState<string | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  function handleCloseDialog() {
    setOpenDialog(false);
    setTimeout(() => setCardID(null), 200);
  }
  function handleEditTimecard(card: string) {
    setCardID(card);
    setOpenDialog(true);
  }

  return (
    <TimeCardFilter>
      <TimeCardPapperWrapper title="Time Cards" size={8} as={NewPaper}>
        <NewTimeCardFilter>
          <TCFilterDisplayW
            as={FilterDisplayer}
            boxProps={{ marginTop: "-8px", marginBottom: "8px" }}
            chipProps={{ color: "primary" }}
          />
          <TimeCardViewer editFunc={handleEditTimecard} />
          <TimeCardTableLoader
            table={GenericTable}
            changeScreen={setdialogueScreen}
            tableWrapperStyles={{ tableLayout: "auto" }}
            changePC={setPunchCard}
          />
          <TimeClockHandler
            open={openDialog}
            handleClose={handleCloseDialog}
            cardID={cardID}
          />
        </NewTimeCardFilter>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setdialogueScreen("CREATE")}
        >
          Create New Timecard
        </Button>
      </TimeCardPapperWrapper>

      <TimeClockHandler2
        dialogueScreen={dialogueScreen}
        changeScreen={setdialogueScreen}
        punchCard={punchCard}
        // refetch={[
        //   { query: GET_TIMEREQUEST_ID_DATES, variables: qInfoTimeRequests }
        // ]}
      />
    </TimeCardFilter>
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
