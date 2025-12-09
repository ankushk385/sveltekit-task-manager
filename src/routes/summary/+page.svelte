<script>
  import { onMount } from "svelte";

  let tasks = [];
  let today = new Date();
  let totals = {
    time: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  };

  function isToday(dateString) {
    let d = new Date(dateString);
    return d.toDateString() === today.toDateString();
  }

  onMount(async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    tasks = await res.json();

    tasks.forEach((t) => {
      if (isToday(t.createdAt)) {
        totals.time += t.totalTime;
        if (t.status === "Completed") totals.completed++;
        if (t.status === "Pending") totals.pending++;
        if (t.status === "In Progress") totals.inProgress++;
      }
    });
  });
</script>

<h1>Daily Summary</h1>

<p>
  <strong>Total Time Today:</strong>
  {Math.floor(totals.time / 1000 / 60)} mins
</p>
<p><strong>Completed Tasks:</strong> {totals.completed}</p>
<p><strong>Pending:</strong> {totals.pending}</p>
<p><strong>In Progress:</strong> {totals.inProgress}</p>
