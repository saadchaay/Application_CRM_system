import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <h1>Hello World</h1> 
        </div>
      </div>
    </div>
  );
}

export default App;
