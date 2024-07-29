import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const session = await getServerSession(authOptions);

		console.log("session: ", session);

		const { poke_name, user_id } = await req.json();

		console.log(poke_name, user_id);

		const queryString = `INSERT INTO catched_pokemons (user_id, poke_name) VALUES (?, ?)`;

		await query("pokemon", queryString, [user_id, poke_name]);

		return new NextResponse(
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
