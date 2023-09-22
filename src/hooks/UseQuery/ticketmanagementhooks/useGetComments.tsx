import { getComments } from '@/apiServices/ticket/ticketservices'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useGetComments = ({ id = "",  }: { id?: string}) => {
    const { data } = useSession()
    return useQuery({
        queryKey: ['comments', `${id}`],
        queryFn: () => getComments({ ticketId: id, authToken: data?.user?.authToken }),
        enabled: data?.user && id ? true : false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    })

}

export default useGetComments