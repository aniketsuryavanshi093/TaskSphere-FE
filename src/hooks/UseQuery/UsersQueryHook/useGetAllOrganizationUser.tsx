import { getAllOrganizationsUser } from '@/apiServices/admin/adminservices'
import { useQuery } from '@tanstack/react-query'

const useGetAllOrganizationUser = (data) => {
    return useQuery({
        queryFn: () => getAllOrganizationsUser(data?.user),
        queryKey: ['orgainzationusers', ""],
        enabled: data?.user.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
    })
}

export default useGetAllOrganizationUser