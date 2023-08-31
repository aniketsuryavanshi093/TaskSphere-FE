"use server"
import { Fetch } from "@/lib/apiservice";
import { getCurrentUser } from "@/lib/session";


export async function createTicketAction(values: any) {
    return new Promise(async (resolve, reject) => {
        console.log("Helllo", values)
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