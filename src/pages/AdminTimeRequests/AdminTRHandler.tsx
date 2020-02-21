import React from "react";
import TimeRequestHandler, {
  TimeRequestHandlerProps
} from "../TimeRequest/TimeRequestHandler";
import {
  useTRFilterCtx,
  whereGenerator
} from "../../resources/TimeRequests/CrudTimeRequestFilter/AdminTRFilter";
import { Q_GET_TIMEREQUEST } from "../../gql/queries/timeRequestQuery";

const AdminTRHandler: React.FC<Omit<
  TimeRequestHandlerProps,
  "qInfoTimeRequests"
>> = props => {
  const { qParams } = useTRFilterCtx();
  whereGenerator(qParams);
  return (
    <TimeRequestHandler
      // dialogueScreen={dialogueScreen}
      // changeScreen={changeScreen}
      // dates={[firstDate, secondDate]}
      // user={me}
      // timeRequest={timeRequest}
      // qInfoTimeRequests={qInfoTimeRequests}
      refetch={[
        { query: Q_GET_TIMEREQUEST, variables: whereGenerator(qParams) }
      ]}
      {...props}
    />
  );
};

export default AdminTRHandler;
