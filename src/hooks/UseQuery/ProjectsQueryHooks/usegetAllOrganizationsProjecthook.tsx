import { getAllOrganizationsProject } from '@/apiServices/admin/adminservices'
import { useQuery } from '@tanstack/react-query'

const useGetAllOrganizationsProjecthook = (data) => {
    console.log(data?.user?.id && data?.user?.role === "organization", "😎😎😎😎");

    return useQuery({
        queryFn: () => getAllOrganizationsProject(data?.user),
        queryKey: ['orgainzationprojects', data?.user?.id],
        enabled: data?.user?.id && data?.user?.role === "organization" ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 5,
        retry: false,
        refetchOnmount: false,
    })
}

export default useGetAllOrganizationsProjecthook