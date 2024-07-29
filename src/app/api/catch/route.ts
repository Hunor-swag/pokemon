import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const session = await getServerSession(authOptions); // get the user session for the user_id

		const { poke_name, user_id } = await req.json(); // retrieve the necessary data from the request body

		const queryString = `INSERT INTO catched_pokemons (user_id, poke_name) VALUES (?, ?)`; // query to insert the data into the database

		await query("pokemon", queryString, [user_id, poke_name]); // run the query in the pokemon database

		return new NextResponse( // return a response to the client
			JSON.stringify({ message: "Pokemon added successfully" }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
