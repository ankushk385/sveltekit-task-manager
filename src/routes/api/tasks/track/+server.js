import { json } from "@sveltejs/kit";
import { updateTask, getTask } from "$lib/taskModel.js";
import { verifyJwt } from "$lib/jwt.js";

export async function POST({ request }) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const user = verifyJwt(token);
  if (!user) return json({ error: "Unauthorized" }, { status: 401 });

  const { taskId, action } = await request.json();
  const task = await getTask(taskId, user.id);

  if (!task) return json({ error: "Not found" }, { status: 404 });

  if (action === "start") {
    task.timeLogs.push({
      start: Date.now(),
      end: null,
      duration: 0,
    });
  } else if (action === "stop") {
    let active = task.timeLogs.find((t) => t.end === null);
    if (active) {
      active.end = Date.now();
      active.duration = active.end - active.start;
      task.totalTime += active.duration;
    }
  }

  await updateTask(taskId, user.id, {
    timeLogs: task.timeLogs,
    totalTime: task.totalTime,
  });

  return json({ success: true });
}
