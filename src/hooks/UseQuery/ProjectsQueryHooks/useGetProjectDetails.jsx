import { getProjectDetail } from "@/apiServices/ticket/ticketservices";
import { useQuery } from "@tanstack/react-query";

const useGetProjectDetails = (data, projectId, count) => {
  console.log(
    data,
    projectId,
    "😂😂😂😂😂😂😂😂",
    !!(data?.user?.id && data?.user?.role === "member" && projectId)
  );
  return useQuery({
    queryFn: () => getProjectDetail({ ...data?.user, projectId, count }),
    queryKey: ["projectdetail", projectId],
    enabled: !!(data?.user?.id && data?.user?.role === "member" && projectId)
      ? true
      : false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnmount: false,
  });
};

export default useGetProjectDetails;
