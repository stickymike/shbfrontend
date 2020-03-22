import React from "react";

import { RouterProps } from "react-router";

import NewPaper from "../../components/NewPaper";
import TimeCardFilter from "../../resources/punchcards/CrudTimeClockFilter/TimeCardFilter";
import TimeCardPapperWrapper from "../../resources/punchcards/CrudTimeClockFilter/TimeCardPapperWrapper";
import TCFilterDisplayW from "../../resources/punchcards/CrudTimeClockFilter/TCFilterDisplayW";
import FilterDisplayer from "../../components/FilterComp/FilterDisplayer";
import GenericTable from "../../components/Table/GenericTable";
import AdminTimeReportLoader from "./AdminTimeReportLoader";

const AdminTimeReport: React.FC<RouterProps> = () => {
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
      </TimeCardPapperWrapper>
    </TimeCardFilter>
  );
};

export default AdminTimeReport;
