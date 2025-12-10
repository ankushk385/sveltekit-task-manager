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

<div class="grid gap-2 mb-2">
  <input
    class="form-control"
    bind:value={newTask}
    placeholder="Quick add task..."
  />
  <button class="btn btn-primary btn-sm add-btn" on:click={addTask}>Add</button>
</div>

<hr />

{#each tasks as t}
  <article class="card mb-2 p-2">
    <h3>{t.title}</h3>
    <p>Status: {t.status}</p>
    <p>Total Time: {Math.floor(t.totalTime / 1000 / 60)} mins</p>
    <a href={"/tasks/" + t._id}>View / Edit</a>
    <div class="flex gap-1 mt-1">
      <button on:click={() => start(t._id)}>Start</button>
      <button on:click={() => stop(t._id)}>Stop</button>
    </div>
  </article>
{/each}
