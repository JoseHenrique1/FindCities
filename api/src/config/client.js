import pg from "pg";
const { Client } = pg

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE 

export const client = new Client({
  user,
  password,
  host,
  port,
  database
});
