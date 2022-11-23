import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/login">Log in</Link> |{" "}
      <Link to="log/in">Log in 2</Link> |<Link to="log/out">Log out 2</Link>
      {/* a 태그 대신 사용한다. 웹페이지 내에서 이동할 경우 사용*/}
      {/* a 태그를 사용하는 것은 외부 웹페이지에 접근할 경우 사용한다. << localhost -> naver.com */}
    </div>
  );
}
