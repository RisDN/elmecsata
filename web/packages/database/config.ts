import { ConnectionOptions } from 'mysql2';

export const config: ConnectionOptions = {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
};

export const connectionString = `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
