import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { email: string } }
) {
	try {
		const { email } = params;

		const queryString = `SELECT * FROM users WHERE email = ?`;

		const res = await query("pokemon", queryString, [email]);

		const user = (res as RowDataPacket[])[0];

		if (!user) {
			return new NextResponse(
				JSON.stringify({ data: null, message: "User not found" }),
				{
					status: 404,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		return new NextResponse(
			JSON.stringify({ data: user, message: "User found successfully" }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ message: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
