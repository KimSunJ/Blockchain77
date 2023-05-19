import styled from "styled-components";
import { Link } from "react-router-dom";

const ListCompornent = ({ list }) => {
  console.log(list);
  return (
    <ListBox>
      <colgroup>
        <col width={"10%"} />
        <col width={"50%"} />
        <col width={"20%"} />
        <col width={"20%"} />
      </colgroup>
      {/* th 간격 */}
      <thead>
        <tr>
          <th>Index</th>
          <th>Title</th>
          {/* <th>Text</th> */}
          <th>UserName</th>
          <th>CreatedAt</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={`tr-${index}`}>
            <td key={`id-${index}`}>{item.id}</td>
            <td key={`title-${index}`}>
              <Link to={`/board/${item.id}`}>{item.title}</Link>
            </td>
            <td key={`userName-${index}`}>{item.userName}</td>
            <td key={`createdAt-${index}`}>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </ListBox>
  );
};

export default ListCompornent;

const ListBox = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;

  th {
    height: 30px;
    border-bottom: 2px solid black;
  }
  td {
    height: 30px;
    border-bottom: 1px dashed black;
  }
`;
