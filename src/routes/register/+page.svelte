<script>
  import { goto } from "$app/navigation";

  let username = "";
  let email = "";
  let password = "";
  let error = "";
  let success = "";
  let msg;
  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    console.log(data);
    msg = data.error || "Registration successful!";

    if (data.success) {
      setTimeout(() => {
        goto("/login");
      });
    }
  }
</script>

<div class="container">
  <h2>Register</h2>

  <form on:submit={handleRegister}>
    <input type="text" placeholder="Username" bind:value={username} />

    <input type="email" placeholder="Email" bind:value={email} />

    <input type="password" placeholder="Password" bind:value={password} />

    <button type="submit">Create Account</button>
  </form>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}
</div>

<style>
  .container {
    max-width: 400px;
    margin: 40px auto;
    padding: 16px;
    background: #fafafa;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    font-family: system-ui;
  }
  input,
  button {
    width: 100%;
    padding: 10px;
    margin: 6px 0;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
  button {
    background: #0078ff;
    color: white;
    cursor: pointer;
  }
  .error {
    color: #d8000c;
    margin-top: 6px;
  }
  .success {
    color: #007a2e;
    margin-top: 6px;
  }
</style>
