import React from "react";

import { useMutation } from "react-apollo";
import { useCtx } from "../../../components/FilterComp/NewFilterHeader";
import { paramFunc } from "../NewTimeCardFilter";

import { DELETE_PUNCHCARD } from "../../../gql/mutations/punchCardMut";

import { PUNCHCARDS_WHEREQ } from "../../../gql/queries/punchCardQuery";

interface IProps {
  wrapClose: () => void;
  formHandle: (arg: () => void) => void;
  id: string;
}

const DeletePunchCard: React.FC<IProps> = ({ formHandle, id, wrapClose }) => {
  const { qParams } = useCtx();
  const query = paramFunc(qParams);

  const [submit] = useMutation(DELETE_PUNCHCARD, {
    variables: { id },
    onCompleted: wrapClose,
    refetchQueries: [{ query: PUNCHCARDS_WHEREQ, variables: { query } }]
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

export default DeletePunchCard;
