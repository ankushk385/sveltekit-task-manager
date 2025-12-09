<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let user = null;

  onMount(() => {
    const token = localStorage.getItem("token");
    if (!token) goto("/login");

    // decode JWT just to get email (optional)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      user = payload;
    } catch (e) {
      goto("/login");
    }
  });

  function logout() {
    localStorage.removeItem("token");
    goto("/login");
  }
</script>

<nav style="display:flex; gap:20px; padding:10px; background:#eee;">
  <a href="/dashboard">Dashboard</a>
  <a href="/tasks/create">Create Task</a>
  <a href="/summary">Summary</a>

  <div style="margin-left:auto;">
    {#if user}
      <span>{user.email}</span>
      <button on:click={logout}>Logout</button>
    {/if}
  </div>
</nav>

<slot />
