import { useQuery } from "@apollo/client";
import { Q_GET_TIMEREQUEST } from "../../../gql/queries/timeRequestQuery";
import {
  QGetTimeRequests,
  QGetTimeRequests_timeRequests,
  QGetTimeRequestsVariables
} from "../../../generated/QGetTimeRequests";

const useAdminTRData = (
  where: QGetTimeRequestsVariables,
  onCompleted: () => void
) => {
  const { data: timeData, ...qResults } = useQuery<
    QGetTimeRequests,
    QGetTimeRequestsVariables
  >(Q_GET_TIMEREQUEST, {
    variables: where,
    notifyOnNetworkStatusChange: true,
    onCompleted
  });

  let timeRequests = [] as QGetTimeRequests_timeRequests[];
  if (timeData) timeRequests = timeData.timeRequests!;

  return [timeRequests, qResults] as const;
};

export default useAdminTRData;
