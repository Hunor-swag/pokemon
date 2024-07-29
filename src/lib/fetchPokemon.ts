import { PokemonListResponse } from "@/types/typings";

// these are 3 functions that will fetch the pokemon list, the pokemon types and the catched pokemon

export const fetchAllPokemon = async () => {
	let url = "https://pokeapi.co/api/v2/pokemon?limit=10000";

	const res = await fetch(url);
	const data: PokemonListResponse = await res.json();

	const orderedData = data;
	orderedData.results = orderedData.results.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return data;
};

export const fetchPokeTypes = async () => {
	let url = "https://pokeapi.co/api/v2/type?limit=100";

	const res = await fetch(url);
	const data = await res.json();

	return data;
};

export const fetchCatchedPokemon = async (user_id: number) => {
	const res = await fetch(`${process.env.API_URL}/get-catched`, {
		method: "POST",
		cache: "no-cache",
		body: JSON.stringify({
			user_id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await res.json();

	return data;
};
