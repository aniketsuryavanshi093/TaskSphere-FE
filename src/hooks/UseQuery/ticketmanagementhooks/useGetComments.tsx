import { getComments } from '@/apiServices/ticket/ticketservices'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useGetComments = ({ id, pagination }: {
    id: string, pagination: {
        pageNumber: number, pageSize: number
    }
}) => {
    const { data } = useSession()
    return useQuery({
        queryKey: ['comments', `${id}?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`],
        queryFn: () => getComments({ ticketId: id, authToken: data?.user?.authToken }, pagination),
        enabled: data?.user && id ? true : false,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    })
}

export default useGetComments