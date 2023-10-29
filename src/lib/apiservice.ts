
export const Fetch = async ({
    token, method, data, url
}: { token?: string, method: string, data?: any, url: string }) => {

    let res = await fetch(`${process.env.NEXT_SERVERURL}${url}`, {
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