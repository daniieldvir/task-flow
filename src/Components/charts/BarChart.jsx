import { Bar } from "react-chartjs-2";

export default function BarChart({ labels, datasets, title }) {
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: 500, height: 300 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
