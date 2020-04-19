import React, { useEffect, useState } from "react";
import Loading from "./loading/Loading";
import CardView from "./view/grid/CardView";
import styled from "styled-components";
import ListView from "./view/list/ListView";
import logo from "./tretton37.png";
import "./Ninjas.css";

function Ninjas() {
  const [ninjas, setNinjas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(20);
  const [nameOrder, setNameOrder] = useState(true);
  const [officeOrder, setOfficeOrder] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [view, setView] = useState(false);

  function sortNinjasByFirstName() {
    function compare(a, b) {
      if (a.name < b.name) {
        setNameOrder(false);
        return -1;
      }
      if (a.name > b.name) {
        setNameOrder(true);
        return 1;
      }
    }

    if (nameOrder) {
      setNinjas([...ninjas].sort(compare));
    } else {
      setNinjas([...ninjas].reverse(compare));
    }
  }

  function sortNinjasByOffice() {
    function compare(a, b) {
      if (a.office < b.office) {
        setOfficeOrder(false);
        return -1;
      }
      if (a.office > b.office) {
        setOfficeOrder(true);
        return 1;
      }
    }

    if (officeOrder) {
      setNinjas([...ninjas].sort(compare));
    } else {
      setNinjas([...ninjas].reverse(compare));
    }
  }

  const showMoreNinjas = () => {
    setVisible(visible + 10);
  };

  const switchView = () => {
    setView(view ? false : true);
  };

  async function fetchData() {
    const res = await fetch("http://api.tretton37.com/ninjas");
    res
      .json()
      .then((res) => {
        setNinjas(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterOffice = ninjas.filter((ninja) =>
      ninja.office.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filterOffice);
    setNinjas(ninjas);
  }, [searchTerm, ninjas]);

  return (
    <div>
      <Header src={logo} alt="header" />
      <Control>
        <button className="button" onClick={() => sortNinjasByFirstName()}>
          Sort ninjas by name
        </button>
        <button className="button" onClick={() => sortNinjasByOffice()}>
          Sort ninjas by office
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter ninjas by Office..."
          className="input"
        ></input>
        <button
          className={view ? "button listView" : "button gridView"}
          onClick={() => switchView()}
        ></button>
      </Control>

      <StyledDiv>
        {loading ? (
          <Loading />
        ) : view ? (
          searchResults
            .slice(0, visible)
            .map((ninja, index) => <CardView key={index} {...{ ninja }} />)
        ) : (
          searchResults
            .slice(0, visible)
            .map((ninja, index) => (
              <ListView key={index} {...{ ninja }}></ListView>
            ))
        )}
      </StyledDiv>
      {visible < ninjas.length && (
        <button className="button more" onClick={showMoreNinjas}>
          Show more awesome ninjas
        </button>
      )}
    </div>
  );
}

export default Ninjas;

const Control = styled.div`
  display: flex;
  margin-bottom: 50px;
  margin-left: 10%;
  justify-content: space-around;
  max-width: 80%;
`;

const StyledDiv = styled.div`
  display: flex;
  width: 80%;
  max-width: 2000px;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 10%;
`;

const Header = styled.img`
  width: 25%;
  margin-left: 50%;
  padding: 30px;
`;
