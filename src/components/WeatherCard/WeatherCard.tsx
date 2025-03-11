import { 
    Typography, 
    Box,
} from '@mui/material'
import { WeatherResponse } from '../../api/weather/weatherService.d'
import { formatDate } from '../../helpers/date'

type WeatherCardProps = {
    data: WeatherResponse
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 400, fontFamily: "'Raleway', sans-serif" }}>
          {data.location.name.toUpperCase()}
        </Typography>
        <Typography variant="body2">
          {formatDate(new Date(data.location.localtime.split(" ")[0]))}
        </Typography>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h1" sx={{ fontWeight: 100 }}>
          {data.current.temp_c}°
        </Typography>
        <Typography variant="h5">{data.current.condition.text}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 6, mt: 2 }}>
          <Typography variant="body1">⬆️ {data.current.heatindex_c}°C</Typography>
          <Typography variant="body1">⬇️ {data.current.windchill_c}°C</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          mb: 4,
        }}
      >
        <Typography variant="body1">💨 {data.current.wind_kph} km/h</Typography>
        <Typography variant="body1">💧 {data.current.humidity}%</Typography>
        <Typography variant="body1">🌧 {data.current.precip_mm} mm</Typography>
      </Box>
    </Box>
  );
}

export default WeatherCard