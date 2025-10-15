/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.error("Email or Password is missing");
                    return null;
                }

                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );
                    console.log("Response From Backend:", res);
                    if (!res?.ok) {
                        console.error("Login Failed", await res.text());
                        return null;
                    }

                    const user = await res.json();
                    if (user.id) {
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email,
                            image: user?.picture,
                        };
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error(err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user?.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.id = token?.id as string;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
}