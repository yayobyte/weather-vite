import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar/SearchBar'
import { Box, Container } from '@mui/material'
import Spinner from './components/Ui/Spinner/Spinner'
import WeatherCard from './components/WeatherCard/WeatherCard'
import CityBackground from './components/CityBackground/CityBackground'
import { Alert } from './components/Ui/Alert/Alert'

function App() {
	const [location, setLocation] = useState('Medellin')
	const { data, isLoading } = useWeather(location)
	const onSearch = (city: string) => {
		setLocation(city)
	}

	const isError = true
	const error = { message: ' No location found'}

	return (
		<CityBackground location={data?.location} isError={isError}>
			<Container maxWidth="xs">
				<Box>
					<SearchBar onSearch={onSearch} />
					<Spinner isLoading={isLoading}/>
					{(isError && !isLoading) && <Alert message={error?.message} />}
					{(data && !isError) && <WeatherCard data={data} />}
				</Box>
			</Container>
		</CityBackground>
	)
}

export default App
