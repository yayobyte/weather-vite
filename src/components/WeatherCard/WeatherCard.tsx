import { 
	Paper, 
	Typography, 
	Box, 
	Grid2, 
} from '@mui/material'
import { WeatherResponse } from '../../api/weatherService.d'

type WeatherCardProps = {
	data: WeatherResponse
}

const WeatherCard = ({ data }: WeatherCardProps) => {
if ('message' in data) {
	return null
}

return (
	<Paper elevation={3}>
		<Box sx={{ textAlign: 'center', mb: 2 }}>
			<Typography variant="h4" component="h2">
				{data.location.name}
			</Typography>
			<Typography variant='body1' gutterBottom>
				{data.location.country}
			</Typography>
			<Typography variant="body2" color="textSecondary">
				{data.location.localtime.split(' ')[0]}
			</Typography>
			<Typography variant="body2" color="textSecondary">
				{data.location.localtime.split(' ')[1]}
			</Typography>
		</Box>
		
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Typography variant="h2" component="p" sx={{ ml: 2 }}>
				{data.current.temp_c}°C
			</Typography>
		</Box>
		
		<Typography variant="h6" align="center" gutterBottom>
			{data.current.condition.text}
		</Typography>
	
		<Grid2 container spacing={2}>
			<Grid2 size={8}>
				<Typography variant="body2">Feels Like</Typography>
				<Typography variant="body1">{data.current.feelslike_c}°C</Typography>
			</Grid2>
			<Grid2 size={6}>
				<Typography variant="body2">Humidity</Typography>
				<Typography variant="body1">{data.current.humidity}%</Typography>
			</Grid2>
			<Grid2 size={6}>
				<Typography variant="body2">Wind</Typography>
				<Typography variant="body1">{data.current.wind_kph} km/h</Typography>
			</Grid2>
			<Grid2 size={6}>
				<Typography variant="body2">UV Index</Typography>
				<Typography variant="body1">{data.current.uv}</Typography>
			</Grid2>
		</Grid2>
	</Paper>
)}

export default WeatherCard