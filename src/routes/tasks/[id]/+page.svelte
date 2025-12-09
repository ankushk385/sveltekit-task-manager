<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let task = null;
  let id = $page.params.id;

  async function load() {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    task = await res.json();
  }

  async function save() {
    const token = localStorage.getItem("token");
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: task.status,
      }),
    });
    goto("/dashboard");
  }

  async function del() {
    const token = localStorage.getItem("token");
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    goto("/dashboard");
  }

  onMount(load);
</script>

{#if task}
  <h1>Edit Task</h1>

  <input bind:value={task.title} style="padding:8px; width:300px;" />
  <textarea
    bind:value={task.description}
    style="display:block; width:300px; height:80px;"
  ></textarea>

  <select bind:value={task.status}>
    <option>Pending</option>
    <option>In Progress</option>
    <option>Completed</option>
  </select>

  <br /><br />

  <button on:click={save}>Save</button>
  <button on:click={del} style="margin-left:10px; color:red;">Delete</button>
{/if}
