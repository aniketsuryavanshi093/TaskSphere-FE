import { Fetch } from "@/lib/apiservice";

export async function getAllposts(page: string, search: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Fetch({
                method: "GET",
                url: search ? `blog/search?page=${page}&isFulsearch=true&search=${search}` : `blog/getallblogs?page=${page}&limit=2`,
            })
            resolve(result.data)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function getalluserspost(page: string, search: string , id: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Fetch({
                method: "GET",
                url: `blog/usersblog/${id}?page=${page}&limit=10`,
            })
            resolve(result.data)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function getPostFromParams(slug: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Fetch({
                method: "GET",
                url: `blog/getblog/${slug}`,
            })
            resolve(result.data)
        } catch (error: any) {
            reject(error)
        }
    });
}