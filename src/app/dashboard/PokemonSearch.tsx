"use client";

import { capitalizeFirstLetter } from "@/lib/strings";
import { PokemonListResponse } from "@/types/typings";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonSearch({
	pokemon,
	catchedPokemon,
}: {
	pokemon: PokemonListResponse;
	catchedPokemon: any;
}) {
	const [searchTerm, setSearchTerm] = useState<string>(""); // this is a state that will hold the search term
	const [filteredPokemon, setFilteredPokemon] =
		useState<PokemonListResponse>(pokemon); // this is a state that tracks the filtered pokemon

	const [onlyCatched, setOnlyCatched] = useState<boolean>(false); // this is a state that tracks if the user wants to search only the catched pokemon

	// this useEffect will run every time the searchTerm or onlyCatched state changes and will filter the pokemon list based on the search term and if the user wants to search only the catched pokemon

	useEffect(() => {
		if (onlyCatched) {
			const filtered = pokemon.results.filter((poke) => {
				return isPokemonInList(poke.name) && poke.name.includes(searchTerm);
			});
			setFilteredPokemon({ ...pokemon, results: filtered });
		} else {
			if (searchTerm === "") {
				setFilteredPokemon(pokemon);
				return;
			}

			const filtered = pokemon.results.filter((poke) => {
				return poke.name.includes(searchTerm);
			});

			setFilteredPokemon({ ...pokemon, results: filtered });
		}
	}, [searchTerm, onlyCatched]);

	// this function will check if a pokemon is in the catched pokemon list

	function isPokemonInList(name: string) {
		return catchedPokemon.some(
			(poke: any) => poke.poke_name.toLowerCase() === name.toLowerCase()
		);
	}

	return (
		<div className='border-l border-gray-200 px-2 w-full space-y-6'>
			{/* top container with the input field and the checkbox  */}
			<div className='flex items-center space-x-2'>
				<input
					name='onlyCatched'
					type='checkbox'
					checked={onlyCatched}
					onChange={(e) => setOnlyCatched(!onlyCatched)}
				/>
				<label htmlFor='onlyCatched' className='text-xs'>
					Search only catched pokemon
				</label>
			</div>
			<input
				value={searchTerm}
				onChange={(event) => setSearchTerm(event?.target.value)}
				placeholder='Search pokemon by name'
				className='border border-gray-200 focus:border-gray-400 px-2 py-1 rounded-md w-full'
			/>
			{/* the pokemon and the filtered pokemon are displayed in this unordered list */}
			<ul>
				{filteredPokemon.results.map((poke) => (
					<li
						key={poke.name}
						className={`${
							isPokemonInList(poke.name) && "border border-green-500"
						}`}
					>
						<Link href={`/dashboard/profile/${poke.name}`}>
							{capitalizeFirstLetter(poke.name)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
