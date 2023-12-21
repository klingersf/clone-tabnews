import health from "models/health.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionValue = await health.dbVersion;
  const databaseMaxConnectionsValue = await health.dbMaxConnections;
  const databaseOpenedConnectionsValue = await health.dbOpenedConnections

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
