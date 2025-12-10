<script>
  import { onMount } from "svelte";
  import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";

  Chart.register(ArcElement, Tooltip, Legend, PieController);

  let tasks = [];
  let today = new Date();
  let pieChart;

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

  async function loadData() {
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
  }

  onMount(async () => {
    await loadData();

    const ctx = document.getElementById("pieChart");

    pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Completed", "Pending", "In Progress"],
        datasets: [
          {
            label: "Task Status",
            data: [totals.completed, totals.pending, totals.inProgress],
            backgroundColor: ["#4ade80", "#fbbf24", "#60a5fa"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: { legend: { position: "bottom" } },
      },
    });
  });
</script>

<h2>Task Status Breakdown</h2>

<div style="width: 350px; height: 350px;">
  <canvas id="pieChart"></canvas>
</div>

<p>
  <strong>Total Time Today:</strong>
  {Math.floor(totals.time / 1000 / 60)} mins
</p>
<p><strong>Completed Tasks:</strong> {totals.completed}</p>
<p><strong>Pending:</strong> {totals.pending}</p>
<p><strong>In Progress:</strong> {totals.inProgress}</p>
