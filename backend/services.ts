import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { projects, tasks } from "./schema";
import { eq, lt, and, gte, ne, isNull, is, inArray } from "drizzle-orm";
import { Task } from "./models";

const db = drizzle({
  connection: { source: process.env.DB_FILE_NAME!, fileMustExist: true },
});

async function GettingTasks(project_id: number): Promise<Array<Task>> {
  const AllTasks = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.project_id, project_id), isNull(tasks.task_id)));
  async function GetTasks(task: Array<Task>): Promise<Array<Task>> {
    const arr: Array<Task> = await Promise.all(
      task.map(async (e) => {
        const Tasks = await db
          .select()
          .from(tasks)
          .where(eq(tasks.task_id, e.id));

        const subsBliat = Tasks.map((e2) => {
          return { ...e2, subs: [] };
        });
        e.subs = subsBliat;
        GetTasks(subsBliat);
        return e;
      })
    );

    return arr;
  }
  const arr = AllTasks.map((e) => {
    return { ...e, subs: [] };
  });
  return GetTasks(arr);
}

export default GettingTasks;
