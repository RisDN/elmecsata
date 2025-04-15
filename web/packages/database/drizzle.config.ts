import { connectionString } from './config';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'mysql',
    schema: './schema.ts',
    out: './migrations',
    dbCredentials: {
        url: connectionString || '',
    },
});
