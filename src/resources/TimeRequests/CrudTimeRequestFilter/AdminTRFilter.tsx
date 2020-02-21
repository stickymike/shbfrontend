import React, { useState } from "react";

import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useQuery } from "@apollo/react-hooks";

import { SvgIconProps, Typography } from "@material-ui/core";

import createFilterCtx from "../../../components/FilterComp/createFilterCtx";

import FilterListIcon from "@material-ui/icons/FilterList";
import { Formik, Form } from "formik";
import FormikDatePicker from "../../../components/formikFields/FormikDatePicker";
import { GET_USERS } from "../../../gql/queries/userQuery";
import { Get_Users, Get_Users_users } from "../../../generated/Get_Users";
import FormikMSelector from "../../../components/formikFields/FormikMSelect";
import FormikClearButton from "../../../components/formikFields/FormikClearButton";
import { QGetTimeRequestsVariables } from "../../../generated/QGetTimeRequests";
import FormikClearableRadio from "../../../components/formikFields/FormikClearableRadio";
import { NetworkStatus } from "apollo-client";
import useRefreshLoader from "../../../helpers/hooks/useRefreshLoader";

// const useStyles = makeStyles((theme: Theme) => ({
//   filterMenu: {
//     display: "flex",
//     marginTop: "-.5em",
//     marginBottom: ".5em"
//   },
//   flex: { display: "flex" },
//   checkBox: {
//     marginRight: "0px",
//     marginBottom: theme.spacing(1)
//   }
// }));

// radios: {
//   label: string;
//   value: string;
//   color: "primary" | "secondary";
// }[];

const createRadio = (
  label: string,
  value: string,
  color?: "primary" | "secondary"
) => ({
  label,
  value,
  color
});

const radios = [
  createRadio("Approval Pending", "pending"),
  createRadio("Approved", "approved"),
  createRadio("Rejected", "rejected", "secondary")
];

const whereGenerator = ({
  userIds,
  approved,
  startDate,
  endDate
}: initVals): QGetTimeRequestsVariables => {
  let filter: any = { where: {} };
  if (startDate) filter.where.startTime = { gt: startDate };
  if (endDate) filter.where.endTime = { lt: endDate };
  if (approved === "pending") filter.where.approved = null;
  if (approved === "approved") filter.where.approved = { equals: true };
  if (approved === "rejected") filter.where.approved = { equals: false };

  if (userIds.length === 0) {
    return filter;
  }
  if (userIds.length === 1)
    return { ...filter, user: { id: { equals: userIds[0] } } };

  return {
    ...filter,
    OR: userIds.map((user: any) => {
      return { user: { id: { equals: user } } };
    })
  };
};

export type initVals = {
  userIds: string[];
  // adminSeen: boolean;
  approved: string;
  startDate: Date | null;
  endDate: Date | null;
};

const clearValues: initVals = {
  userIds: [],
  startDate: null,
  approved: "",
  endDate: null
  // adminSeen: false
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
  myReturnFnc: (qResults: qResults) => JSX.Element | undefined;
}

type qResults = {
  loading: boolean;
  networkStatus: NetworkStatus;
  refetch: any;
  variables: any;
};

const AdminTRFilter: React.FC = ({ children }) => {
  const [myReturnFnc, actionIcon] = useRefreshLoader();

  const startValues: initVals = {
    userIds: [],
    startDate: null,
    approved: "pending",
    endDate: null
  };
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
    actionIcon
  ];
  const [qParams, setParams] = useState(startValues);
  const { data } = useQuery<Get_Users>(GET_USERS);

  let users = [] as Get_Users_users[];
  if (data) users = data.users;

  return (
    <ContextProvider value={{ qParams, setParams, actionIcons, myReturnFnc }}>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          // newSubmitForm();
          setAnchorEl(null);
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            minWidth: "350px",
            maxWidth: "400px"
          }
        }}
      >
        <Formik
          initialValues={qParams}
          onSubmit={values => {
            setParams(params => ({ ...params, ...values }));
            setAnchorEl(null);
          }}
        >
          <Form>
            <Box
              display="flex"
              marginBottom=".5rem"
              justifyContent="space-between"
              alignContent="center"
            >
              <Typography variant="h6" style={{ textAlign: "end" }}>
                Apply Filter
              </Typography>
              <FilterListIcon style={{ width: "1.25em", height: "1.25em" }} />
            </Box>
            <FormikClearableRadio radios={radios} name="approved" />
            <Box flexGrow={1} />
            <FormikDatePicker
              clearable
              highlighting
              name="startDate"
              label="After This Day"
            />
            <FormikDatePicker
              name="endDate"
              label="Before this Day"
              clearable
              highlighting
            />
            <FormikMSelector
              label="Users"
              name="userIds"
              selectFrom={users}
              highlighting
            />
            <Box display="flex">
              <FormikClearButton clearValues={clearValues} />
              <Box flexGrow={1} />
              <Button onClick={() => setAnchorEl(null)} color="secondary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Apply
              </Button>
            </Box>
          </Form>
        </Formik>
      </Popover>
      {children}
    </ContextProvider>
  );
};

export default AdminTRFilter;

export { whereGenerator, useTRFilterCtx };
