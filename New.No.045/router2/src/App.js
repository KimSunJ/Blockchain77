import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Log from "./components/Log";
import In from "./components/Log/In";
import Out from "./components/Log/Out";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Home propsNum={num} />} />
        <Route path="login" element={<LogIn />} />
        <Route path="log" element={<Log />}>
          <Route path="in" element={<In />} />
          <Route path="out" element={<Out />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
