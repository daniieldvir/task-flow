import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Buttons/Button";
import styles from "./SidebarNav.module.scss";

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
        <Button
          key={n.name}
          className={styles.navItem}
          label={n.name}
          isActive={activeView === n.name}
          onClick={() => handleClick(n.name, n.path)}
        />
      ))}
    </nav>
  );
}
