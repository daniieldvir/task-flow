import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./App.module.scss";
import OverviewPanel from "./components/pages/OverviewPanel";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(activeView);
    if (activeView === "tasks") {
      navigate("/tasks");
    }
    if (activeView === "alerts") {
      navigate("/alerts");
    }
    if (activeView === "incidents") {
      navigate("/incidents");
    }
  }, [activeView, navigate]);

  return (
    <div className={style.App}>
      <div className={style.appShell}>
        {activeView === "overview" && <OverviewPanel />}
      </div>
    </div>
  );
}
