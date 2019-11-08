import React from "react";

import { makeStyles } from "@material-ui/styles";

import DateSelector from "../../components/FilterComp/DateSelector";
import { Box } from "@material-ui/core";
import MyDivider from "../../components/MyDivider";
import moment from "moment";
import NewFilterHeader from "../../components/FilterComp/NewFilterHeader";

const useStyles = makeStyles(() => ({
  filterMenu: {
    display: "flex",
    marginTop: "-.5em",
    marginBottom: ".5em",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  flex: { display: "flex" }
}));

function query({ startDate, endDate, id }: any) {
  const punchTime_gt = startDate;
  const punchTime_lt = endDate;

  let filter: any = { punchIn: {} };
  if (punchTime_gt) filter.punchIn.gt = punchTime_gt;
  if (punchTime_lt) filter.punchIn.lt = punchTime_lt;
  return { ...filter, user: { id: { equals: id } } };
}

const TimeReportFilter: React.FC<{ id: string }> = ({ children, id }) => {
  const classes = useStyles();

  const initialValues = {
    startDate: moment()
      .endOf("week")
      .subtract(2, "week")
      .add(1, "day"),
    endDate: null,
    id
  };

  return (
    <NewFilterHeader initialValues={initialValues}>
      <div className={classes.filterMenu}>
        <Box marginLeft={1}>
          <DateSelector type="startDate" />
        </Box>
        <Box marginLeft={1}>
          <DateSelector type="endDate" />
        </Box>
      </div>
      <MyDivider />
      {children}
    </NewFilterHeader>
  );
};

export default TimeReportFilter;

export { query };
