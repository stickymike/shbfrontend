import React from "react";

import { useMutation } from "react-apollo";
import { DELETE_TIMEREQUEST } from "../../../gql/mutations/timeRequestMut";
import { CREATE_TIMEREQUEST_ID_DATES } from "../../../gql/queries/timeRequestQuery";

interface IProps {
  changeScreen: (a: string) => void;
  formHandle: (arg: () => void) => void;
  id?: string;
  qInfoTimeRequests: Record<string, any>;
}

const DeleteTimeRequest: React.FC<IProps> = ({
  formHandle,
  id,
  changeScreen,
  qInfoTimeRequests
}) => {
  // const { qParams } = useCtx();
  // const query = paramFunc(qParams);

  const [submit] = useMutation(DELETE_TIMEREQUEST, {
    variables: { id },
    onCompleted: () => changeScreen(""),
    refetchQueries: [
      { query: CREATE_TIMEREQUEST_ID_DATES, variables: qInfoTimeRequests }
    ]
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

export default DeleteTimeRequest;
