import { getAllOrganizationsProject } from '@/apiServices/admin/adminservices'
import { useQuery } from '@tanstack/react-query'

const useGetAllOrganizationsProjecthook = (data, pagination, isanalytic) => {
    return useQuery({
        queryFn: () => getAllOrganizationsProject({ ...data?.user, ...pagination, isanalytic }),
        queryKey: ['orgainzationprojects', isanalytic ? `${data?.user?.id}?isanalytic?page=${pagination.currentPage}?itemcount=${pagination.PerpageItemCount}` : data?.user?.id],
        enabled: data?.user?.id && data?.user?.role === "organization" ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
    })
}

export default useGetAllOrganizationsProjecthook