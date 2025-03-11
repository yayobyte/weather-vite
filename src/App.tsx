import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar/SearchBar'
import { Alert, Box, Container, Paper, Typography } from '@mui/material'
import Spinner from './components/Ui/Spinner/Spinner'

function App() {
	const [location, setLocation] = useState('Medellin')
	const { data, isLoading, isError, error } = useWeather(location)

	const onSearch = (city: string) => {
		setLocation(city)
	}

	return (
		<Container maxWidth="sm">
			<Box>
				<Typography variant='h6'>Weather Service</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					Current Location: <span>{location}</span>
				</Typography>
				<SearchBar onSearch={onSearch} />
				<Spinner isLoading={isLoading}/>
				{isError && <Alert severity="error">Error: {error?.message}</Alert>}
				{data && (
					<Paper elevation={3}>
						<Box justifyContent={'center'}>
							<Typography variant="h4" component="h2" gutterBottom>
								{data.location.name}, {data.location.country}
							</Typography>
							<Typography variant="h1">
								{data.current.temp_c}°C
							</Typography>
							<Typography variant='h6' >
								{data.current.temp_f}°F
							</Typography>
							<Typography variant="body1" sx={{ mt: 2 }}>
								{data.current.condition.text}
							</Typography>
						</Box>
						
					</Paper>
				)}
			</Box>
		</Container>
	)
}

export default App
