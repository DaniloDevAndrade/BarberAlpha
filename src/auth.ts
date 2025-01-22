import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { RequestLogin } from "./app/login/api/requestLogin"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials:{
                email: {},
                password: {}
            },
            authorize: async (credentials) =>{
                const user = await RequestLogin(credentials)
                console.log(user)
                return user
            },
        })
    ],
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
      }
})
