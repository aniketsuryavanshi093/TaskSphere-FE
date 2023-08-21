'use server';
import { FormSignupvalueType } from "@/app/_components/auth/LoginForm"
import axiosInterceptorInstance from "@/http";
import { Fetch } from "@/lib/apiservice";
import { getCurrentUser } from "@/lib/session";
import { cookies } from 'next/headers'



export async function handleSubmit(values: FormSignupvalueType | null, type: string, submittype: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (submittype === "register") {
                if (type === "credentials") {
                    const loginres = await fetch("http://localhost:4000/api/v1/auth/register", {
                        method: "POST", body: JSON.stringify(values)
                        ,
                        headers: {
                            'Content-Type': 'application/json', // this needs to be defined
                        },
                    })
                    const res = await loginres.json()
                    resolve(res)
                }
            }
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

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
            const loginres = await Fetch({
                method: "POST", data: (values),
                url: "members/addMember",
                token: user?.authToken,
            })

            resolve(loginres)
        } catch (error: any) {
            reject(error)
        }
    });
}
