import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

  const [city, setcity] = useState('')
  const [WeatherData, setWeatherData] = useState(null)

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'YOUR_API_KEY'
  const difKelvin = 273.15

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      console.log(data)
      setWeatherData(data)
    } catch (error) {
      console.error('Ha habido un error: ', error)
    }
  }


  const handlCytiChange = (event) => {
    setcity(event.target.value)
  }

  const handlSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()
  }

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handlSubmit}>
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={handlCytiChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {WeatherData && (

        <div>
          <h2>{WeatherData.name}, {WeatherData.sys.country}</h2>
          <p>La temperatura actual es {Math.floor(WeatherData.main.temp - difKelvin)}°c</p>
          <p>La condición meteorológica actual: {WeatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`}
            alt={WeatherData.weather[0].description}
          />
        </div>


      )}

    </div>
  )
}

