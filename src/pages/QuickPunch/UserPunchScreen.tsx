import React, { useState } from "react";

import { useQuery } from "react-apollo";

import moment, { Moment } from "moment";

import DateComp from "./components/DateComp";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import { Me_me } from "../../generated/Me";

import MyLoading from "../../components/MyLoading";

import usePunchMutation from "./usePunchMutation";
import { PUNCHCARDS_USERID_DATE } from "../../gql/queries/punchCardQuery";
import {
  punchcardsuseriddate,
  punchcardsuseriddateVariables,
  punchcardsuseriddate_punchCards
} from "../../generated/punchcardsuseriddate";
import Box from "@material-ui/core/Box";
import { Tooltip } from "@material-ui/core";

interface IProps {
  user: Me_me;
  date: Moment;
  submitMyForm: (arg: () => void) => void;
}

const UserPunchScreen: React.FC<IProps> = ({ user, date, submitMyForm }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [fnc, selectedTimeRole, setSelectedTimeRole] = usePunchMutation(
    user,
    date
  );
  const { loading: queryLoading, data: queryData } = useQuery<
    punchcardsuseriddate,
    punchcardsuseriddateVariables
  >(PUNCHCARDS_USERID_DATE, {
    variables: { id: user.id, date: date.toISOString() },
    fetchPolicy: firstRender ? "network-only" : undefined,
    onCompleted: () => setFirstRender(false)
  });

  let punchCards: Array<punchcardsuseriddate_punchCards> = [];
  if (queryData && queryData.punchCards) punchCards = queryData.punchCards;

  let newtime: number = 0;
  if (punchCards.length > 0) {
    newtime = punchCards.reduce(
      (mytotal: number, punchCard: punchcardsuseriddate_punchCards): number => {
        const difference = moment(punchCard.punchOut).diff(punchCard.punchIn);
        if (difference === 0) return mytotal + moment().diff(punchCard.punchIn);
        return mytotal + moment(punchCard.punchOut).diff(punchCard.punchIn);
      },
      0
    );
  }

  if (queryLoading) return <MyLoading />;

  submitMyForm(fnc);

  return (
    <>
      <DateComp
        value={moment().startOf("isoWeek")}
        time={moment.duration(newtime)}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom="24px"
        marginTop="8px"
      >
        <Typography variant="h6">
          {"\n"}
          {user.timeRoles!.length === 0
            ? "No Roles Available Talk to Manager"
            : undefined}
        </Typography>

        {/* <div style={{ marginBottom: "8px" }}> */}
        {user.timeRoles!.map((opt: any) => (
          <Tooltip key={opt.id} title="Select Role">
            <Chip
              label={opt.shortName}
              color={selectedTimeRole === opt.id ? "primary" : "default"}
              onClick={
                user.clockedIn ? undefined : () => setSelectedTimeRole(opt.id)
              }
              style={{ margin: "0px 0px 0px 8px" }}
            />
          </Tooltip>
        ))}
        {/* </div> */}
      </Box>
    </>
  );
};

export default UserPunchScreen;
