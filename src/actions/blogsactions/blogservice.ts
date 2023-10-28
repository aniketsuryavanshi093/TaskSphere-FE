import { Fetch } from "@/lib/apiservice";

export async function getAllposts(page) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Fetch({
                method: "GET",
                url: `blog/getallblogs?page=${page}&limit=2`,
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

