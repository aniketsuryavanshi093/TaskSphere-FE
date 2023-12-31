import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as { user: any }
    return session?.user
}
