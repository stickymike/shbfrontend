import React from "react";
import { useQuery } from "react-apollo";

import { paramFunc } from "./NewTimeCardFilter";
import { useCtx } from "../../components/FilterComp/NewFilterHeader";
import { PUNCHCARDS_WHEREQ } from "../../gql/queries/punchCardQuery";
import MaterialTable from "material-table";
import moment from "moment";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";
import MyLoading from "../../components/MyLoading";

interface IProps {
  screen: string;
  editFunc: (arg: string) => void;
}

const morphData = (punchCards: PunchCardsWhereQ_punchCards[]) => {
  if (punchCards) {
    return punchCards.map(({ id, user, punchIn, punchOut }) => {
      return {
        id,
        userName: `${user.firstName} ${user.lastName}`,
        date: moment(punchIn).format("dddd, MM/DD"),
        punchIn: moment(punchIn).format("h:mm a"),
        punchOut: moment(punchOut).format("h:mm a")
      };
    });
  }
};

const TimeCardViewer: React.FC<IProps> = ({ screen, editFunc }) => {
  const { qParams } = useCtx();

  const { data, loading } = useQuery(PUNCHCARDS_WHEREQ, {
    variables: { query: paramFunc(qParams) }
  });

  let punchCards: PunchCardsWhereQ_punchCards[] = [];

  if (data) punchCards = data.punchCards;

  if (loading) return <MyLoading />;

  const newData = morphData(punchCards!);

  return (
    <div style={{ marginTop: "-16px" }}>
      <MaterialTable
        options={{
          paging: false,
          draggable: false,
          search: false,
          showTitle: false,
          toolbar: false,
          rowStyle: {
            borderBottom: ""
          }
        }}
        onRowClick={(e, rowtable) => editFunc(rowtable!.id)}
        components={{
          Container: ({ children }) => <>{children}</>
        }}
        columns={[
          {
            title: "User",
            field: "userName"
          },
          {
            title: "Day",
            field: "date",
            customSort: (a, b) =>
              moment(a.date, "dddd, MM/DD").diff(moment(b.date, "dddd, MM/DD"))
          },
          {
            title: "Clock In",
            field: "punchIn"
          },
          {
            title: "Clock Out",
            field: "punchOut"
          }
          // {
          //   title: "Worked Time",
          //   field: "N/a",
          //   render: (data: any) => {
          //     const dateVs = data.clockOut
          //       ? data.clockOut.punchTime
          //       : new Date();
          //     const timeWorked = moment.duration(
          //       moment(dateVs).diff(data.clockIn.punchTime)
          //     );

          //     return `${timeWorked.hours()}:${timeWorked.minutes()}`;
          //   }
          // }
        ]}
        data={newData!}
      />
    </div>
  );
};

export default TimeCardViewer;

export { morphData };
