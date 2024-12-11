import Fastify from "fastify";
import sqlite3 from "sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { projects, tasks } from "./schema";
import { eq, lt, gte, ne } from "drizzle-orm";

async function main() {
  const db = drizzle({
    connection: { source: process.env.DB_FILE_NAME!, fileMustExist: true },
  });

  const fastify = Fastify({
    logger: true,
  });

  fastify.post("/", async (request, reply) => {
    const value = request.body;
    if (typeof value !== "object") {
      reply.code(400).send();
      return;
    }
    if (value === null) {
      reply.code(400);
      return;
    }
    if (!("name" in value)) {
      reply.code(400);
      return;
    }
    if (typeof value.name !== "string") {
      reply.code(400);
      return;
    }
    let id = Date.now();
    let body = { id: id, name: value.name };
    await db.insert(projects).values(body);
    reply.code(200).send(id);
  });

  fastify.get("/projects", async (request, reply) => {
    const temp = await db.select().from(projects);
    reply.code(200).send(temp);
  });

  fastify.get("/tasks/:id", async (request, reply) => {
    const value = request.params;

    if (typeof value !== "object") {
      console.log("type of value is not object, but instead - " + typeof value);
      reply.code(400).send();
      return;
    }
    if (value === null) {
      console.log("type of value is null");
      reply.code(400);
      return;
    }
    if (!("id" in value)) {
      console.log("no project_id in value");
      reply.code(400);
      return;
    }
    if (typeof Number(value.id) !== "number") {
      console.log("project_id not number, but - " + typeof value.id);
      reply.code(400);
      return;
    }

    const temp = await db
      .select()
      .from(tasks)
      .where(eq(tasks.project_id, Number(value.id)));

    reply.code(200).send(temp);
  });

  fastify.get("/projects/:id", async (request, reply) => {
    const value = request.params;

    if (typeof value !== "object") {
      console.log("type of value is not object, but instead - " + typeof value);
      reply.code(400).send();
      return;
    }
    if (value === null) {
      console.log("type of value is null");
      reply.code(400);
      return;
    }
    if (!("id" in value)) {
      console.log("no project_id in value");
      reply.code(400);
      return;
    }
    if (typeof Number(value.id) !== "number") {
      console.log("project_id not number, but - " + typeof value.id);
      reply.code(400);
      return;
    }

    const temp = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(value.id)));

    reply.code(200).send(temp);
  });

  fastify.post("/tasks", async (request, reply) => {
    const value = request.body;
    if (typeof value !== "object") {
      console.log("type of value is not object, but instead - " + typeof value);
      reply.code(400).send();
      return;
    }
    if (value === null) {
      console.log("type of value is null");
      reply.code(400);
      return;
    }
    if (!("task" in value)) {
      console.log("no task in value");
      reply.code(400);
      return;
    }
    if (!("project_id" in value)) {
      console.log("no project_id in value");
      reply.code(400);
      return;
    }
    if (typeof value.task !== "string") {
      console.log("task not string, but - " + typeof value.task);
      reply.code(400);
      return;
    }
    if (typeof value.project_id !== "number") {
      console.log("project_id not number, but - " + typeof value.project_id);
      reply.code(400);
      return;
    }
    let id = Date.now();
    const body = {
      id: id,
      task: value.task,
      project_id: value.project_id,
      check: 0,
    };
    await db.insert(tasks).values(body);
    reply.code(200).send(id);
  });

  const start = async () => {
    await fastify.listen({ port: 3000 });
  };

  start();
}
main();
