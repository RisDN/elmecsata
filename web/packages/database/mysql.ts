import { connectionString } from './config';

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const client = await mysql.createConnection({
    uri: connectionString,
});

await client.connect();

export const db = drizzle({ client: client });
