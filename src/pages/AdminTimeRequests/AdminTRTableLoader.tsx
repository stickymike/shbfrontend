import React from "react";

import { headerCell } from "../../components/Table/EnhancedTableHead";
import { TableProps } from "../../components/Table/GenericTable";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
import { format } from "date-fns/esm";
import TRCell from "../../components/Table/TRCell";
import { makeStyles } from "@material-ui/core/styles";
import useAdminTRData from "./Hooks/useAdminTRData";
import {
  useTRFilterCtx,
  whereGenerator
} from "../../resources/TimeRequests/CrudTimeRequestFilter/AdminTRFilter";
import { QGetTimeRequests_timeRequests } from "../../generated/QGetTimeRequests";
import MyLoading from "../../components/MyLoading";

const morphData = (timeRequests: QGetTimeRequests_timeRequests[]) => {
  if (timeRequests) {
    return timeRequests.map(timeRequest => {
      return {
        date: format(new Date(timeRequest.startTime), "EEEE, M/d"),
        dateSort: Number(format(new Date(timeRequest.startTime), "t")),
        userName: `${timeRequest.user.firstName} ${timeRequest.user.lastName}`,
        ...timeRequest
      };
    });
  }
  return [];
};

const useStyles = makeStyles(() => ({
  fitContentCell: {
    minWidth: "100%",
    whiteSpace: "nowrap"
  },
  fillRestEllip: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    maxWidth: "1px"
  }
}));

export interface TRTableData extends GetTimeRequestsIDandDates_timeRequests {
  date: string;
  dateSort: number;
}

interface IProps<G> {
  table: <G>(props: React.PropsWithChildren<TableProps<G>>) => JSX.Element;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  changeTR: React.Dispatch<
    React.SetStateAction<QGetTimeRequests_timeRequests | undefined>
  >;
}

type TFC<G> = React.PropsWithChildren<IProps<G>> &
  Omit<TableProps<G>, "header" | "data" | "setScreenwithPayload">;

const AdminTRTableLoader = <G,>({
  table: Table,
  changeTR,
  changeScreen,
  ...tableProps
}: TFC<G>) => {
  const { fitContentCell, fillRestEllip } = useStyles();

  const header: headerCell<TRTableData>[] = [
    {
      id: "userName",
      label: "User",
      cellProps: { align: "left", className: fitContentCell }
    },
    {
      id: "date",
      label: "Request",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "dateSort",
      renderComp: TRCell
    },
    {
      id: "reason",
      label: "Reason",
      cellProps: { align: "left", className: fillRestEllip }
    }
  ];

  const setScreenwithPayload = (screen: string, payload: TRTableData) => {
    changeTR(payload);
    changeScreen(screen);
  };

  const { qParams, resultsFunc, onCompleted } = useTRFilterCtx();

  const [timeRequests, qResults] = useAdminTRData(
    whereGenerator(qParams),
    onCompleted
  );
  resultsFunc(qResults);
  if (qResults?.networkStatus === 1 || qResults?.networkStatus === 2)
    return <MyLoading />;

  return (
    <Table
      header={header}
      data={morphData(timeRequests)}
      setScreenwithPayload={setScreenwithPayload}
      {...tableProps}
    />
  );
};

export default AdminTRTableLoader;
