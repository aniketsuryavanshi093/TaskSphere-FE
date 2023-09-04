import { getAllTickets } from '@/apiServices/ticket/ticketservices'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'

const useTicketsQueryhook = ({ id = "", filterURLValue, frompage }: { id?: string | string[], filterURLValue?: any, frompage?: boolean }) => {
    const { data } = useSession()
    return useQuery({
        queryKey: ['tickets', `${id}${filterURLValue?.string || ""}`],
        queryFn: () => getAllTickets({ id, filterURL: filterURLValue?.string }),
        enabled: data?.user && frompage ? true : false,
        refetchOnMount: true,
        refetchOnReconnect: true
    })

}

export default useTicketsQueryhook