import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filters from "../UI/Filters/Filters";
import FilterSelect from "../UI/Filters/FilterSelect";
import { useData } from "../utils/DataContext";
import { FilterOptionsByPath } from "../utils/FilterOptions";
import styles from "./Sidebar.module.scss";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const [status, setStatus] = useState("All");
  const { setFilter } = useData();

  const navigate = useNavigate();
  const location = useLocation();
  const isOverview = location.pathname === "/";
  const currentOptions = FilterOptionsByPath[location.pathname] ?? ["All"];

  useEffect(() => {
    setStatus("All");
    setFilter("All");
  }, [location.pathname, setFilter]);

  function handleStatusChange(value) {
    setStatus(value);
    setFilter(value);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarTitle}>Navigation</div>
        <SidebarNav onNavigate={navigate} />
      </div>
      {!isOverview && (
        <Filters title={"Filters"} actions={"k"}>
          <FilterSelect
            options={currentOptions}
            value={status}
            onChange={handleStatusChange}
          />
        </Filters>
      )}
    </aside>
  );
}
