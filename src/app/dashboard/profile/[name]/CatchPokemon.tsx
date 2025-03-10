"use client";

import Button from "@/components/button";
import { displayToast } from "@/lib/toasts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CatchPokemon(pokemon: any) {
	const session = useSession(); // get the user session

	const user_id = session.data?.user?.id as string;

	const router = useRouter();

	// the catchPokemon function will be called once the green button is clicked. It will send a POST request to the /api/catch endpoint to add the proper record to the database
	const catchPokemon = () => {
		const catchIt = async () => {
			if (!session) {
				displayToast("Failed to fetch user information", "error");
				return;
			}

			const res = await fetch(`/api/catch`, {
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
				displayToast("success", "Pokemon caught successfully");
			} else {
				displayToast("error", "Failed to catch pokemon: " + data.message);
			}
		};

		catchIt();
		router.refresh();
	};

	return (
		<Button type='button' className='bg-green-500' onClick={catchPokemon}>
			Catch!
		</Button>
	);
}
