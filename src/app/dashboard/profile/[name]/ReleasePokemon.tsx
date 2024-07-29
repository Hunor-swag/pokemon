"use client";

import Button from "@/components/button";
import { displayToast } from "@/lib/toasts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ReleasePokemon(pokemon: any) {
	const session = useSession();

	const user_id = session.data?.user?.id as string;

	const router = useRouter();

	const releasePokemon = () => {
		const releaseIt = async () => {
			if (!session) {
				displayToast("Failed to fetch user information", "error");
				return;
			}

			const res = await fetch(`/api/release`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id,
					poke_name: pokemon.pokemon.name,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				displayToast("success", "Pokemon released successfully");
			} else {
				displayToast("error", "Failed to release pokemon: " + data.message);
			}
		};

		releaseIt();
		router.refresh();
	};

	return (
		<Button type='button' className='bg-red-500' onClick={releasePokemon}>
			Release!
		</Button>
	);
}
