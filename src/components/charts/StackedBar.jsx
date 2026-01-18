import { Bar } from "react-chartjs-2";

export default function StackedBar({
  data,
  categoryKey,
  stackKey,
  stackValues = [],
}) {
  if (!data || data.length === 0) return null;

  const categories = [...new Set(data.map((item) => item[categoryKey]))];

  if (stackValues.length === 0) {
    stackValues = [...new Set(data.map((item) => item[stackKey]))];
  }

  const colors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
  ];

  const borderColors = colors.map((c) => c.replace("0.7", "1"));

  const datasets = stackValues.map((value, idx) => ({
    label: value,
    data: categories.map(
      (cat) =>
        data.filter(
          (item) => item[categoryKey] === cat && item[stackKey] === value,
        ).length,
    ),
    backgroundColor: colors[idx % colors.length],
    borderColor: borderColors[idx % borderColors.length],
    borderWidth: 1,
  }));

  const chartData = {
    labels: categories,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return (
    <div style={{ width: 500, height: 300 }}>
      <Bar key={JSON.stringify(chartData)} data={chartData} options={options} />
    </div>
  );
}
