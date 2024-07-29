import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "E-mail" },
				password: { label: "Password", type: "Password" },
			},

			async authorize(credentials, req) {
				try {
					const res = await fetch(
						`${process.env.API_URL}/auth/users/${credentials?.email}`,
						{
							method: "GET",
							headers: { "Content-Type": "application/json" },
						}
					);

					const { data: user } = await res.json();

					console.log("user: ", user);

					if (!user) {
						return null;
					}

					const isMatch = await bcrypt.compare(
						credentials?.password as string | Buffer,
						user.password
					);
					if (!isMatch) {
						// wrong password
						return null;
					} else {
						// user found & password match
						return user;
					}
					return null;
				} catch (err) {
					console.log(err);
				}
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, trigger, session }: any) {
			if (user) {
				token.uid = user.id;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token, user }: any) {
			session.user.id = token.sub;
			session.user.email = token.email;
			return session;
		},
		async redirect({ url, baseUrl }: any) {
			return baseUrl;
		},
	},
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
};
