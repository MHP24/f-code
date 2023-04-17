import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '@/database';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeHolder: 'example@mail.com' },
        password: { label: 'Password', type: 'password', placeHolder: '*********' }
      },

      async authorize(credentials): Promise<any> {
        const { email = '', password = '' } = credentials as { email: string, password: string };
        return await dbUsers.checkUser(email, password);
      }
    })
  ],

  /* Custom pages */
  pages: {
    signIn: '/auth/sign_in',
    signUp: '/auth/sign_up',
  },

  /* Config */
  session: {
    maxAge: 2678400,
    updateAge: 86400,
  },

  /* Callbacks */
  callbacks: {
    async jwt({ token, account, user }: any) {
      console.log({ token, account, user })
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthenticate(user?.email!, user?.name!, user?.image!);
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      session.accesToken = token.accessToken;
      session.user = token.user;
      return session;
    }
  }
}

export default NextAuth(authOptions);