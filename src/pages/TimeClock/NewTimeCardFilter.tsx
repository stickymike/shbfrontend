import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

import UserSelector from "../../components/FilterComp/UserSelector";
import DateSelector from "../../components/FilterComp/DateSelector";
import { Theme } from "@material-ui/core";
import MyDivider from "../../components/MyDivider";
import moment from "moment";
import NewFilterHeader from "../../components/FilterComp/NewFilterHeader";

const useStyles = makeStyles((theme: Theme) => ({
  filterMenu: {
    display: "flex",
    marginTop: "-.5em",
    marginBottom: ".5em"
  },
  flex: { display: "flex" }
}));

function paramFunc({ startDate, endDate, userIds }: any): {} {
  const punchTime_gt = startDate;
  const punchTime_lt = endDate;

  let filter: any = { punchIn: {} };
  if (punchTime_gt) filter.punchIn.gt = punchTime_gt;
  if (punchTime_lt) filter.punchIn.lt = punchTime_lt;
  if (userIds.length === 0) {
    return { ...filter };
  }
  if (userIds.length === 1)
    return { ...filter, user: { id: { equals: userIds[0] } } };

  return {
    ...filter,
    OR: userIds.map((user: any) => {
      return { user: { id: { equals: user } } };
    })
  };
}

const initialValues = {
  userIds: [],
  startDate: moment()
    .endOf("week")
    .subtract(2, "week")
    .add(1, "day"),
  endDate: null
};

const NewTimeCardFilter: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <NewFilterHeader initialValues={initialValues}>
      <div className={classes.filterMenu}>
        <Grid container spacing={1}>
          <Grid item xs={3} className={classes.flex}>
            <UserSelector />
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={1} justify={"flex-end"}>
              <Grid item xs={3}>
                <DateSelector type="startDate" />
              </Grid>
              <Grid item xs={3}>
                <DateSelector type="endDate" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <MyDivider />
      {children}
    </NewFilterHeader>
  );
};

export default NewTimeCardFilter;

export { paramFunc };
