"use client";

import { capitalizeFirstLetter } from "@/lib/strings";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonTypeSelector({
	pokeTypes,
	catchedPokemon,
}: {
	pokeTypes: {
		count: number;
		next: string | null;
		previous: string | null;
		results: [{ name: string; url: string }];
	};
	catchedPokemon: any;
}) {
	const [selectedType, setSelectedType] = useState<string>("normal");
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemonListLoading, setPokemonListLoading] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedType(event.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			setPokemonListLoading(true);
			const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
			const data = await res.json();
			setPokemonList(data.pokemon);
			setPokemonListLoading(false);
		};

		if (selectedType && selectedType !== "") {
			fetchData();
		}
	}, [selectedType]);

	function isPokemonInList(name: string) {
		return catchedPokemon.some(
			(poke: any) => poke.poke_name.toLowerCase() === name.toLowerCase()
		);
	}

	return (
		<div className='w-full'>
			<div className='flex space-x-4'>
				<h1 className='text-lg font-semibold'>Pokemon types:</h1>
				<select
					className='border border-gray-400 rounded-md'
					value={selectedType}
					onChange={handleChange}
				>
					{pokeTypes.results.map((type: { name: string; url: string }) => (
						<option value={type.name} key={type.name}>
							{capitalizeFirstLetter(type.name)}
						</option>
					))}
				</select>
			</div>
			{pokemonListLoading && <div>Loading...</div>}
			{!pokemonListLoading && selectedType && selectedType !== "" && (
				<div className='p-1'>
					<ul>
						{pokemonList.length > 0 &&
							pokemonList.map(
								(pokemon: { pokemon: { name: string; url: string } }) => (
									<li
										key={pokemon.pokemon.name}
										className={`${
											isPokemonInList(pokemon.pokemon.name) &&
											"border border-green-500"
										}`}
									>
										<Link href={`/dashboard/profile/${pokemon.pokemon.name}`}>
											{capitalizeFirstLetter(pokemon.pokemon.name)}
										</Link>
									</li>
								)
							)}
					</ul>
				</div>
			)}
		</div>
	);
}
