import { useState } from "react";
import { useMutation } from "react-apollo";
import moment, { Moment } from "moment";

import { TIMECLOCKS_FOR_USER } from "../../gql/mutations/timeCardMut";

import { NEW_GET_ME } from "../../gql/queries/userQuery";
import { Me_me } from "../../generated/Me";

import {
  NEW_PUNCHCARD,
  PUNCHOUT_PUNCHCARD
} from "../../gql/mutations/punchCardMut";

const usePunchMutation = (user: Me_me, date: Moment) => {
  const [selectedTimeRole, setSelectedTimeRole] = useState<string>(
    user.recentTimeRoleId
  );
  const punchTime = moment().toISOString();

  const [newPunch] = useMutation(NEW_PUNCHCARD, {
    variables: {
      userId: user.id,
      punchIn: punchTime,
      punchOut: punchTime,
      timeRoleId: selectedTimeRole!
    },
    refetchQueries: [
      {
        query: TIMECLOCKS_FOR_USER,
        variables: { id: user.id, date }
      },
      {
        query: NEW_GET_ME,
        variables: {}
      }
    ]
  });

  const [updatePunch] = useMutation(PUNCHOUT_PUNCHCARD, {
    variables: {
      cardId: user.clockedIn,
      punchOut: punchTime
    },
    refetchQueries: [
      {
        query: TIMECLOCKS_FOR_USER,
        variables: { id: user.id, date }
      },
      {
        query: NEW_GET_ME,
        variables: {}
      }
    ]
  });

  return [
    !user.clockedIn ? newPunch : updatePunch,
    selectedTimeRole,
    setSelectedTimeRole
  ] as const;
};

export default usePunchMutation;
