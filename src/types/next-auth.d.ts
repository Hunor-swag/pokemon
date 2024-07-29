import NextAuth from "next-auth";

// modify the default nextauth session and user types

declare module "next-auth" {
	interface Session {
		user: {
			id?: string | null;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}

	interface User {
		id?: string | null;
	}
}
