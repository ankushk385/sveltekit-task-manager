<script>
  import { goto } from "$app/navigation";

  let raw = "";
  let title = "";
  let description = "";

  async function save() {
    const token = localStorage.getItem("token");

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rawInput: raw, title, description }),
    });

    goto("/dashboard");
  }
</script>

<h1>Create Task</h1>

<form
  on:submit|preventDefault={save}
  style="max-width:350px; display:flex; flex-direction:column; gap:8px;"
>
  <input bind:value={raw} placeholder="Natural language input" required />
  <input bind:value={title} placeholder="Title" required />
  <textarea bind:value={description} placeholder="Description" rows="4"
  ></textarea>
  <button type="submit">Save</button>
</form>
