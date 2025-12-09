<script>
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let error = "";
  let msg;
  async function loginUser() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      msg = data.error;
    }

    // Redirect
    // window.location.href = "/dashboard";
  }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={loginUser}>
  <input placeholder="email" bind:value={email} required />
  <input
    type="password"
    placeholder="Password"
    bind:value={password}
    required
  />
  <button>Login</button>

  {#if error}
    <p style="color:red">{error}</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 10px;
    margin-top: 20px;
  }
</style>
