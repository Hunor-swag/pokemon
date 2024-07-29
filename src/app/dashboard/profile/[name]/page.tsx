import Button from "@/components/button";
import { capitalizeFirstLetter } from "@/lib/strings";
import React from "react";
import CatchPokemon from "./CatchPokemon";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { fetchCatchedPokemon } from "@/lib/fetchPokemon";
import ReleasePokemon from "./ReleasePokemon";

export default async function ProfilePage({
	params,
}: {
	params: { name: string };
}) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);

	const pokemon = await res.json();

	const session = await getServerSession(authOptions);

	const catchedPokemon = await fetchCatchedPokemon(session.user.id);

	return (
		<div className='p-4'>
			<div className='flex justify-between'>
				<h1 className='text-xl font-semibold'>
					{capitalizeFirstLetter(pokemon.name)}'s profile:
				</h1>
				<Link href='/dashboard'>Back</Link>
			</div>
			<div className='flex space-x-4'>
				<img src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} />
				<div>
					<ul className='text-lg'>
						<li>Name: {pokemon.name}</li>
						<li>Weight: {pokemon.weight}</li>
						<li>Height: {pokemon.height}</li>
						<li>
							Abilities:{" "}
							{pokemon.abilities.map((abil: any) => {
								return (
									!abil.is_hidden && (
										<span
											key={abil.ability.name}
											className='text-sm rounded-full py-1 px-2 mx-1 bg-blue-400 font-semibold whitespace-nowrap'
										>
											{abil.ability.name}
										</span>
									)
								);
							})}
						</li>
					</ul>
				</div>
			</div>
			{catchedPokemon.data.some(
				(pokemon: any) => pokemon.poke_name === params.name
			) ? (
				<ReleasePokemon pokemon={pokemon} />
			) : (
				<CatchPokemon pokemon={pokemon} />
			)}
		</div>
	);
}
