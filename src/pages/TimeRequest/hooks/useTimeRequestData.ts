import { addMonths, endOfMonth, startOfMonth } from "date-fns/esm";

import { useQuery } from "react-apollo";
import { NEW_GET_ME } from "../../../gql/queries/userQuery";
import { Me, Me_me } from "../../../generated/Me";
import {
  GetTimeRequestsIDandDates,
  GetTimeRequestsIDandDates_timeRequests
} from "../../../generated/GetTimeRequestsIDandDates";
import { CREATE_TIMEREQUEST_ID_DATES } from "../../../gql/queries/timeRequestQuery";

const useTimeRequestData = (date: Date) => {
  const { data } = useQuery<Me>(NEW_GET_ME);

  let me = { id: "" } as Me_me;
  if (data) me = data.me!;

  const { data: timeData, variables: timeRequestVariables } = useQuery<
    GetTimeRequestsIDandDates
  >(CREATE_TIMEREQUEST_ID_DATES, {
    variables: {
      userId: me.id,
      startTimeShown: startOfMonth(date),
      endTimeShown: endOfMonth(addMonths(date, 1))
    }
  });

  let timeRequests = [] as GetTimeRequestsIDandDates_timeRequests[];
  if (timeData) timeRequests = timeData.timeRequests!;

  return [me, timeRequests, timeRequestVariables] as const;
};

export default useTimeRequestData;
