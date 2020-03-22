import React, { useState } from "react";

import createFilterCtx from "../../../components/FilterComp/createFilterCtx";
import { NetworkStatus } from "apollo-client";
import useRefreshLoader from "../../../helpers/hooks/useRefreshLoader";

import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useQuery } from "@apollo/react-hooks";

import { SvgIconProps, Typography } from "@material-ui/core";

import FilterListIcon from "@material-ui/icons/FilterList";
import { Formik, Form } from "formik";
import FormikDatePicker from "../../../components/formikFields/FormikDatePicker";
import { GET_USERS } from "../../../gql/queries/userQuery";
import { Get_Users, Get_Users_users } from "../../../generated/Get_Users";
import FormikMSelector from "../../../components/formikFields/FormikMSelect";
import FormikClearButton from "../../../components/formikFields/FormikClearButton";
import useRLoader from "../../../helpers/hooks/useRLoader";

// const useStyles = makeStyles((theme: Theme) => ({
//   filterMenu: {
//     display: "flex",
//     marginTop: "-.5em",
//     marginBottom: ".5em"
//   },
//   flex: { display: "flex" }
// }));

function qGenerator({ startDate, endDate, userIds }: any): {} {
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
  startDate: Date | null;
  endDate: Date | null;
};
type qResults = {
  loading: boolean;
  networkStatus: NetworkStatus;
  refetch: any;
  variables: any;
};

const clearValues = {
  userIds: [],
  startDate: null,
  endDate: null
};

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

const [useTimeCLockCTX, ContextProvider] = createFilterCtx<IQParams>();

const TimeCardFilter: React.FC<{ startParams?: initVals }> = ({
  children,
  startParams
}) => {
  const [myReturnFnc, actionIcon] = useRefreshLoader();

  const startValues: initVals = startParams
    ? startParams
    : {
        userIds: [],
        startDate: null,
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

export default TimeCardFilter;

export { qGenerator, useTimeCLockCTX };
