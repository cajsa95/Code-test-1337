import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../logo.svg";

const CardView = (props) => {
  const [moreInfo, setMoreInfo] = useState(false);

  const showMoreInfo = () => {
    setMoreInfo(moreInfo ? false : true);
    console.log(moreInfo);
  };

  return (
    <StyledDiv onClick={() => showMoreInfo()}>
      {moreInfo ? (
        <MoreInfoDiv>
          <h4>{props.ninja.name}</h4>
          <p>{props.ninja.tagLine || ""}</p>
          <div>
            <p>
              Office: {props.ninja.office}
              <br />
              Phone number: {props.ninja.phoneNumber || "No phone number yet!"}
              <br />
              Email:{props.ninja.email || "No email!"}
            </p>
            <img src={props.ninja.imageBodyUrl || logo} alt="profile"></img>
          </div>
        </MoreInfoDiv>
      ) : (
        <SmallInfoDiv>
          <img src={props.ninja.imagePortraitUrl || logo} alt="profile"></img>
          <div>
            <h4>{props.ninja.name}</h4>
          </div>
        </SmallInfoDiv>
      )}
    </StyledDiv>
  );
};

export default CardView;

const StyledDiv = styled.div`
  width: 300px;
  height: 350px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 20px 10px;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 10px 10px 5px #aaaaaa;
  transition: 0.2s;
  img {
    margin-top: 10px;
    border: 1px solid #eee;
    border-radius: 10px;
    width: 200px;
  }
  div {
  }
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const SmallInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  div {
    text-align: center;
    h4 {
      margin-bottom: 0;
    }
    p {
      margin-top: 10px;
    }
  }
`;

const MoreInfoDiv = styled.div`
  text-align: left;
  h4 {
    margin-bottom: 0;
    text-align: center;
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
  }
  div {
    display: flex;
    img {
      width: 70px;
      border: none;
    }
    p {
      text-align: left;
    }
  }
`;
