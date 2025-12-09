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

<input
  bind:value={raw}
  placeholder="Natural language input"
  style="width:300px; padding:6px;"
/>
<input
  bind:value={title}
  placeholder="Title"
  style="display:block; margin-top:8px; padding:6px;"
/>
<textarea
  bind:value={description}
  placeholder="Description"
  style="width:300px; height:80px; margin-top:8px;"
></textarea>

<button on:click={save} style="margin-top:10px;">Save</button>
