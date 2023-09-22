"use server"
import { ticketUpdateValuesType } from "@/app/dashboard/manageticket/[id]/page";
import { Fetch } from "@/lib/apiservice";
import { getCurrentUser } from "@/lib/session";


export async function createTicketAction(values: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST", data: (values),
                url: "ticket/create",
                token: user?.authToken,
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function addUsertoProjectaction(values: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST",
                url: `project/addMember/${values.userId}/${values.projectId}`,
                token: user?.authToken,
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function updateTicketAction(values: ticketUpdateValuesType) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST",
                url: `ticket/updateTicket/${values.ticketId}`,
                token: user?.authToken,
                data: values
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function createCommentaction(values: { text: string, author?: string, ticketId: string }) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST",
                url: `ticket/comments/${values.ticketId}`,
                token: user?.authToken,
                data: {
                    text: values.text, author: user?.role !== "organization" ? user.id : undefined, orgMember: user?.role === "organization" ? user.id : undefined
                }
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function replytoCommentaction(values: { text: string, author?: string, ticketId: string }, commentId: string | undefined) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST",
                url: `ticket/reply/${values.ticketId}/${commentId}`,
                token: user?.authToken,
                data: {
                    text: values.text, author: user?.role !== "organization" ? values.author : undefined, orgMember: user?.role === "organization" ? user.id : undefined
                }
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}


