// declare a type for the fetched pokemon list

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<{ name: string; url: string }>;
}
