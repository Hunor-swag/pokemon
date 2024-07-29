import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { poke_name, user_id } = await req.json();

		console.log(poke_name, user_id);

		const queryString = `DELETE FROM catched_pokemons WHERE user_id = ? AND poke_name = ?`;

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
