import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
import Filters from "../UI/Filters/Filters";
import FilterSelect from "../UI/Filters/FilterSelect";
import { FilterOptionsByPath } from "../utils/FilterOptions";
import styles from "./Sidebar.module.scss";
import SidebarNav from "./SidebarNav";
import UserAvater from "../UI/DataDisplay/UserAvatar";

export default function Sidebar() {
  const navigate = useNavigate();
 
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <SidebarNav onNavigate={navigate} />
      </div>
    </aside>
  );
}
