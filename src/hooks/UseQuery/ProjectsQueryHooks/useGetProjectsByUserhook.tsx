import { GetProjectByUser } from '@/apiServices/admin/adminservices'
import { useQuery } from '@tanstack/react-query'

const useGetProjectsByUserhook = (data) => {
    return useQuery({
        queryFn: () => GetProjectByUser(data?.user),
        queryKey: ['userprojects', data?.user?.id],
        enabled: data?.user?.id && data?.user?.role === "member" ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
    })
}

export default useGetProjectsByUserhook