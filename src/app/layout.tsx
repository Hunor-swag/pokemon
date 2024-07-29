import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "@/components/nextauth-provider";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	return (
		<html lang='en'>
			<NextAuthProvider session={session}>
				<body>
					{children}
					<ToastContainer position='top-left' />
				</body>
			</NextAuthProvider>
		</html>
	);
}
