import {
	fetchAllPokemon,
	fetchCatchedPokemon,
	fetchPokeTypes,
} from "@/lib/fetchPokemon";
import React from "react";
import PokemonTypeSelector from "./PokemonTypeSelector";
import PokemonSearch from "./PokemonSearch";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

// this is the main page in the dashboard, that consists of the pokemon search and the pokemon type selector

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	const pokemon = await fetchAllPokemon();

	const pokeTypes = await fetchPokeTypes();

	const catchedPokemon = await fetchCatchedPokemon(session.user.id);

	return (
		<div className='p-4 flex space-x-4 w-full'>
			{/* <div>
				<h1 className='text-lg font-semibold'>Your catched pokemons:</h1>
				<div>{}</div>
			</div> */}
			<PokemonTypeSelector
				pokeTypes={pokeTypes}
				catchedPokemon={catchedPokemon.data}
			/>
			<PokemonSearch pokemon={pokemon} catchedPokemon={catchedPokemon.data} />
		</div>
	);
}
