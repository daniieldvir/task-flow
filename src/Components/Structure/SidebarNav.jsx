import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import styles from "./Sidebar.module.scss";

export default function SidebarNav() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");

  const nav = [
    { name: "overview", path: "/" },
    { name: "tasks", path: "/tasks" },
    { name: "alerts", path: "/alerts" },
    { name: "incidents", path: "/incidents" },
  ];

  const handleClick = (name, path) => {
    setActiveView(name);
    navigate(path);
  };

  return (
    <nav className={styles.sidebarNav}>
      {nav.map((n) => (
        <div className={styles.navItem} key={n.id}>
          <Button
            className={styles.navItem}
            label={n.name}
            isActive={activeView === n.name}
            onClick={() => handleClick(n.name, n.path)}
          />
        </div>
      ))}
    </nav>
  );
}
