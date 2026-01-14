import styles from "./Sidebar.module.scss";

import Filters from "../UI/Filters";
import SidebarNav from "./SidebarNav";

export default function Sidebar({ onChangeView }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarTitle}>Navigation</div>
        <SidebarNav onChangeView={onChangeView} />
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
