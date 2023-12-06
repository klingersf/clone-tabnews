import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query(`SHOW server_version;`);
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const dataOfDbConnections = await database.query(`
  SELECT max_conn, used, res_for_super, max_conn - used - res_for_super AS res_for_normal
  FROM 
    (SELECT count(*) AS used FROM pg_stat_activity) AS t1,  
    (SELECT setting::int AS res_for_super FROM pg_settings WHERE name = 'superuser_reserved_connections') AS t2,  
    (SELECT setting::int AS max_conn FROM pg_settings WHERE name = 'max_connections') AS t3
`);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: dataOfDbConnections.rows[0].max_conn,
        opened_connections: Number(dataOfDbConnections.rows[0].used),
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
