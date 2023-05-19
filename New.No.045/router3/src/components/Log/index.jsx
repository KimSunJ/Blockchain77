import { Outlet } from "react-router-dom";
// 하위 라우터가 있을 경우 사용해야 적용됨

export default function Log() {
  return (
    <div>
      Log!
      <Outlet />
    </div>
  );
}
