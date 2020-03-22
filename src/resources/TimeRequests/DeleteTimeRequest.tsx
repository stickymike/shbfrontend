import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TIMEREQUEST } from "../../gql/mutations/timeRequestMut";

interface IProps {
  changeScreen: (a: string) => void;
  formHandle: (arg: () => void) => void;
  id?: string;
  refetch?: { query: any; variables: any }[];
}

const DeleteTimeRequest: React.FC<IProps> = ({
  formHandle,
  id,
  changeScreen,
  refetch
}) => {
  const [submit] = useMutation(DELETE_TIMEREQUEST, {
    variables: { id },
    onCompleted: () => changeScreen(""),
    refetchQueries: refetch
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
