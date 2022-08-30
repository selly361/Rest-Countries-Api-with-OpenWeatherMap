import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import {
  TemperatureIcon,
  HumidityIcon,
  CloudIcon,
  WindIcon,
  RainIcon,
  SnowIcon,
} from "./weatherIcons";

interface PropTypes {
  lat: number;
  long: number;
}

const API_KEY = "fc2841d06640be17700d1097beff5343";

const Weather = ({ lat, long }: PropTypes) => {
  const [weatherData, setWeatherData] = useState<any>();

  useEffect(() => {
    (async () => {
      const { data } = await axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
      );
      setWeatherData(data);
    })();
  }, [long, lat]);

  return (
    <Container>
      {weatherData && (
        <Fragment>
          <h2 className="country-name">Weather {weatherData.name}</h2>
          <br />
          <table>
            <th className="weather-info">
              <div>
                <h3>{weatherData.weather[0].main}</h3>
                <em>{weatherData.weather[0].description}</em>
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.name + " weather"}
              />
            </th>
            <tbody>
              <tr>
                <td>Temperature:</td>
                <td><TemperatureIcon />  {Math.floor((+weatherData.main.temp - 273.15))} °C</td>
              </tr>
              <tr>
                <td>Humidity:</td>
                <td><HumidityIcon /> {weatherData.main.humidity}%</td>
              </tr>
              <tr>
                <td>Cloudiness:</td>
                <td><CloudIcon /> {weatherData.clouds.all}%</td>
              </tr>
              <tr>
                <td>Wind speed:</td>
                <td><WindIcon /> {weatherData.wind.speed} m/s</td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      )}
    </Container>
  );
};

export default Weather;

let Container = styled.div`
  width: 50vw;
  display: flex;
  height: 70vh;
  justify-content: center;
  flex-flow: column;
  min-height: 80vh;

  tbody {
    tr {
      line-height: 2;
      border-bottom: 41px solid black;

      td:first-child {
        font-weight: bold;
      }


      td:last-child {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  .country-name {
    font-size: 2rem;
  }

  .weather-info {
    width: 200px;
    display: flex;

    h3 {
      font-size: 2rem;
    }

    em {
      font-size: 1rem;
    }
  }

  img {
    height: 100px;
  }


  @media (max-width: 749px){
    & {
      width: 90vw;
      margin: auto;

      table {
        width: 100%;
        margin: auto;
      }
    }
  }


  @media (max-width: 500px){
    & {
      width: 95vw;
    }
  }
`;
