import { GetProjectUsers } from "@/apiServices/admin/adminservices";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

const useGetProjectUsers = (
  data: Session | null,
  projectId: string | string[],
  isallowed: boolean | undefined
) => {
  return useQuery({
    queryFn: () => GetProjectUsers({ ...data?.user, projectId }),
    queryKey: ["projectusers", projectId],
    enabled: data?.user.id && projectId && isallowed ? true : false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnmount: false,
  });
};

export default useGetProjectUsers;
