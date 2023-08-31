import { getAllOrganizationsProject } from '@/apiServices/admin/adminservices'
import { useQuery } from '@tanstack/react-query'

const useGetAllOrganizationsProjecthook = (data) => {
    return useQuery({
        queryFn: () => getAllOrganizationsProject(data?.user),
        queryKey: ['orgainzationprojects', ""],
        enabled: data?.user.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
    })
}

export default useGetAllOrganizationsProjecthook