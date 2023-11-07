import { updateTicketAction } from '@/actions/authactions/ticketadminactions'
import { ticketUpdateValuesType } from '@/app/dashboard/manageticket/[id]/page'
import enqueSnackBar from '@/lib/enqueSnackBar'
import { useQueryClient } from '@tanstack/react-query'

const useUpdateTicketHook = () => {
    const queryCLient = useQueryClient()
    const handleUpdateTicket = async (values: ticketUpdateValuesType,) => {
        try {
            const result = await updateTicketAction(values) as { status: string, message: string }
            if (result?.status === "fail") {
                enqueSnackBar({ type: "error", message: result.message, })
                return
            }
            enqueSnackBar({ type: "success", message: "Ticket Updated Successfully!" })
            queryCLient.invalidateQueries({ queryKey: ["tickets"] })
            queryCLient.invalidateQueries({ queryKey: ["activity"] })
        } catch (error) {
            console.log(error)
        }
    }
    return {
        handleUpdateTicket
    }
}

export default useUpdateTicketHook