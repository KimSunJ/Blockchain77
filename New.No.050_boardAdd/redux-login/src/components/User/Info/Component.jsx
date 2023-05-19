import styled from "styled-components";

const InfoComponent = ({ userName, onClick }) => {
  return (
    <InfoBox>
      {userName}님 어서오세요.{" "}
      <button
        onClick={() => {
          onClick();
        }}
        // onClick={onClick} << 문제가 생김
      >
        LogOut
      </button>
    </InfoBox>
  );
};

export default InfoComponent;

const InfoBox = styled.div``;
