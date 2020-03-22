import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import { RouterProps, useLocation } from "react-router";

import NewPaper from "../../components/NewPaper";
import TimeCardFilter from "../../resources/punchcards/CrudTimeClockFilter/TimeCardFilter";
import TimeCardPapperWrapper from "../../resources/punchcards/CrudTimeClockFilter/TimeCardPapperWrapper";
import TCFilterDisplayW from "../../resources/punchcards/CrudTimeClockFilter/TCFilterDisplayW";
import FilterDisplayer from "../../components/FilterComp/FilterDisplayer";
import TimeCardTableLoader from "./TimeCardTableLoader";
import GenericTable from "../../components/Table/GenericTable";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import TimeClockHandler from "./TimeCardHandler";

const TimeClock: React.FC<RouterProps> = () => {
  const [dialogueScreen, setdialogueScreen] = useState("");
  const [punchCard, setPunchCard] = useState<
    PunchCardsWhereQ_punchCards | undefined
  >(undefined);

  const location = useLocation();

  // console.log(location.state.filter);

  return (
    <TimeCardFilter
    // startParams={location.state?.filter}
    >
      <TimeCardPapperWrapper title="Time Cards" size={8} as={NewPaper}>
        <TCFilterDisplayW
          as={FilterDisplayer}
          boxProps={{ marginTop: "-8px", marginBottom: "8px" }}
          chipProps={{ color: "primary" }}
        />
        <TimeCardTableLoader
          table={GenericTable}
          changeScreen={setdialogueScreen}
          tableWrapperStyles={{ tableLayout: "auto" }}
          changePC={setPunchCard}
        />
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={() => setdialogueScreen("CREATE")}
        >
          Create New Timecard
        </Button>
      </TimeCardPapperWrapper>

      <TimeClockHandler
        dialogueScreen={dialogueScreen}
        changeScreen={setdialogueScreen}
        punchCard={punchCard}
      />
    </TimeCardFilter>
  );
};

export default TimeClock;
