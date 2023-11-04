'use server';
import { FormSignupvalueType } from "@/app/_components/auth/LoginForm"
import { Fetch } from "@/lib/apiservice";

export async function handleSubmit(values: FormSignupvalueType | null, type: string, submittype: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (submittype === "register") {
                if (type === "credentials") {

                    const res = await Fetch({
                        url: "auth/register",
                        method: "post",
                        data: values
                    })
                    resolve(res)
                }
            }
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

