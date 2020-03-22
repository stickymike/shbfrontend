import React from "react";
import { headerCell } from "../../components/Table/EnhancedTableHead";
import { TableProps } from "../../components/Table/GenericTable";
import { differenceInMinutes } from "date-fns/esm";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTimeCLockCTX,
  qGenerator
} from "../../resources/punchcards/CrudTimeClockFilter/TimeCardFilter";
import { PUNCHCARDS_WHEREQ } from "../../gql/queries/punchCardQuery";
import { useQuery } from "@apollo/client";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import minutesToDisplayString from "../../helpers/minutesToDisplayString";
import { formatMoney } from "../../helpers/formatMonies";
import { useHistory } from "react-router";
import MyLoading from "../../components/MyLoading";

type consolidatedType = {
  userName: string;
  id: string;
  time: number;
  pay: number;
  cards: number;
  formatedPay: string;
  formatedTime: string;
  // hours: string;
};

const consolidateUsers = (punchCards: PunchCardsWhereQ_punchCards[]) => {
  const midSort = punchCards;
  // const userCards: consolidatedType[] = [];
  if (midSort) {
    const userCards: consolidatedType[] = [
      ...new Set(midSort.map(({ user: { id } }) => id))
    ].map(id => ({
      id: id,
      userName: `${midSort.find(s => s.user.id === id)?.user
        .firstName!} ${midSort.find(s => s.user.id === id)?.user.lastName!}`,
      time: 0,
      formatedPay: "",
      formatedTime: "",
      pay: 0,
      cards: 0
    }));
    midSort.forEach(punchCard => {
      const targetUser =
        userCards[userCards.findIndex(({ id }) => punchCard.user.id === id)];
      targetUser.cards += 1;
      targetUser.time += differenceInMinutes(
        new Date(punchCard.punchOut),
        new Date(punchCard.punchIn)
      );
      targetUser.formatedTime = minutesToDisplayString(targetUser.time);
      targetUser.pay +=
        (differenceInMinutes(
          new Date(punchCard.punchOut),
          new Date(punchCard.punchIn)
        ) /
          60) *
        punchCard.timeRole.payRate;

      targetUser.formatedPay = formatMoney(targetUser.pay);
    });

    return userCards;
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

// export interface PCTableData extends PunchCardsWhereQ_punchCards {
//   userName: string;
//   date: string;
//   clockIn: string;
//   clockOut: string;
// }

interface IProps<G> {
  table: <G>(props: React.PropsWithChildren<TableProps<G>>) => JSX.Element;
  // changeScreen: React.Dispatch<React.SetStateAction<string>>;
  // changePC: React.Dispatch<
  //   React.SetStateAction<PunchCardsWhereQ_punchCards | undefined>
  // >;
}

type TFC<G> = React.PropsWithChildren<IProps<G>> &
  Omit<TableProps<G>, "header" | "data" | "setScreenwithPayload">;

const AdminTimeReportLoader = <G,>({
  table: Table,
  // changePC,
  // changeScreen,
  ...tableProps
}: TFC<G>) => {
  const { fitContentCell } = useStyles();

  const header: headerCell<consolidatedType>[] = [
    {
      id: "userName",
      label: "User",
      cellProps: { align: "left", className: fitContentCell }
    },

    {
      id: "cards",
      label: "Total Cards",
      cellProps: { align: "left", className: fitContentCell }
      // orderBy: "time"
      // renderComp: TRCell
    },
    {
      id: "formatedTime",
      label: "Worked Time",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "time"
      // renderComp: TRCell
    },

    {
      id: "formatedPay",
      label: "Pay",
      cellProps: { align: "left", className: fitContentCell },
      orderBy: "pay"
      // renderComp: TRCell
    }
  ];

  const history = useHistory();

  const setScreenwithPayload = (screen: string, payload: consolidatedType) => {
    history.push("/Admin/TimeCards", {
      filter: { ...qParams, userIds: [payload.id] }
    });
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
      data={consolidateUsers(punchCards)}
      setScreenwithPayload={setScreenwithPayload}
      {...tableProps}
    />
  );
};

export default AdminTimeReportLoader;
