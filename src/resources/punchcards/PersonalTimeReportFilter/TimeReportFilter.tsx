import React, { useState } from "react";

import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { SvgIconProps, Typography } from "@material-ui/core";

import createFilterCtx from "../../../components/FilterComp/createFilterCtx";

import FilterListIcon from "@material-ui/icons/FilterList";
import { Formik, Form } from "formik";
import FormikDatePicker from "../../../components/formikFields/FormikDatePicker";

import FormikClearButton from "../../../components/formikFields/FormikClearButton";

import { NetworkStatus } from "apollo-client";
import { PunchCardsWhereQVariables } from "../../../generated/PunchCardsWhereQ";
import { startOfWeek, addWeeks } from "date-fns/esm";
import useRLoader from "../../../helpers/hooks/useRLoader";

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

type initVals = {
  startDate: Date | null;
  endDate: Date | null;
  id: string;
};

const [useTimeReportFilterCtx, ContextProvider] = createFilterCtx<IQParams>();

export interface IQParams {
  qParams: initVals;
  setParams: React.Dispatch<React.SetStateAction<initVals>>;
  actionIcons: {
    icon: (props: SvgIconProps) => JSX.Element;
    onClick: (arg: any) => void;
    iClass?: string;
  }[];

  resultsFunc: (qResults: qResults) => void;
  onCompleted: () => void;
}

type qResults = {
  loading: boolean;
  networkStatus: NetworkStatus;
  refetch: any;
  variables: any;
};

const TimeReportFilter2: React.FC<{ id: string }> = ({ children, id }) => {
  const [resultsFunc, onCompleted, actionIcon] = useRLoader();

  const startValues: initVals = {
    startDate: addWeeks(startOfWeek(new Date()), -2),
    endDate: null,
    id
  };
  const clearValues: initVals = {
    startDate: null,
    endDate: null,
    id
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

  return (
    <ContextProvider
      value={{
        qParams,
        setParams,
        actionIcons,

        resultsFunc,
        onCompleted
      }}
    >
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

export default TimeReportFilter2;

const qGenerator = ({
  startDate,
  endDate,
  id
}: initVals): PunchCardsWhereQVariables => {
  let filter: any = { punchIn: {} };
  if (startDate) filter.punchIn.gt = startDate;
  if (endDate) filter.punchIn.lt = endDate;

  return { ...filter, user: { id: { equals: id } } };
};

export { qGenerator, useTimeReportFilterCtx };
