import axios from "axios";
import { useEffect, useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
  // 이미지 주소로 들어가기 때문에
}

export const List = ({ account }: { account: string }) => {
  const [list, setList] = useState<Array<nftData>>([]);

  // const tempList = async () => {
  //   const result = (
  //     await axios.post("http://localhost:8080/api/list", { from: account })
  //   ).data;
  //   setList(result);
  // };

  // useEffect(() => {
  //   tempList();
  // }, [account]);

  useEffect(() => {
    (async () => {
      console.log(
        await axios.get(
          "https://ipfs.io/ipfs/QmNVvkrXNUXetiMUsLMWzZvwQty7RjxgqpzxtLhZVo7tpW"
        )
      );
      // console.log(
      //   await axios.get(
      //     "https://gateway.pinata.cloud/ipfs/Qmaor8Dw4j2JzNjSpGBgkPNYqde4a8StRz6K3s4Pe74WKx"
      //   )
      // );
      setList(
        (await axios.post("http://localhost:8080/api/list", { from: account }))
          .data
      );
    })();
  }, [account]);

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
