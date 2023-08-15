import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import axiosInterceptorInstance from "@/http";
import { json } from "stream/consumers";
import { NextRequest, } from "next/server";
import { AxiosError } from "axios";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    // pages: {
    //     signIn: "/signup",
    // },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_SECRET!,

        }),
        GoogleProvider({
            name: "google",
            clientId: process.env.AUTH_GOOGLE_CLIENTID!,
            clientSecret: process.env.NEXT_AUTH_GOOGLE_SECRET!
        }),
        CredentialsProvider({
            name: 'Credentials',
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _req) {
                try {
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the `req` object to obtain additional parameters
                    // (i.e., the request IP address)
                    const res = await axiosInterceptorInstance.post('http://localhost:4000/api/v1/auth/login', {
                        "loginCredential": credentials?.username,
                        "password": credentials?.password
                    }, {
                        headers: {
                            'Content-Type': 'application/json', // this needs to be defined
                        }
                    }
                    )
                    // If no error and we have user data, return it
                    // console.log("credentials 😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂", credentials)
                    const data = res.data
                    console.log(data, "fail")
                    if (data.status === "fail") {
                        // throw Error(data)
                        return
                        // return Promise.reject(data)
                    }
                    const user = {
                        "_id": data?.data?._id,
                        "name": data?.data?.name,
                        "userName": data?.data?.userName,
                        "email": data?.data?.email,
                        "role": data?.data?.role,
                        "createdAt": data?.data?.createdAt,
                        "updatedAt": data?.data?.updatedAt,
                        "authToken": data?.data?.authToken
                    }
                    console.log(user, "user");
                    return user
                } catch (error: any) {
                    console.log(error?.response?.data, "error");
                    throw Error(error?.response?.data?.message)
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/login"
    },
    callbacks: {
        async jwt(params) {
            console.log(params)
            if (params.account?.provider === "google" || params.account?.provider === "github") {
                const res = await fetch('http://localhost:4000/api/v1/auth/login', {
                    method: "POST", body: JSON.stringify({
                        "loginCredential": params.user.email,
                        isGoogleLogin: true
                    }),
                    headers: {
                        'Content-Type': 'application/json', // this needs to be defined
                    },
                })
                const datares = await res.json()
                if (datares.status === "fail") {
                    return Promise.reject(datares)
                }
                params.token._id = datares?.data?._id,
                    params.token.organizationName = datares?.data?.name,
                    params.token.email = datares?.data?.email,
                    params.token.role = datares?.data?.role,
                    params.token.userName = datares?.data?.userName
                params.token.createdAt = datares?.data?.createdAt,
                    params.token.updatedAt = datares?.data?.updatedAt,
                    params.token.authToken = datares?.data?.authToken
                return params.token
            }
            if (params.user) {
                params.token.authToken = params.user.authToken
                params.token._id = params.user._id
                params.token.userName = params.user.userName
                params.token.organizationName = params.user.name
                params.token.role = params.user.role
                params.token.createdAt = params.user.createdAt
                params.token.updatedAt = params.user.updatedAt
            }
            return params.token
        },
        async session({ token, session }) {
            console.log(token, session, "from server");
            // here we can add the role of the user this function will be called when the session is created 
            if (token) {
                session.user.id = token._id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.role = token.role
                session.user.createdAt = token.createdAt
                session.user.updatedAt = token.updatedAt
                session.user.organizationName = token.organizationName
                session.user.authToken = token.authToken
            }
            return session
        },
    },
}

