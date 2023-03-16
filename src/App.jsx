import "./App.css";
import Temperature from "./Components/Temperature";

function App() {
  return (
    <div className="container">
      <h1>Temperature App</h1>
      <div className="card">
        <div className="control-container">
          <Temperature initialValue={10} />
        </div>
      </div>
    </div>
  );
}

export default App;
