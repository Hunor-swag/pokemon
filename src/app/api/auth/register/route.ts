import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import * as bcrypt from "bcrypt";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
	try {
		const { email, password, repeat_password, firstname, lastname } =
			await req.json();

		console.log(email, password, repeat_password, firstname, lastname);

		if (password.length < 8) {
			return new NextResponse(
				JSON.stringify({
					message: `Password is too short`,
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		if (password !== repeat_password) {
			return new NextResponse(
				JSON.stringify({ message: "Passwords do not match" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// Check if the email is already in use

		const existingUserRes = await fetch(
			`${process.env.API_URL}/auth/users/${email}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const existingUser = await existingUserRes.json();

		console.log(existingUser);
		if (existingUser.data) {
			return new NextResponse(
				JSON.stringify({ message: "Email already exists" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const body = {
			data: {
				user_payload: {
					email,
					password: hashedPassword,
					firstname,
					lastname,
				},
			},
		};

		const queryString = `INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)`;

		const res = await query("pokemon", queryString, [
			email,
			hashedPassword,
			firstname,
			lastname,
		]);

		return new NextResponse(JSON.stringify({ message: "Sign up successful" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
