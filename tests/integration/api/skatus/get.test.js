test("Retrieving current system status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/skatus");
  const responseBody = await response.json();
  const database = responseBody.dependencies.database;
  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();

  expect(response.status).toBe(200);
  expect(database).toBeDefined();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  expect(Object.keys(database)).toEqual([
    "version",
    "max_connections",
    "opened_connections",
  ]);

  expect(typeof database.max_connections).toBe("number");
  expect(database.max_connections).toBeGreaterThanOrEqual(1);
  expect(database.max_connections).toBe(100);

  expect(typeof database.opened_connections).toBe("number");
  expect(database.opened_connections).toBeGreaterThanOrEqual(1);
  expect(database.opened_connections).toBe(1);

  expect(typeof database.version).toBe("string");
  expect(database.version).toEqual("16.0");
});
