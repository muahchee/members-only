import { Pool } from "pg";
import { argv } from "node:process";
import { getEnv } from "../helpers/getEnv.js";

const { connectionString } = getEnv(argv);

export const pool = new Pool({
  connectionString: connectionString,
});
