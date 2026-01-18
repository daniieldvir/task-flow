import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
import Filters from "../UI/Filters/Filters";
import FilterSelect from "../UI/Filters/FilterSelect";
import { FilterOptionsByPath } from "../utils/FilterOptions";
import styles from "./Sidebar.module.scss";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const { filter, setFilter } = useFilter();
  const navigate = useNavigate();
  const location = useLocation();
  const isOverview = location.pathname === "/";
  const currentOptions = FilterOptionsByPath[location.pathname] ?? ["All"];

  useEffect(() => {
    setFilter("All");
  }, [location.pathname, setFilter]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarTitle}>Navigation</div>
        <SidebarNav onNavigate={navigate} />
      </div>
      {!isOverview && (
        <Filters title="Filters">
          <FilterSelect
            options={currentOptions}
            value={filter}
            onChange={setFilter}
          />
        </Filters>
      )}
    </aside>
  );
}
