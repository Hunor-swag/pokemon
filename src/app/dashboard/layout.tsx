import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import Button from "@/components/button";
import { signOut } from "next-auth/react";
import Header from "@/components/header";
import { fetchAllPokemon } from "@/lib/fetchPokemon";

// this is the dashboard layout file that will be used to wrap the dashboard pages

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (session) {
		return (
			<div>
				<Header />
				<div className='pt-16'>{children}</div>
			</div>
		);
	}
	return (
		<div>
			<p>Access Denied</p>
			<Link href='/auth/login' className='text-blue-500'>
				Login
			</Link>
		</div>
	);
}
