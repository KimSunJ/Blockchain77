export default function LogOut({ user, setUser }) {
  return (
    <div>
      {!user ? `${user}님 어서오세요.` : ""}
      {/* 3항 연산자 */}
      {/* {!user || `${user}님 어서오세요.`} */}
      {/* '||'는 '또는' !user가 거짓이면 `${user}님 어서오세요`것을 출력한다. */}
      <button
        onClick={() => {
          setUser("");
        }}
      >
        Log out
      </button>
    </div>
  );
}
