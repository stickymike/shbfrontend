import React from "react";

import { useMutation } from "react-apollo";
import { useCtx } from "../../../components/FilterComp/NewFilterHeader";
import { paramFunc } from "../NewTimeCardFilter";

import { DELETE_PUNCHCARD } from "../../../gql/mutations/punchCardMut";

import { PUNCHCARDS_WHEREQ } from "../../../gql/queries/punchCardQuery";
import { PunchCardsWhereQ_punchCards } from "../../../generated/PunchCardsWhereQ";

interface IProps {
  changeScreen: (a: string) => void;
  formHandle: (arg: () => void) => void;
  punchCard: PunchCardsWhereQ_punchCards;
  // wrapClose: () => void;
  // formHandle: (arg: () => void) => void;
  // id: string;
}

const DeletePunchCard2: React.FC<IProps> = ({
  formHandle,
  punchCard,
  changeScreen
}) => {
  // const { qParams } = useCtx();
  // const query = paramFunc(qParams);

  const [submit] = useMutation(DELETE_PUNCHCARD, {
    variables: { id: punchCard.id },
    onCompleted: () => changeScreen("")
    // refetchQueries: [{ query: PUNCHCARDS_WHEREQ, variables: { query } }]
  });

  if (submit) formHandle(submit);
  return (
    <div
      style={{
        color: "Red",
        marginTop: "2em",
        textAlign: "center"
      }}
    >
      Are you sure you want to Delete
    </div>
  );
};

export default DeletePunchCard2;
