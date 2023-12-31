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

export async function createBlogAction({mode, title, content,postid, previewImage, slug, description }: {postid: string | undefined , mode: string | null, title: string, description: string, content: string, previewImage: string, slug: string }) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getCurrentUser();
            const result = await Fetch({
                method: "POST", data: ({ title, content, previewImage, slug, description }),
                url: mode ? `blog/updateblog/${postid}` :  "blog/createBlog",
                token: user?.authToken,
            })
            resolve(result)
        } catch (error: any) {
            reject(error)
        }
    });
}