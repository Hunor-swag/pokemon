import Image from "next/image";
import Link from "next/link";

// this is a really basic homepage, from which the user can navigate to the login or register page

export default function Home() {
	return (
		<main className='flex flex-col justify-center items-center mt-60'>
			<h1 className='mb-6 text-xl font-semibold'>
				Welcome to the Pokemon homepage!
			</h1>
			<div className='flex flex-col'>
				<Link
					className='border border-gray-200 px-2 py-1  text-center rounded-md'
					href='/auth/login'
				>
					Login
				</Link>
				<span className='text-center my-1'>or</span>
				<Link
					className='border border-gray-200 px-2 py-1 text-center rounded-md'
					href='/auth/register'
				>
					Register
				</Link>
			</div>
		</main>
	);
}
