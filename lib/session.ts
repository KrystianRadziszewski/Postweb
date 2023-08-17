import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import jsonwebtoken from 'jsonwebtoken';
import { SessionInterface } from '@/common.types';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	// jwt: {
	// 	encode: ({ secret, token }) => {},
	// 	decode: async ({ secret, token }) => {},
	// },
	theme: {
		colorScheme: 'light',
		logo: '/logo.png',
	},
	callbacks: {
		async session({ session }) {
			return session;
		},
		async signIn({ user }: { user: AdapterUser | User }) {
			try {
				//get user if exist

				// create user if dont exist

				return true;
			} catch (error: any) {
				console.log(error);
				return false;
			}
		},
	},
};

export async function getCurrentUser() {
	const session = (await getServerSession(authOptions)) as SessionInterface;

	return session;
}