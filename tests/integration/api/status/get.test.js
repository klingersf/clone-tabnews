test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );

  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  expect(typeof responseBody.dependencies.database.opened_connections).toBe(
    "number",
  );

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(typeof responseBody.dependencies.database.version).toBe("string");
  expect(responseBody.dependencies.database.version).toEqual("16.0");
});
