import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../api";
import RegistComponent from "../components/Regist";

const RegistContainer = () => {
  const [registData, setregistData] = useState({
    id: "",
    pw: "",
    name: "",
  });

  const navigate = useNavigate();

  const changeId = (e) => {
    setregistData((state) => ({ ...state, id: e.target.value }));
  };

  const changePw = (e) => {
    setregistData((state) => ({ ...state, pw: e.target.value }));
  };

  const changeName = (e) => {
    setregistData((state) => ({ ...state, name: e.target.value }));
  };

  const regist = async () => {
    if (!registData.id || !registData.pw) return;
    const result = await signIn(registData);
    console.log(result);
    if (!result.isError) navigate("/");
  };

  return (
    <RegistComponent
      changeFuncs={{ changeId, changePw, changeName }}
      // 객체로 전달
      regist={regist}
    />
  );
};

export default RegistContainer;
