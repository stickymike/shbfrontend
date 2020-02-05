import React from "react";
import AdminTRFilter from "./Filter/AdminTRFilter";

import NewPaper from "../../components/NewPaper";
import TRPaperWrapper from "./Filter/TRPaperWrapper";
import { Typography } from "@material-ui/core";
import Test from "./Filter/Test";
import { useTRFilterCtx } from "./Filter/AdminTRFilter";

interface Props {}

const AdminTR: React.FC<Props> = () => {
  return (
    <AdminTRFilter>
      <TRPaperWrapper as={NewPaper} size={8} title="Time Requests">
        <Typography>How Are you</Typography>
        <Test ctx={useTRFilterCtx} />
      </TRPaperWrapper>
    </AdminTRFilter>
  );
};

export default AdminTR;
