import React from "react";

import {
  useTimeReportFilterCtx,
  qGenerator
} from "../../../resources/punchcards/PersonalTimeReportFilter/TimeReportFilter";
import TimeReportTable from "./TimeReportTable";
import moment from "moment";
import { PunchCardsWhereQ_punchCards } from "../../../generated/PunchCardsWhereQ";
import { useQuery } from "@apollo/client";
import { PUNCHCARDS_WHEREQ } from "../../../gql/queries/punchCardQuery";
import MyLoading from "../../../components/MyLoading";

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

const TimeReportTableLoader: React.FC = () => {
  const header = [
    {
      id: "date",
      label: "Date",
      orderBy: "dateMS"
    },
    {
      id: "punchIn",
      label: "Clock In",
      cellProps: { align: "right" },
      orderBy: "startSort"
    },
    {
      id: "punchOut",
      label: "Clock Out",
      cellProps: { align: "right" },
      orderBy: "endSort"
    },
    {
      id: "timeRole",
      label: "Role",
      cellProps: { align: "right" }
    },

    {
      id: "hours",
      label: "Hours",
      cellProps: { align: "right" }
    }
  ];

  const { qParams, resultsFunc, onCompleted } = useTimeReportFilterCtx();

  const { data, ...qResults } = useQuery(PUNCHCARDS_WHEREQ, {
    variables: { query: qGenerator(qParams) },
    notifyOnNetworkStatusChange: true,
    onCompleted
  });
  resultsFunc(qResults);

  let timeCards: morphData[] = [];
  if (data) timeCards = morphData(data.punchCards);
  if (qResults?.networkStatus === 1 || qResults?.networkStatus === 2)
    return <MyLoading />;

  return (
    <TimeReportTable
      header={header}
      data={timeCards}
      totals={totals(timeCards)}
    />
  );
};

export default TimeReportTableLoader;
