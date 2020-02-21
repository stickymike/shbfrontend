import React from "react";
import { headerCell } from "../../../components/Table/EnhancedTableHead";
import { TableProps } from "../../../components/Table/GenericTable";
import {
  format,
  differenceInMilliseconds,
  differenceInMinutes,
  startOfDay,
  differenceInHours
} from "date-fns/esm";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTimeCLockCTX,
  qGenerator
} from "../../../resources/punchcards/CrudTimeClockFilter/TimeCardFilter";
import { PUNCHCARDS_WHEREQ } from "../../../gql/queries/punchCardQuery";
import { useQuery } from "react-apollo";
import { PunchCardsWhereQ_punchCards } from "../../../generated/PunchCardsWhereQ";

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
        duration: `${(
          "0" +
          ((differenceInMinutes(endTime, startTime) / 60) | 0)
        ).slice(-2)}:${(
          "0" +
          (differenceInMinutes(endTime, startTime) % 60 | 0)
        ).slice(-2)}`,
        timeRoleName: punchCard.timeRole.shortName,
        ...punchCard
      };
    });
  }
  return [];
};

type consolidatedType = {
  userName: string;
  userId: string;
  time: number;
  pay: number;
  // hours: string;
};

const consolidateUsers = (punchCards: PunchCardsWhereQ_punchCards[]) => {
  const midSort = punchCards;
  // const userCards: consolidatedType[] = [];
  if (midSort) {
    const userCards: consolidatedType[] = [
      ...new Set(midSort.map(({ user: { id } }) => id))
    ].map(id => ({
      userId: id,
      userName: midSort.find(s => s.user.id === id)?.user.firstName!,
      time: 0,
      pay: 0
    }));
    midSort.forEach(punchCard => {
      const index = userCards.findIndex(
        ({ userId }) => punchCard.user.id === userId
      );
      userCards[index].time += differenceInMinutes(
        new Date(punchCard.punchOut),
        new Date(punchCard.punchIn)
      );
      userCards[index].pay +=
        ((differenceInMinutes(
          new Date(punchCard.punchOut),
          new Date(punchCard.punchIn)
        ) /
          60) *
          punchCard.timeRole.payRate) /
        100;
    });

    // midSort.map(({ user: { id, firstName } }) => ({
    //   userId: id,
    //   userName: firstName
    // }));
    // // .filter((val, index, self) => self.indexOf(val) === index);

    console.log(userCards);

    // midSort
    //   .sort(({ user: { code: idA } }, { user: { code: idB } }) => idA - idB)
    //   .forEach(punchCard => {
    //     if (
    //       userCards.length === 0 ||
    //       userCards.slice(-1)[0].userId !== punchCard.user.id
    //     )
    //       userCards.push({
    //         userName: punchCard.user.firstName,
    //         userId: punchCard.user.id,
    //         time: differenceInMinutes(
    //           new Date(punchCard.punchOut),
    //           new Date(punchCard.punchIn)
    //         )
    //       });
    //     else if (userCards.slice(-1)[0].userId === punchCard.user.id)
    //       userCards.slice(-1)[0].time += differenceInMinutes(
    //         new Date(punchCard.punchOut),
    //         new Date(punchCard.punchIn)
    //       );
    //   });

    // console.log([...new Set([1, 1, 2])]);

    // console.log(userCards);
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

  const { qParams, myReturnFnc } = useTimeCLockCTX();

  const { data, ...qResults } = useQuery(PUNCHCARDS_WHEREQ, {
    variables: { query: qGenerator(qParams) },
    notifyOnNetworkStatusChange: true
  });

  let punchCards: PunchCardsWhereQ_punchCards[] = [];
  if (data) punchCards = data.punchCards;

  consolidateUsers(punchCards);

  // console.log();

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
