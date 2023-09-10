import { GetProjectUsers } from '@/apiServices/admin/adminservices'
import { useQuery } from '@tanstack/react-query'

const useGetProjectUsers = (data, projectId) => {
    return useQuery({
        queryFn: () => GetProjectUsers({ ...data?.user, projectId }),
        queryKey: ['projectusers', projectId],
        enabled: data?.user.id && projectId ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
    })
}

export default useGetProjectUsers