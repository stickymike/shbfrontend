import React from "react";
import moment from "moment";

import { query } from "./TimeReportFilter";
import { useQuery } from "react-apollo";
import { useCtx } from "../../components/FilterComp/NewFilterHeader";
import { PUNCHCARDS_WHEREQ } from "../../gql/queries/punchCardQuery";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";

import MyLoading from "../../components/MyLoading";
import TimeReportTable from "./TimeReportTable";

interface morphData {
  id: string;
  userName: string;
  date: string;
  punchIn: string;
  punchOut: string;
  timeRole: string;
  hours: string;
  workedMS: number;
}

const morphData = (punchCards: PunchCardsWhereQ_punchCards[]) => {
  if (punchCards) {
    return punchCards.map(({ id, user, punchIn, punchOut, timeRole }) => {
      const workedMS = moment(punchOut).diff(moment(punchIn));
      const currentMS = moment().diff(moment(punchIn));
      const hours = moment
        .duration(workedMS ? workedMS : currentMS)
        .format("HH:mm", {
          trim: false
        });

      return {
        id,
        userName: `${user.firstName} ${user.lastName}`,
        date: moment(punchIn).format("dddd, MM/DD"),
        punchIn: moment(punchIn).format("h:mm a"),
        punchOut: workedMS ? moment(punchOut).format("h:mm a") : "n/a",
        timeRole: timeRole.shortName,
        hours,
        workedMS,
        dateMS: moment(punchIn).valueOf(),
        startSort: moment(punchIn)
          .diff(moment(punchIn).startOf("day"))
          .valueOf(),
        endSort: moment(punchOut)
          .diff(moment(punchOut).startOf("day"))
          .valueOf()
      };
    });
  }
  return [];
};

type totals = {
  [key: string]: number;
};

const totals = (data: any) => {
  let totals: totals = {} as totals;
  data.forEach((rows: { timeRole: string; workedMS: number }) => {
    totals[rows.timeRole] = totals[rows.timeRole]
      ? totals[rows.timeRole] + rows.workedMS
      : 0 + rows.workedMS;
  });
  return totals;
};

const header = [
  {
    id: "date",
    numeric: false,
    label: "Date",
    orderBy: "dateMS"
  },
  {
    id: "punchIn",
    numeric: true,
    label: "Clock In",
    props: { align: "right" },
    orderBy: "startSort"
  },
  {
    id: "punchOut",
    numeric: true,
    label: "Clock Out",
    props: { align: "right" },
    orderBy: "endSort"
  },
  {
    id: "timeRole",
    numeric: true,
    label: "Role",
    props: { align: "right" }
  },

  {
    id: "hours",
    numeric: true,
    label: "Hours",
    props: { align: "right" }
  }
];

interface IProps {
  refresh: boolean;
  setRefresh: (arg: boolean) => void;
  loading: any;
}

const TableReportWrapper: React.FC<IProps> = ({
  refresh,
  setRefresh,
  loading
}) => {
  const { qParams } = useCtx();

  const { data, refetch, networkStatus } = useQuery(PUNCHCARDS_WHEREQ, {
    variables: { query: query(qParams) },
    notifyOnNetworkStatusChange: true
  });

  if (refresh) {
    refetch();
    setRefresh(!refresh);
  }

  if (networkStatus === 1) return <MyLoading />;
  if (networkStatus === 4) loading(true);
  else loading(false);

  let timeCards: morphData[] = [];
  if (data) timeCards = morphData(data.punchCards);

  return (
    <TimeReportTable
      header={header}
      data={timeCards}
      totals={totals(timeCards)}
    />
  );
};

export default TableReportWrapper;
