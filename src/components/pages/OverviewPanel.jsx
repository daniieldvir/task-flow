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

import { useOverviewData } from "../../hooks/useOverviewData";
import PieChart from "../charts/PieChart";
import ProgressBar from "../charts/ProgressBar";
import Card from "../UI/Cards/Card";
import StatCard from "../UI/Cards/StatCard";
import styles from "./OverviewPanel.module.scss";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title,
);

export default function OverviewPanel() {
  const { tasks, alerts, incidents, isLoading, error } = useOverviewData();

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
    <div className={styles.overviewPanel}>
      <header className={styles.summaryInfo}>
        {cards.map((c, i) => (
          <Card key={i} className={styles.summary}>
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
      </header>
      <div className={styles.pies}>
        <Card className={styles.chartsInfo}>
          <p>Tasks by status</p>
          <PieChart data={tasks} value="status" />
        </Card>
        <Card className={styles.chartsInfo}>
          <p>Incidents by priority</p>
          <PieChart
            data={incidents}
            value="priority"
            colors={["rgb(57, 159, 254)", "orange", "#ff0000"]}
            borderColors={["rgb(57, 159, 254)", "orange", "#ff0000"]}
          />
        </Card>
      </div>
    </div>
  );
}
