import { Route, Routes } from "react-router-dom";
import In from "./In";
import Out from "./Out";

function Log() {
  return (
    <div>
      Log!
      <Routes>
        {/* Routes: Route들을 감싸고 있는 것 */}
        <Route path="/in/:userId" element={<In />} />
        {/* 매개변수로 쓰는 params (/:userId) */}
        <Route path="/out" element={<Out />} />
      </Routes>
    </div>
  );
}

export default Log;
