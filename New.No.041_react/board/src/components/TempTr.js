import TempTd from "./TempTd";

export default function TempTr({ isHead, tableData, head }) {
  // 매개변수를 구조분해 할당으로 받았다.
  // const { tableData } = props
  // export default function TempTr(props) {
  console.log(tableData);
  //   console.log(props.tableData);
  if (isHead) {
    return (
      <tr>
        {head.map((item, index) => (
          <th key={index}>{tableData[item]}</th>
        ))}
      </tr>
    );
    A;
  }
  return (
    <tr>
      {head.map((item, index) => (
        // 4개의 head의 갯수만큼 컴포넌트를 돌렸다 6개의 td를
        <TempTd key={index} item={tableData[item]} />
      ))}
    </tr>
  );
}
