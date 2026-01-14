import { Pie } from "react-chartjs-2";
export default function PieChart({ data, value, colors, borderColors }) {
  const counts =
    data?.reduce((acc, d) => {
      const key = d[value];
      if (key !== undefined) {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {}) || {};

  const defaultColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(153, 102, 255, 0.5)",
  ];

  const defaultBorderColors = defaultColors.map((c) => c.replace("0.5", "1"));

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: `# of ${value}`,
        data: Object.values(counts),
        backgroundColor: colors || defaultColors,
        borderColor: borderColors || defaultBorderColors,
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
