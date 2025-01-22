export type Task = {
  id: number;
  task: string;
  project_id: number;
  task_id: number | null;
  subs: Array<Task>;
};
