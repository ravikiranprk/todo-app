import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/server/users";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials, req) {
                if(!credentials) console.log("Error! Credentials are not present");
                const { email, password } = credentials;
                try {
                    let user = await getUserByEmail(email);

                    console.log(user);

                    if(Array.isArray(user)) user = user[0];
                    console.log(user);

                    if(!user) {
                        console.log("No user found");
                        return null;
                    }

                    const passwordsMatch = password === user.password;
                    if(!passwordsMatch) return null;

                    return user;
                } catch(error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.email = user.email;
                token.approved = user.approved;
                token.password = user.password;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.approved = token.approved;
                session.user.password = token.password;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };