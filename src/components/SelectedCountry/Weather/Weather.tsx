import axios from 'axios'
import React, { useEffect, useState } from 'react'


interface PropTypes {
    lat: number,
    long: number
}

const API_KEY = 'd6d56d47681ec79eff1a857169ea0bdf'

const Weather = ({ lat, long }: PropTypes) => {

     const [weatherData, setWeatherData] = useState<{ name?: string }>({})

    useEffect(() => {
      (async () => {
        const { data } = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
        setWeatherData(data)
      })()
    }, [])

  return (
    <div>
        <h2>Weather {weatherData.name}</h2>
        <table>
            <thead>
                <td></td>
            </thead>
        </table>
    </div>
  )
}

export default Weather