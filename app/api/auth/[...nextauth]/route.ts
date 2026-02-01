import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ONE_DAY = 60 * 60 * 24; // seconds
// const FIVE_MINUTES = 60 * 5; // seconds

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const validUsername = process.env.AUTH_USERNAME;
        const validPassword = process.env.AUTH_PASSWORD;

        if (
          credentials.username === validUsername &&
          credentials.password === validPassword
        ) {
          return {
            id: "1",
            name: credentials.username,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: ONE_DAY,
  },
  jwt: {
    maxAge: ONE_DAY,
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
