import { Outlet } from "react-router-dom";
import Header from "../structure/Header";
import Sidebar from "../structure/Sidebar";
import style from "./RootLayout.module.scss";

export default function RootLayout() {
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
