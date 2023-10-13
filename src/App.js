
//import 'antd/dist/antd.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import MainInterface from "./routes/Mainpage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <MainInterface />
      </Router>
    </div>
  );
}

export default App;
