import { getAllTickets } from '@/apiServices/ticket/ticketservices'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useTicketsQueryhook = ({ id = "", filterURLValue, frompage }: { id?: string | string[], filterURLValue?: any, frompage?: boolean }) => {
    const { data } = useSession()
    return useQuery({
        queryKey: ['tickets', `${id}${filterURLValue || ""}`],
        queryFn: () => getAllTickets({ id, filterURL: filterURLValue, authToken: data?.user?.authToken }),
        enabled: data?.user && frompage ? true : false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })
}

export default useTicketsQueryhook