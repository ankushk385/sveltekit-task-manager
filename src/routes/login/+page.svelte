<script>
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let msg = "";

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
      msg = data.error || "Login failed";
    }
  }
</script>

<main class="auth-box">
  <h1>Login</h1>

  <form on:submit|preventDefault={loginUser}>
    <label>
      Email
      <input
        type="email"
        bind:value={email}
        placeholder="your@email.com"
        required
      />
    </label>

    <label>
      Password
      <input
        type="password"
        bind:value={password}
        placeholder="••••••••"
        required
      />
    </label>

    <button type="submit">Login</button>
    <p>
      Don’t have an account?
      <a href="/register">Register</a>
    </p>

    {#if msg}
      <p class="contrast" style="color: var(--pico-del-color);">{msg}</p>
    {/if}
  </form>
</main>
