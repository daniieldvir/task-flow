import { useNavigate } from "react-router-dom";
import Filters from "../UI/Filters";
import styles from "./Sidebar.module.scss";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarTitle}>Navigation</div>
        <SidebarNav onNavigate={navigate} />
      </div>
      <Filters title={"Filters"} actions={"k"}>
        <select>
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </Filters>
    </aside>
  );
}
