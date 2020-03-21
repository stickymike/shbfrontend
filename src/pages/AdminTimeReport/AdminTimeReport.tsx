import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import { RouterProps } from "react-router";

import NewPaper from "../../components/NewPaper";
import TimeCardFilter from "../../resources/punchcards/CrudTimeClockFilter/TimeCardFilter";
import TimeCardPapperWrapper from "../../resources/punchcards/CrudTimeClockFilter/TimeCardPapperWrapper";
import TCFilterDisplayW from "../../resources/punchcards/CrudTimeClockFilter/TCFilterDisplayW";
import FilterDisplayer from "../../components/FilterComp/FilterDisplayer";
import GenericTable from "../../components/Table/GenericTable";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import AdminTimeReportLoader from "./AdminTimeReportLoader";

const AdminTimeReport: React.FC<RouterProps> = () => {
  const [dialogueScreen, setdialogueScreen] = useState("");
  const [punchCard, setPunchCard] = useState<
    PunchCardsWhereQ_punchCards | undefined
  >(undefined);

  return (
    <TimeCardFilter>
      <TimeCardPapperWrapper title="Time Report" size={8} as={NewPaper}>
        <TCFilterDisplayW
          as={FilterDisplayer}
          boxProps={{ marginTop: "-8px", marginBottom: "8px" }}
          chipProps={{ color: "primary" }}
        />
        <AdminTimeReportLoader
          table={GenericTable}
          // changeScreen={setdialogueScreen}
          tableWrapperStyles={{ tableLayout: "auto" }}
          // changePC={setPunchCard}
        />
        {/* <Button
          color="primary"
          variant="outlined"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={() => setdialogueScreen("CREATE")}
        >
          Create New Timecard
        </Button> */}
      </TimeCardPapperWrapper>
    </TimeCardFilter>
  );
};

export default AdminTimeReport;
