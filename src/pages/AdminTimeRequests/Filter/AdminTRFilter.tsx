import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Popper from "@material-ui/core/Popper";
import Popover from "@material-ui/core/Popover";

import UserSelector from "../../../components/FilterComp/UserSelector";
import DateSelectorMod from "../../../components/FilterComp/DateSelectorMod";
import { Theme, SvgIconProps } from "@material-ui/core";
import MyDivider from "../../../components/MyDivider";
import moment from "moment";
import NewFilterHeader from "../../../components/FilterComp/NewFilterHeader";
import createFilterCtx from "../../../components/FilterComp/createFilterCtx";
import UserSelectorMod from "../../../components/FilterComp/UserSelectorMod";
import { startOfWeek, addDays, addWeeks } from "date-fns/esm";
import CheckBoxSelector from "../../../components/FilterComp/CheckBoxSelector";

import FilterListIcon from "@material-ui/icons/FilterList";
import Refresh from "@material-ui/icons/Refresh";

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

type initVals = {
  userIds: string[];
  adminSeen: boolean;
  approved?: boolean;
  startDate: Date;
  endDate: Date;
};

const initialValues: initVals = {
  userIds: [],
  startDate: addWeeks(startOfWeek(new Date()), -2),
  endDate: new Date(""),
  adminSeen: false
};

const [useTRFilterCtx, ContextProvider] = createFilterCtx<IQParams>();

export interface IQParams {
  qParams: initVals;
  setParams: React.Dispatch<React.SetStateAction<initVals>>;
  actionIcons: {
    icon: (props: SvgIconProps) => JSX.Element;
    onClick: (arg: any) => void;
    iClass?: string;
  }[];
}

const AdminTRFilter: React.FC = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const actionIcons = [
    {
      icon: FilterListIcon,
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
      },
      iClass: ""
    },
    {
      icon: Refresh,
      onClick: (arg: any) => {},
      iClass: ""
    }
  ];
  const [qParams, setParams] = useState(initialValues);
  const { userIds, startDate, endDate, adminSeen } = qParams;
  const setUsers = (userIds: string[]) =>
    setParams((params: initVals) => ({ ...params, userIds }));
  const setDate = (date: Date, type: string) =>
    setParams((params: initVals) => ({
      ...params,
      [type as keyof initVals]: date
    }));
  const setAdminSeen = (adminSeen: boolean) =>
    setParams((params: initVals) => ({ ...params, adminSeen }));
  return (
    <ContextProvider value={{ qParams, setParams, actionIcons }}>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            padding: "16px"
          }
        }}
      >
        <CheckBoxSelector
          value={adminSeen}
          label="Only Pending Requests"
          setValue={setAdminSeen}
        />
        <UserSelectorMod userIds={userIds} setUsers={setUsers} />
        <DateSelectorMod setDate={setDate} type="startDate" date={startDate} />
        <DateSelectorMod setDate={setDate} type="endDate" date={endDate} />
      </Popover>
      {/* <div className={classes.filterMenu}>
        <CheckBoxSelector
          value={adminSeen}
          label="Only Pending Requests"
          setValue={setAdminSeen}
        />
        <UserSelectorMod userIds={userIds} setUsers={setUsers} />
        <DateSelectorMod setDate={setDate} type="startDate" date={startDate} />
        <DateSelectorMod setDate={setDate} type="endDate" date={endDate} />
      </div> */}
      {/* <MyDivider /> */}
      {children}
    </ContextProvider>
  );
};

export default AdminTRFilter;

export { paramFunc, useTRFilterCtx };
