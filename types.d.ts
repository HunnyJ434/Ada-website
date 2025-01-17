import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}

