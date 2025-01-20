import Fastify from "fastify";
import sqlite3 from "sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { projects, tasks } from "./schema";
import { eq, lt, and, gte, ne, isNull, is, inArray } from "drizzle-orm";
import { Task } from "./models";
import { isInt16Array } from "util/types";

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
      .where(
        and(eq(tasks.project_id, Number(value.id)), isNull(tasks.task_id))
      );
    let task_ids = temp.map((e) => e.id);
    const subs = await db
      .select()
      .from(tasks)
      .where(inArray(tasks.task_id, task_ids));

    const result: Array<Task> = temp.map((e) => ({
      subs: subs.filter((s) => s.task_id === e.id),
      ...e,
    }));

    reply.code(200).send(result satisfies Array<Task>);
  });

  fastify.get("/project/:id", async (request, reply) => {
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
    let subtask;
    let count;

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
    if (!("subtask_id" in value)) {
      console.log("no subtask_id in value");
      reply.code(400);
      return;
    }
    if (!(typeof value.subtask_id === "number" || value.subtask_id === null)) {
      console.log("subtask_id not number, but - " + typeof value.subtask_id);
      reply.code(400);
      return;
    }
    let id = Date.now();
    const body = {
      id: id,
      task: value.task,
      project_id: value.project_id,
      task_id: value.subtask_id,
      check: 0,
    };
    await db.insert(tasks).values(body);
    reply.code(200).send(id);
  });

  fastify.get("/task/:id", async (request, reply) => {
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
      .where(eq(tasks.id, Number(value.id)));

    reply.code(200).send(temp);
  });

  fastify.patch("/task", async (request, reply) => {
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
    if (typeof value.task !== "string") {
      console.log("task not string, but - " + typeof value.task);
      reply.code(400);
      return;
    }
    if (!("task_id" in value)) {
      console.log("no subtask_id in value");
      reply.code(400);
      return;
    }
    if (typeof value.task_id !== "number") {
      console.log("subtask_id not number, but - " + typeof value.task_id);
      return;
    }
    await db
      .update(tasks)
      .set({ task: value.task })
      .where(eq(tasks.id, Number(value.task_id)));

    reply.code(200).send();
  });

  fastify.delete("/task", async (request, reply) => {
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
    if (!("id" in value)) {
      console.log("no task in value");
      reply.code(400);
      return;
    }
    if (typeof value.id !== "number") {
      console.log("task not string, but - " + typeof value.id);
      reply.code(400);
      return;
    }
    if (!("check" in value)) {
      console.log("no subtask_id in value");
      reply.code(400);
      return;
    }
    if (typeof value.check !== "number") {
      console.log("subtask_id not number, but - " + typeof value.check);
      return;
    }
    if (value.check > 0) {
      await db.delete(tasks).where(eq(tasks.task_id, Number(value.id)));
    }
    await db.delete(tasks).where(eq(tasks.id, Number(value.id)));

    reply.code(200).send();
  });

  fastify.patch("/pr", async (request, reply) => {
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
    if (!("name" in value)) {
      console.log("no task in value");
      reply.code(400);
      return;
    }
    if (typeof value.name !== "string") {
      console.log("task not string, but - " + typeof value.name);
      reply.code(400);
      return;
    }
    if (!("id" in value)) {
      console.log("no subtask_id in value");
      reply.code(400);
      return;
    }
    if (typeof value.id !== "number") {
      console.log("subtask_id not number, but - " + typeof value.id);
      return;
    }
    await db
      .update(projects)
      .set({ name: value.name })
      .where(eq(projects.id, Number(value.id)));

    reply.code(200).send();
  });

  const start = async () => {
    await fastify.listen({ port: 3000 });
  };

  start();
}
main();
