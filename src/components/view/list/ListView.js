import React from "react";
import styled from "styled-components";
import "./ListView.css";

const ListView = (props) => {
  function renderTableData() {
    return (
      <tr>
        <td>{props.ninja.name}</td>

        <td>Available in: {props.ninja.office}</td>
        <td>
          <div className="phone">
            Phone number: {props.ninja.phoneNumber || "It's a secret"}
          </div>
        </td>
        <td>
          <a className="email" href={`mailto:${props.ninja.email}`}>
            Send email
          </a>
        </td>
      </tr>
    );
  }
  return (
    <StyledDiv>
      <table id="ninjas">
        <tbody>{renderTableData()}</tbody>
      </table>
    </StyledDiv>
  );
};

export default ListView;

const StyledDiv = styled.div`
  display: block;
  width: 100%;
  tbody {
    text-align: left;
  }
  :nth-child(odd) {
    background-color: #eee;
  }
  :hover {
    background-color: #ddd;
  }
`;
