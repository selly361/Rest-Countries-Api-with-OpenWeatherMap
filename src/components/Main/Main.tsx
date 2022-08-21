import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { BsX } from "react-icons/bs";
import axios from "axios";

const Container = styled.main`
  width: 100vw;
  min-height: 70vh;
`;

const InputContainer = styled.form`
  width: 450px;
  display: flex;
  height: 50px;
  align-items: center;
  background-color: ${({ theme }) => theme.header.background};
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding-left: 0.2rem;

  .x {
    padding-right: 0.4rem;
    cursor: pointer;
    color: red;
  }
`;
const Input = styled.input`
  width: 400px;
  border: 1px white;
  font-size: 1.3rem;
  height: 100%;
  padding-left: 0.5rem;
`;

const SearhAndFilterContainer = styled.div`
  width: 97vw;
  height: 100px;
  margin: auto;
  display: flex;
  align-items: center;
`;

function Main() {
  const [searchedData, setSearchedData] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState<any>(null)


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("https://restcountries.com/v3.1/all");
      setCountries(data);
      console.log(data)
      } catch (err) {
        setError(err);
      }

    })()
  }, [])



  const handleSubmit = async () => {
  }



  return (
    <Container>
      <SearhAndFilterContainer>
        <InputContainer onSubmit={handleSubmit}>
          <HiOutlineSearch size={21} />
          <Input
            required
            type="text"
            placeholder="Search for a country..."
            value={searchedData}
            onChange={(e) => setSearchedData(e.target.value)}
          />
          {searchedData.trim() && (
            <BsX onClick={() => setSearchedData("")} size={33} className="x" />
          )}
        </InputContainer>
      </SearhAndFilterContainer>

    </Container>
  );
}

export default Main;
