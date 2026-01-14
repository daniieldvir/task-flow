import { Pie } from "react-chartjs-2";

export default function PicChart({ data }) {
  const statusCounts =
    data?.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {}) || {};

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "# of Tasks",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tasks by Status",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: 500, height: 300 }}>
      <Pie key={JSON.stringify(chartData)} data={chartData} options={options} />
    </div>
  );
}
