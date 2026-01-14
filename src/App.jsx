import "./App.css";
import Header from "./Components/Structure/Header";
import Sidebar from "./Components/Structure/Sidebar";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-shell">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
