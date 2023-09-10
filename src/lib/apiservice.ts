import { stringify } from "querystring"

export const Fetch = async ({
    token, method, data, url
}: { token: string, method: string, data?: any, url: string }) => {
    let res = await fetch(`http://localhost:4000/api/v1/${url}`, {
        method, headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // this needs to be defined
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const createHeader = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}