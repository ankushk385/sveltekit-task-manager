import { json } from "@sveltejs/kit";
import { getTasks, createTask } from "$lib/taskModel.js";
import { verifyJwt } from "$lib/jwt.js";

export async function GET({ request }) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const user = verifyJwt(token);

  if (!user) return json({ error: "Unauthorized" }, { status: 401 });

  const tasks = await getTasks(user.id);
  return json(tasks);
}

export async function POST({ request }) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const user = verifyJwt(token);

  if (!user) return json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();

  const task = {
    userId: user.id,
    rawInput: data.rawInput || "",
    title: data.title || "",
    description: data.description || "",
    status: "Pending",
    timeLogs: [],
    totalTime: 0,
  };

  await createTask(task);

  return json({ success: true });
}
