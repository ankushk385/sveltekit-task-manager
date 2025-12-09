<script>
  import { onMount } from "svelte";

  let tasks = [];
  let newTask = "";

  async function loadTasks() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    tasks = await res.json();
  }

  async function addTask() {
    if (!newTask.trim()) return;

    const token = localStorage.getItem("token");

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rawInput: newTask,
        title: newTask,
        description: "",
      }),
    });

    newTask = "";
    loadTasks();
  }

  async function start(id) {
    const token = localStorage.getItem("token");
    await fetch("/api/tasks/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId: id, action: "start" }),
    });
    loadTasks();
  }

  async function stop(id) {
    const token = localStorage.getItem("token");
    await fetch("/api/tasks/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId: id, action: "stop" }),
    });
    loadTasks();
  }

  onMount(loadTasks);
</script>

<h1>Dashboard</h1>

<input
  bind:value={newTask}
  placeholder="Quick add task..."
  style="padding:8px; width:250px;"
/>
<button on:click={addTask}>Add</button>

<hr />

{#each tasks as t}
  <div style="margin:10px 0; padding:10px; border:1px solid #ddd;">
    <h3>{t.title}</h3>
    <p>Status: {t.status}</p>

    <p>Total Time: {Math.floor(t.totalTime / 1000 / 60)} mins</p>

    <a href={"/tasks/" + t._id}>View / Edit</a>

    <div style="margin-top:10px;">
      <button on:click={() => start(t._id)}>Start</button>
      <button on:click={() => stop(t._id)}>Stop</button>
    </div>
  </div>
{/each}
