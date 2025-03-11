import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar/SearchBar'
import { Alert, Box, Container } from '@mui/material'
import Spinner from './components/Ui/Spinner/Spinner'
import WeatherCard from './components/WeatherCard/WeatherCard'
import CityBackground from './components/CityBackground/CityBackground'

function App() {
	const [location, setLocation] = useState('Medellin')
	const { data, isLoading, isError, error } = useWeather(location)
	const onSearch = (city: string) => {
		setLocation(city)
	}

	return (
		<CityBackground location={data?.location}>
			<Container maxWidth="xs">
				<Box>
					<SearchBar onSearch={onSearch} />
					<Spinner isLoading={isLoading}/>
					{(isError) && <Alert severity="error">Error: {error?.message}</Alert>}
					{data && <WeatherCard data={data} />}
				</Box>
			</Container>
		</CityBackground>
	)
}

export default App
