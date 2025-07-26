import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/server/users";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    const user = await getUserByEmail(email);
                    if (!user || Array.isArray(user) || 'error' in user) return null;
    
                    const passwordsMatch = await bcrypt.compare(password, user.password);
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
        signIn: "/"
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };