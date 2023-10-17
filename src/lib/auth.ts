import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import axiosInterceptorInstance from "@/http";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_CLIENTID!,
            clientSecret: process.env.NEXT_AUTH_GOOGLE_SECRET!,
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
                    const res = await axiosInterceptorInstance.post('http://localhost:4000/api/v1/auth/login', credentials?.password ? {
                        "loginCredential": credentials?.username,
                        "password": credentials?.password || "",
                    } : {
                        "loginCredential": credentials?.username,
                        isGoogleLogin: true,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                    )
                    // If no error and we have user data, return it
                    const data = res.data
                    if (data.status === "fail") {
                        return
                    }
                    console.log(res.data);

                    const user = {
                        "_id": data?.data?._id,
                        "name": data?.data?.name,
                        "userName": data?.data?.userName,
                        "profilePic": data?.data?.profilePic,
                        "email": data?.data?.email,
                        "role": data?.data?.role,
                        "organizationId": data?.data?.organizationId,
                        "ticketAdministrator": data?.data?.ticketAdministrator,
                        "createdAt": data?.data?.createdAt,
                        "updatedAt": data?.data?.updatedAt,
                        "authToken": data?.data?.authToken
                    }
                    return user
                } catch (error: any) {
                    console.log(error);

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
            if (params.trigger === "update" && params.session?.profilePic) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                params.token.profilePic = params.session?.profilePic
                params.token.userName = params.session?.userName
                const res = await fetch('http://localhost:4000/api/v1/auth/update', {
                    method: "POST", body: JSON.stringify({
                        "email": params.token.email,
                        Bio: params.session?.Bio, userName: params.session?.userName, profilePic: params.session?.profilePic,
                    }),
                    headers: {

                        'Content-Type': 'application/json', // this needs to be defined
                    },
                })
                console.log("😎😎😎😎", await res.json())
            }
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
                params.token._id = datares?.data?._id
                params.token.organizationName = datares?.data?.name
                params.token.email = datares?.data?.email
                params.token.organizationId = datares?.data?.organizationId
                params.token.profilePic = datares?.data?.profilePic
                params.token.role = datares?.data?.role
                params.token.userName = datares?.data?.userName
                params.token.createdAt = datares?.data?.createdAt
                params.token.ticketAdministrator = datares?.data?.ticketAdministrator
                params.token.updatedAt = datares?.data?.updatedAt
                params.token.authToken = datares?.data?.authToken
                return params.token
            }
            if (params.user) {
                params.token.authToken = params.user.authToken
                params.token._id = params.user._id
                params.token.userName = params.user.userName
                params.token.ticketAdministrator = params?.user?.ticketAdministrator
                params.token.organizationName = params.user.name
                params.token.organizationId = params?.user?.organizationId
                params.token.profilePic = params?.user?.profilePic
                params.token.role = params.user.role
                params.token.createdAt = params.user.createdAt
                params.token.updatedAt = params.user.updatedAt
            }
            return params.token
        },
        async session({ token, session }) {
            // here we can add the role of the user this function will be called when the session is created 
            if (token) {
                session.user.id = token._id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.profilePic = token.profilePic
                session.user.userName = token.userName
                session.user.ticketAdministrator = token.ticketAdministrator
                session.user.role = token.role
                session.user.organizationId = token?.organizationId
                session.user.createdAt = token.createdAt
                session.user.updatedAt = token.updatedAt
                session.user.organizationName = token.organizationName
                session.user.authToken = token.authToken
            }
            return session
        },
    },
}

