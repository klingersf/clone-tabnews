import { Client } from "pg";

async function connect() {
    const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  return client;
}

async function query(queryObject) {
  const cnx = await connect()
  try {
    const result = queryObject;
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await connect.end();
  }
}

export default {
  conn: connect,
  query: query,
};
