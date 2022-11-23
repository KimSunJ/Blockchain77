import { useState } from "react";

export default function List() {
  const [listArr, setListArr] = useState([
    { text: "asdf1", user: "asdfasdf" },
    { text: "asdf2", user: "asdfasdf" },
    { text: "asdf3", user: "asdfasdf" },
    { text: "asdf4", user: "asdfasdf" },
    { text: "asdf5", user: "asdfasdf" },
  ]);
  return (
    <div>
      {listArr.map((item, index) => (
        <div key={index}>
          <div key={`${index}-1`}>{item.text}</div>
          <div key={`${index}-2`}>{item.user}</div>
        </div>
      ))}
    </div>
  );
}
