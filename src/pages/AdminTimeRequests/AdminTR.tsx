import React, { useState } from "react";
import AdminTRFilter from "../../resources/TimeRequests/CrudTimeRequestFilter/AdminTRFilter";

import NewPaper from "../../components/NewPaper";
import TRPaperWrapper from "../../resources/TimeRequests/CrudTimeRequestFilter/TRPaperWrapper";
import TRFDWrapper from "../../resources/TimeRequests/CrudTimeRequestFilter/TRFDWrapper";
import FilterDisplayer from "../../components/FilterComp/FilterDisplayer";
import AdminTRTableLoader from "./AdminTRTableLoader";
import GenericTable from "../../components/Table/GenericTable";
import { QGetTimeRequests_timeRequests } from "../../generated/QGetTimeRequests";
import AdminTRHandler from "./AdminTRHandler";
import Button from "@material-ui/core/Button";

const AdminTR: React.FC = () => {
  const [dialogueScreen, setdialogueScreen] = useState("");
  const [timeRequest, setTimeRequest] = useState<
    QGetTimeRequests_timeRequests | undefined
  >(undefined);

  return (
    <AdminTRFilter>
      <TRPaperWrapper as={NewPaper} size={8} title="Time Requests">
        <TRFDWrapper
          as={FilterDisplayer}
          boxProps={{ marginTop: "-8px", marginBottom: "8px" }}
          chipProps={{ color: "primary" }}
        />
        <AdminTRTableLoader
          table={GenericTable}
          changeScreen={setdialogueScreen}
          tableWrapperStyles={{ tableLayout: "auto" }}
          changeTR={setTimeRequest}
        />
        <div
          style={{
            display: "flex",
            marginTop: "16px"
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={e => {
              setdialogueScreen("CREATE");
            }}
            fullWidth
          >
            Create New Request
          </Button>
        </div>
      </TRPaperWrapper>
      <AdminTRHandler
        dialogueScreen={dialogueScreen}
        changeScreen={setdialogueScreen}
        timeRequest={timeRequest}
        admin
      />
    </AdminTRFilter>
  );
};

export default AdminTR;
