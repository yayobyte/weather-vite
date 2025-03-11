import { 
    Paper, 
    Typography, 
    Box, 
    Grid2,
} from '@mui/material'
import { WeatherResponse } from '../../api/weather/weatherService.d'

type WeatherCardProps = {
    data: WeatherResponse
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <Paper elevation={3}>
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {data.location.name}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {data.location.country}
        </Typography>
        <Typography variant="body2">
          {data.location.localtime.split(' ')[0]}
        </Typography>
        <Typography variant="body2">
          {data.location.localtime.split(' ')[1]}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
        <Typography variant="h1" sx={{ fontWeight: 100 }}>
          {data.current.temp_c}°
        </Typography>
      </Box>
      
      <Typography variant="h6" align="center" gutterBottom>
        {data.current.condition.text}
      </Typography>
    
      <Grid2 container spacing={2} sx={{ m: 2 }}>
        <Grid2 size={6}>
          <Typography variant="body2">
            Feels Like
          </Typography>
          <Typography variant="body1">
            {data.current.feelslike_c}°C
          </Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="body2">
            Humidity
          </Typography>
          <Typography variant="body1">
            {data.current.humidity}%
          </Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="body2">
            Wind
          </Typography>
          <Typography variant="body1">
            {data.current.wind_kph} km/h
          </Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="body2">
            UV Index
          </Typography>
          <Typography variant="body1">
            {data.current.uv}
          </Typography>
        </Grid2>
      </Grid2>
    </Paper>
  )
}

export default WeatherCard