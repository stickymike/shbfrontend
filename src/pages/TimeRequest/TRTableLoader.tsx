import React from "react";

import { headerCell } from "../../components/Table/EnhancedTableHead";
import { TableProps } from "../../components/Table/GenericTable";
import { GetTimeRequestsIDandDates_timeRequests } from "../../generated/GetTimeRequestsIDandDates";
import { format } from "date-fns/esm";
import TRCell from "../../components/Table/TRCell";
import { makeStyles } from "@material-ui/core/styles";

const morphData = (timeRequests: GetTimeRequestsIDandDates_timeRequests[]) => {
  if (timeRequests) {
    return timeRequests.map(timeRequest => {
      return {
        date: format(new Date(timeRequest.startTime), "EEEE, M/d"),
        dateSort: Number(format(new Date(timeRequest.startTime), "t")),
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
  timeRequests: GetTimeRequestsIDandDates_timeRequests[];
  returnFunction?: (arg: any) => JSX.Element | undefined;
  table: <G>(props: React.PropsWithChildren<TableProps<G>>) => JSX.Element;
  changeScreen: (a: string) => void;
  changeTR: React.Dispatch<
    React.SetStateAction<GetTimeRequestsIDandDates_timeRequests | undefined>
  >;
}

type TFC<G> = React.PropsWithChildren<IProps<G>> &
  Omit<TableProps<G>, "header" | "data" | "setScreenwithPayload">;

const TRTableLoader = <G,>({
  timeRequests,
  returnFunction,
  table: Table,
  changeTR,
  changeScreen,
  ...tableProps
}: TFC<G>) => {
  const { fitContentCell, fillRestEllip } = useStyles();

  const header: headerCell<TRTableData>[] = [
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

  return (
    <Table
      header={header}
      data={morphData(timeRequests)}
      setScreenwithPayload={setScreenwithPayload}
      {...tableProps}
    />
  );
};

export default TRTableLoader;
