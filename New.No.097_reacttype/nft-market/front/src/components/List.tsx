import axios from "axios";
import { useEffect, useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
  // 이미지 주소로 들어가기 때문에
}

export const List = () => {
  const [list, setList] = useState<Array<nftData>>([]);

  const tempList = async () => {
    const result = (await axios.get("http://localhost:8080/api/list")).data;
    setList(result);
  };

  useEffect(() => {
    tempList();
  }, []);

  return (
    <ul>
      {list.map((item, idx) => (
        <Item item={item} key={`item-${idx}`} />
      ))}
    </ul>
  );
};

const Item = ({ item: { name, description, image } }: { item: nftData }) => {
  // Item 컴포넌트에 nftData type의 item을 props로 받겠다 (구조분해 할당해서)
  return (
    <li>
      <div>{name}</div>
      <div>{description}</div>
      <div>
        <img src={image} />
      </div>
    </li>
  );
};
