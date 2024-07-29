"use client";

import { signOut } from "next-auth/react";
import Button from "./button";

// this is the header component that will be used in the dashboard layout

export default function Header() {
	return (
		<div className='fixed top-0 w-full bg-gray-200 border-b border-gray-400 h-16 flex items-center px-6'>
			<ul>
				<li>
					<Button className='px-2' onClick={() => signOut()}>
						Log out
					</Button>
				</li>
			</ul>
		</div>
	);
}
