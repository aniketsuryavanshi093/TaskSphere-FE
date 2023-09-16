import { getProjectDetail } from "@/apiServices/ticket/ticketservices";
import { useQuery } from "@tanstack/react-query";

const useGetProjectDetails = (data, projectId, count) => {
  return useQuery({
    queryFn: () => getProjectDetail({ ...data?.user, projectId, count }),
    queryKey: ["projectdetail", projectId],
    enabled: !!(data?.user?.id && projectId) ? true : false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnmount: false,
  });
};

export default useGetProjectDetails;
