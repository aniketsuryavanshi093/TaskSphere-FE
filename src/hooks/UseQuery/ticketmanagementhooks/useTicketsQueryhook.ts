import { getAllTickets } from '@/apiServices/ticket/ticketservices'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { AiFillDingtalkSquare } from 'react-icons/ai'

const useTicketsQueryhook = ({ id = "", filterURLValue, frompage }: { id?: string | string[], filterURLValue?: any, frompage?: boolean }) => {
    const { data } = useSession()
    return useQuery({
        queryKey: ['tickets', `${id}${filterURLValue?.string || ""}`],
        queryFn: () => getAllTickets({ id, filterURL: filterURLValue?.string, authToken: data?.user?.authToken }),
        enabled: data?.user && frompage ? true : false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    })

}

export default useTicketsQueryhook