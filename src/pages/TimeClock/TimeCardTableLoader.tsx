import React from "react";
import { headerCell } from "../../components/Table/EnhancedTableHead";
import { TableProps } from "../../components/Table/GenericTable";
import { format, differenceInMinutes, startOfDay } from "date-fns/esm";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTimeCLockCTX,
  qGenerator
} from "../../resources/punchcards/CrudTimeClockFilter/TimeCardFilter";
import { PUNCHCARDS_WHEREQ } from "../../gql/queries/punchCardQuery";
import { useQuery } from "@apollo/client";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import minutesToDisplayString from "../../helpers/minutesToDisplayString";
import MyLoading from "../../components/MyLoading";

const morphData = (punchCards: PunchCardsWhereQ_punchCards[]) => {
  if (punchCards) {
    return punchCards.map(punchCard => {
      const startTime = new Date(punchCard.punchIn);
      const endTime = new Date(punchCard.punchOut);
      return {
        userName: `${punchCard.user.firstName} ${punchCard.user.lastName}`,
        date: format(startTime, "EEEE, M/d"),
        dateSort: Number(format(startTime, "t")),
        clockIn: format(startTime, "h:mm a"),
        clockInSort: differenceInMinutes(startTime, startOfDay(startTime)),
        clockOut: format(endTime, "h:mm a"),
        clockOutSort: differenceInMinutes(endTime, startOfDay(endTime)),
        durationSort: differenceInMinutes(endTime, startTime),
        duration: minutesToDisplayString(
          differenceInMinutes(endTime, startTime)
        ),

        timeRoleName: punchCard.timeRole.shortName,
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
  const { fitContentCell } = useStyles();

  const header: headerCell<PCTableData>[] = [
    {
      id: "userName",
      label: "User",
      cellProps: { align: "left", className: fitContentCell }
    },
    {
      id: "date",
      label: "Day",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "dateSort"
      // renderComp: TRCell
    },
    {
      id: "timeRoleName",
      label: "Role",
      cellProps: { align: "left", className: fitContentCell }
      // orderBy: "dateSort"
      // renderComp: TRCell
    },
    {
      id: "clockIn",
      label: "Clock In",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "clockInSort"
      // renderComp: TRCell
    },
    {
      id: "clockOut",
      label: "Clock Out",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "clockOutSort"
      // renderComp: TRCell
    },
    {
      id: "duration",
      label: "Worked Time",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "durationSort"
      // orderBy: "dateSort",
      // renderComp: TRCell
    }
  ];

  const setScreenwithPayload = (screen: string, payload: PCTableData) => {
    // console.log(payload);

    changePC(payload);
    changeScreen(screen);
  };

  const { qParams, resultsFunc, onCompleted } = useTimeCLockCTX();

  const { data, ...qResults } = useQuery(PUNCHCARDS_WHEREQ, {
    variables: { query: qGenerator(qParams) },
    notifyOnNetworkStatusChange: true,
    onCompleted
  });
  resultsFunc(qResults);

  let punchCards: PunchCardsWhereQ_punchCards[] = [];
  if (data) punchCards = data.punchCards;
  if (qResults?.networkStatus === 1 || qResults?.networkStatus === 2)
    return <MyLoading />;

  return (
    <Table
      header={header}
      data={morphData(punchCards)}
      setScreenwithPayload={setScreenwithPayload}
      {...tableProps}
    />
  );
};

export default TimeCardTableLoader;
