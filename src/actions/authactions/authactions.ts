'use server';
import { FormSignupvalueType } from "@/app/_components/auth/LoginForm"

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

