import Button from "../UI/Button";
import styles from "./Sidebar.module.scss";

export default function SidebarNav({ activeView, onChange }) {
  const nav = [
    {
      name: "overview",
      id: "1",
    },
    {
      name: "tasks",
      id: "2",
    },
    {
      name: "alerts",
      id: "3",
    },
  ];
  return (
    <nav className={styles.sidebarNav}>
      {nav.map((n) => (
        <div className={styles.navItem} key={n.id}>
          <Button className={styles.navItem} label={n.name} />
        </div>
      ))}
    </nav>
  );
}
