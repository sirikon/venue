import { Client } from "pg"
const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres"
})
const connection = client.connect()

export const executeSql = async (query: string, args?: string[]) => {
  // Cypress.log({ name: "db.execute", message: query })
  await connection
  await client.query(query, args)
  // Cypress.log({ name: "db.execute", message: "done" })
  return null;
}
