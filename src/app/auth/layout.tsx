import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex justify-center mt-40 mx-auto'>
			<div>{children}</div>
		</div>
	);
}
