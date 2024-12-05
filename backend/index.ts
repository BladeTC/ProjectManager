import Fastify from "fastify";
import sqlite3 from "sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const db = drizzle(process.env.DB_FILE_NAME!);

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  reply.code(200).send({ value: "world" });
});

const start = async () => {
  await fastify.listen({ port: 3000 });
};
start();
