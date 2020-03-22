import { useQuery } from "@apollo/client";
import { NEW_GET_ME } from "../../../gql/queries/userQuery";
import { Me, Me_me } from "../../../generated/Me";
import {
  GetTimeRequestsIDandDates,
  GetTimeRequestsIDandDates_timeRequests
} from "../../../generated/GetTimeRequestsIDandDates";
import { GET_TIMEREQUEST_ID_DATES } from "../../../gql/queries/timeRequestQuery";

const useTimeRequestData = (firstDate: Date, secondDate: Date) => {
  const { data } = useQuery<Me>(NEW_GET_ME);

  let me = { id: "" } as Me_me;
  if (data) me = data.me!;

  const { data: timeData, variables: timeRequestVariables } = useQuery<
    GetTimeRequestsIDandDates
  >(GET_TIMEREQUEST_ID_DATES, {
    variables: {
      userId: me.id,
      startTimeShown: firstDate,
      endTimeShown: secondDate
    }
  });

  let timeRequests = [] as GetTimeRequestsIDandDates_timeRequests[];
  if (timeData) timeRequests = timeData.timeRequests!;

  return [me, timeRequests, timeRequestVariables] as const;
};

export default useTimeRequestData;
