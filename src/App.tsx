import { useState } from 'react'
import { useWeather } from './hooks/weather/useWeather'
import SearchBar, { MIN_SEARCH_CHARS } from './components/SearchBar/SearchBar'
import { Box, Container } from '@mui/material'
import Spinner from './components/Ui/Spinner/Spinner'
import WeatherCard from './components/WeatherCard/WeatherCard'
import CityBackground from './components/CityBackground/CityBackground'
import { Alert } from './components/Ui/Alert/Alert'
import { useQueryCity } from './hooks/weather/useQueryCity'

function App() {
	const [location, setLocation] = useState('Medellin')
	const [isListOpened, setIsListOpened] = useState(false)
	const [debouncedValue, setDebouncedValue] = useState<string>('')

	const { data, error, isError, isLoading } = useWeather(location)
	const { data: searchData, isLoading: searchIsLoading } = useQueryCity(
		debouncedValue.length >= MIN_SEARCH_CHARS ? debouncedValue : ''
	)

	const onSearch = (city: string) => {
		setLocation(city)
	}

	const isCityError = searchData?.length === 0

	return (
		<CityBackground location={data?.location} isError={isError || isCityError} weatherConditionCode={data?.current.condition.code}>
			<Container maxWidth="xs">
				<Box>
					<SearchBar onSearch={onSearch} setIsListOpened={setIsListOpened} setDebouncedValue={setDebouncedValue} isLoading={searchIsLoading} data={searchData} />
					<Spinner isLoading={isLoading || searchIsLoading}/>
					{((isError || isCityError) && !(isLoading || searchIsLoading)) && <Alert message={error?.message || "City not found"} />}
					{(data && !(isError || isCityError) && !(isLoading || searchIsLoading)) && <WeatherCard data={data} isListOpened={isListOpened} />}
				</Box>
			</Container>
		</CityBackground>
	)
}

export default App
