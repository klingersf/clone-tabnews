import db from "infra/dbase.js";
import database from "infra/database.js";

//const client = db.clientDb;

async function databaseVersion() {
  const clientdb = await db.clientDb();
  try {
    const result = await clientdb.query(`SHOW server_version;`);
    console.log(result.rows[0].server_version);

    return result.rows[0].server_version;
  } catch (err) {
    console.log(err);
  } finally {
    await clientdb.end();
  }

  return test;
}

async function databaseMaxConnections() {
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue = Number(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  return databaseMaxConnectionsValue;
}

async function databaseActiveConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue = Number(
    databaseOpenedConnectionsResult.rows[0].count,
  );

  return databaseOpenedConnectionsValue;
}

//
//async function mainDB(query) {
// try {
//   const result = await query;
// return result;
//} catch (err) {
//  console.log(err);
// } finally {
//   await prisma.$disconnect();
// }
//}

export default {
  // dbVersion: newDbVersion,
  dbVersion: databaseVersion,
  dbMaxConnections: databaseMaxConnections,
  dbOpenedConnections: databaseActiveConnections,
};
