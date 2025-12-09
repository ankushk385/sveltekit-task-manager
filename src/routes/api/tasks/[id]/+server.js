import { json } from "@sveltejs/kit";
import { getTask, updateTask, deleteTask } from "$lib/taskModel.js";
import { verifyJwt } from "$lib/jwt.js";

export async function GET({ params, request }) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const user = verifyJwt(token);
  if (!user) return json({ error: "Unauthorized" }, { status: 401 });

  const task = await getTask(params.id, user.id);
  return json(task);
}

export async function PUT({ params, request }) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const user = verifyJwt(token);
  if (!user) return json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  await updateTask(params.id, user.id, data);

  return json({ success: true });
}

export async function DELETE({ params, request }) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const user = verifyJwt(token);
  if (!user) return json({ error: "Unauthorized" }, { status: 401 });

  await deleteTask(params.id, user.id);
  return json({ success: true });
}
