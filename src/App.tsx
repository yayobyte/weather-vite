import { useState } from 'react'
import './App.css'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [location, setLocation] = useState('Medellin')
  const { data, isLoading, isError, error } = useWeather(location)

  const onSearch = (city: string) => {
    setLocation(city)
  }

  return (
    <>
      <div>
        <h1>Weather Service</h1>
        <div>Current Location: <span>{location}</span></div>
        <SearchBar onSearch={onSearch} />
        {isLoading && <div>Loading weather data...</div>}
        {isError && <div>Error: {error?.message}</div>}
        {data && (
          <div>
            <h2>{data.location.name}, {data.location.country}</h2>
            <p>{data.current.temp_c}°C / <span>{data.current.temp_f}°F</span></p>
          </div>
      )}
      </div>
    </>
  )
}

export default App
