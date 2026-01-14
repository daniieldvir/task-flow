import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import ProgressBar from "../charts/ProgressBar";
import Card from "../UI/Card";
import StatCard from "../UI/StatCard";
import { useData } from "../utils/DataContext";
import styles from "./OverviewPanel.module.scss";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title
);

export default function OverviewPanel() {
  const { tasks, alerts, incidents } = useData();

  const countBy = (items, key, value) =>
    items.filter((item) => item[key] === value).length;

  const cards = [
    {
      icon: <AssignmentIcon />,
      label: "Tasks",
      total: tasks.length,
      progress: [
        {
          value: countBy(tasks, "status", "Open"),
          tooltip: "Open tasks",
          color: "rgb(57, 159, 254)",
        },
        {
          value: countBy(tasks, "status", "Completed"),
          tooltip: "Completed tasks",
          color: "green",
        },
      ],
    },
    {
      icon: <NotificationsIcon />,
      label: "Alerts",
      total: alerts.length,
      progress: [
        {
          value: countBy(alerts, "severity", "Critical"),
          tooltip: "Critical alerts",
          color: "red",
        },
        {
          value: countBy(alerts, "severity", "Warning"),
          tooltip: "Warning alerts",
          color: "orange",
        },
      ],
    },
    {
      icon: <ReportProblemIcon />,
      label: "Incidents",
      total: incidents.length,
      progress: [
        {
          value: countBy(incidents, "severity", "Critical"),
          tooltip: "Critical incidents",
          color: "red",
        },
        {
          value: countBy(incidents, "severity", "Warning"),
          tooltip: "Warning incidents",
          color: "orange",
        },
      ],
    },
  ];

  return (
    <div className={styles.info}>
      {cards.map((c, i) => (
        <Card key={i} className={styles.taskSummary}>
          <StatCard icon={c.icon} label={c.label} value={c.total} />
          <ProgressBar
            val1={c.progress[0].value}
            val2={c.progress[1].value}
            tooltipText1={c.progress[0].tooltip}
            tooltipText2={c.progress[1].tooltip}
            colors={{ val1: c.progress[0].color, val2: c.progress[1].color }}
          />
        </Card>
      ))}
    </div>
  );
}
