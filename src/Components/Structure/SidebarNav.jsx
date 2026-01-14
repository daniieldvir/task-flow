import { useState } from "react";
import Button from "../UI/Button";
import styles from "./Sidebar.module.scss";

export default function SidebarNav({ onChangeView }) {
  const [activeView, setActiveView] = useState("overview");

  const nav = [
    { name: "overview", id: "1" },
    { name: "tasks", id: "2" },
    { name: "alerts", id: "3" },
    { name: "incidents", id: "4" },
  ];

  const handleClick = (name) => {
    setActiveView(name);
    onChangeView?.(name);
  };

  return (
    <nav className={styles.sidebarNav}>
      {nav.map((n) => (
        <div className={styles.navItem} key={n.id}>
          <Button
            className={styles.navItem}
            label={n.name}
            isActive={activeView === n.name}
            onClick={() => handleClick(n.name)}
          />
        </div>
      ))}
    </nav>
  );
}
