#! /usr/bin/env node
import { Client } from "pg";
import dotenv from "dotenv";
import { argv } from "node:process";
import { getEnv } from "../helpers/getEnv.js";

dotenv.config();

const { connectionString } = getEnv(argv);

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255),
  member BOOLEAN,
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userid INTEGER REFERENCES users,
  title VARCHAR(255),
  timestamp DATE,
  text TEXT
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
