import React from "react";

import { headerCell } from "../../../components/Table/EnhancedTableHead";
import { TableProps } from "../../../components/Table/GenericTable";
import { GetTimeRequestsIDandDates_timeRequests } from "../../../generated/GetTimeRequestsIDandDates";
import { format } from "date-fns/esm";
import TRCell from "../../../components/Table/TRCell";
import { makeStyles } from "@material-ui/core/styles";
import { useTimeCLockCTX, qGenerator } from "../Filter/TimeCardFilter";

// import useAdminTRData from "../Hooks/useAdminTRData";
// import { useTRFilterCtx, whereGenerator } from "../Filter/AdminTRFilter";
import { QGetTimeRequests_timeRequests } from "../../../generated/QGetTimeRequests";
import { PUNCHCARDS_WHEREQ } from "../../../gql/queries/punchCardQuery";
import { useQuery } from "react-apollo";
import { PunchCardsWhereQ_punchCards } from "../../../generated/PunchCardsWhereQ";

const morphData = (punchCards: PunchCardsWhereQ_punchCards[]) => {
  if (punchCards) {
    return punchCards.map(punchCard => {
      return {
        userName: `${punchCard.user.firstName} ${punchCard.user.lastName}`,
        date: format(new Date(punchCard.punchIn), "EEEE, M/d"),
        clockIn: format(new Date(punchCard.punchIn), "h:mm a"),
        clockOut: format(new Date(punchCard.punchOut), "h:mm a"),
        // punchIn: moment(punchIn).format("h:mm a"),
        // punchOut: moment(punchOut).format("h:mm a"),
        ...punchCard
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

export interface PCTableData extends PunchCardsWhereQ_punchCards {
  userName: string;
  date: string;
  clockIn: string;
  clockOut: string;
}

interface IProps<G> {
  table: <G>(props: React.PropsWithChildren<TableProps<G>>) => JSX.Element;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  changePC: React.Dispatch<
    React.SetStateAction<PunchCardsWhereQ_punchCards | undefined>
  >;
}

type TFC<G> = React.PropsWithChildren<IProps<G>> &
  Omit<TableProps<G>, "header" | "data" | "setScreenwithPayload">;

const TimeCardTableLoader = <G,>({
  table: Table,
  changePC,
  changeScreen,
  ...tableProps
}: TFC<G>) => {
  const { fitContentCell, fillRestEllip } = useStyles();

  const header: headerCell<PCTableData>[] = [
    {
      id: "userName",
      label: "User",
      cellProps: { align: "left", className: fitContentCell }
    },
    {
      id: "date",
      label: "Day",
      cellProps: { align: "left", className: fitContentCell }
      // orderBy: "dateSort",
      // renderComp: TRCell
    },
    {
      id: "clockIn",
      label: "Clock In",
      cellProps: { align: "left", className: fitContentCell }
      // orderBy: "dateSort",
      // renderComp: TRCell
    },
    {
      id: "clockOut",
      label: "Clock Out",
      cellProps: { align: "left", className: fitContentCell }
      // orderBy: "dateSort",
      // renderComp: TRCell
    }
  ];

  const setScreenwithPayload = (screen: string, payload: PCTableData) => {
    // console.log(payload);

    changePC(payload);
    changeScreen(screen);
  };

  const { qParams, myReturnFnc } = useTimeCLockCTX();

  const { data, ...qResults } = useQuery(PUNCHCARDS_WHEREQ, {
    variables: { query: qGenerator(qParams) },
    notifyOnNetworkStatusChange: true
  });

  let punchCards: PunchCardsWhereQ_punchCards[] = [];
  if (data) punchCards = data.punchCards;

  return (
    myReturnFnc(qResults) || (
      <Table
        header={header}
        data={morphData(punchCards)}
        setScreenwithPayload={setScreenwithPayload}
        {...tableProps}
      />
    )
  );
};

export default TimeCardTableLoader;
