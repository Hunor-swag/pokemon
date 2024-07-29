import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { user_id } = await req.json(); // retrieve user_id from the request body

		const queryString = `SELECT * FROM catched_pokemons WHERE user_id = ?`; // query to fetch the catched pokemons

		const res = await query("pokemon", queryString, [user_id]); // run the query

		return new NextResponse( // return the response to the client
			JSON.stringify({
				success: true,
				data: res,
				message: "Catched pokemons retrieved successfully",
			}),
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
