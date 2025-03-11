import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar/SearchBar'
import { Alert, Box, Container } from '@mui/material'
import Spinner from './components/Ui/Spinner/Spinner'
import WeatherCard from './components/WeatherCard/WeatherCard'

function App() {
	const [location, setLocation] = useState('Medellin')
	const { data, isLoading, isError, error } = useWeather(location)

	const onSearch = (city: string) => {
		setLocation(city)
	}

	return (
		<Container maxWidth="sm">
			<Box>
				<SearchBar onSearch={onSearch} />
				<Spinner isLoading={isLoading}/>
				{isError && <Alert severity="error">Error: {error?.message}</Alert>}
				{data && <WeatherCard data={data} />}
			</Box>
		</Container>
	)
}

export default App
