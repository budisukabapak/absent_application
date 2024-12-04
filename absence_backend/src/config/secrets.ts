import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    db: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    },
    env: string;
    secret: string;
}

export const config: Config = {
    port: parseInt(process.env.PORT || "3000"),
    db: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        database: process.env.DB_NAME || "database",
        user: process.env.DB_USERNAME || "user",
        password: process.env.DB_PASSWORD || "password",
    },
    env: process.env.NODE_ENV || "development",
    secret: process.env.SECRET || "secret",
}