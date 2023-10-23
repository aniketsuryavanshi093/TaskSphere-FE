'use server';

import { Fetch } from "@/lib/apiservice";
import { getCurrentUser } from "@/lib/session";

export async function createProjectaction(values: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const loginres = await Fetch({
                method: "POST", data: (values)
                ,
                url: "project/createProject",
                token: user?.authToken,
            })
            resolve(loginres)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function createUseraction(values: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST", data: (values),
                url: "members/addMember",
                token: user?.authToken,
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}

export async function createBlogAction({ title, content, previewImage, slug }: { title: string, content: string, previewImage: string, slug: string }) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser()
            const result = await Fetch({
                method: "POST", data: ({ title, content, previewImage, slug }),
                url: "blog/createBlog",
                token: user?.authToken,
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}

