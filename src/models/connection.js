const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === "production";

let poolConfig;

if (isProduction) {
  
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
} else {
   
    if (process.env.DATABASE_URL) {
        poolConfig = {
            connectionString: process.env.DATABASE_URL,
            ssl: false
        };
    } else {
        poolConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            ssl: false
        };
    }
}

const pool = new Pool(poolConfig);

console.log(`DB Conectada en modo: ${isProduction ? "PRODUCCIÓN (Render)" : "LOCAL"}`);

module.exports = {
    query: (text, params) => pool.query(text, params)
};