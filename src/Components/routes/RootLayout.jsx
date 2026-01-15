import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import Header from "../structure/Header";
import Sidebar from "../structure/Sidebar";
import style from "./RootLayout.module.scss";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP" && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [navigationType, location.pathname, navigate]);

  return (
    <div className={style.App}>
      <Header />
      <div className={style.appShell}>
        <Sidebar />
        <main className={style.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
