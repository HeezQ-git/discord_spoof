import { Routes, Route } from "react-router";
import "./App.scss";
import Login from "./components/Login";
import Database from "./components/Database";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" />
                <Route path="/login" element={<Login />} />
                <Route path="/db" element={<Database />} />
            </Routes>
        </div>
    );
}

export default App;
