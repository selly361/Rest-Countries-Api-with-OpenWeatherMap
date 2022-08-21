import React, { Fragment } from 'react'
import Country from "../Country/Country"
import styled from "styled-components";


interface PropTypes {
    countries: any[]
}

const Wrapper = styled.div`
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    row-gap: 3rem;


    @media (max-width: 1098px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
`

const CountryWrapper = ({ countries }: PropTypes) => {

  return (
    <Wrapper>
      {
        countries.map((c: any) => {
          return (
            <Fragment key={c.name.official}>
              <Country officialName={c.name.official} flag={c.flags.png} population={c.population} region={c.region} capital={c.capital} />
            </Fragment>
          )
        })
      }

    </Wrapper>
  )
}

export default CountryWrapper