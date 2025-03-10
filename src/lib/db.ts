import { createConnection, Connection } from "mysql2/promise";

// Function to query the database

export const query = async (dbname: string, query: string, values: any[]) => {
	try {
		const connection: Connection = await createConnection({
			host: process.env.MYSQL_DATABASE_HOST || "localhost",
			port: process.env.MYSQL_DATABASE_PORT
				? parseInt(process.env.MYSQL_DATABASE_PORT)
				: 3306,
			user: process.env.MYSQL_DATABASE_USER || "root",
			password: process.env.MYSQL_DATABASE_PASSWORD || "",
			database: dbname,
		});

		const [results] = await connection.execute(query, values);
		connection.end();
		// console.log("Data successfully fetched:\n", results);
		return results;
	} catch (error) {
		console.error("Failed to fetch data from the database:\n\n\n", error);
		throw error;
	}
};
