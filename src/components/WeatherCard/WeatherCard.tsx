import { 
    Typography, 
    Box,
    Divider,
} from '@mui/material'
import { Wind, Droplets, CloudRain, ThermometerSun } from "lucide-react";
import { WeatherResponse } from '../../api/weather/weatherService.d'
import { formatDate } from '../../helpers/date'

type WeatherCardProps = {
    data: WeatherResponse
}

const ICON_SIZE = 40

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

      <Box
        sx={{ display: 'flex', width: '100%' }}
      >
        <Box sx={{ mb: 8, flex: 4, justifyContent: 'space-between', flexDirection: 'column', mr: 2 }}>
          <Typography variant="h1" sx={{ fontWeight: 300, ml: 5 }}>
            {data.current.temp_c}°
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThermometerSun size={20} />
              <Typography variant="body1" sx={{ fontFamily: "'Raleway', sans-serif"}}>
                Feels like {data.current.feelslike_c}°C
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5">{data.current.condition.text}</Typography>
        </Box>

        <Divider orientation='vertical' sx={{ height: 220, bgcolor: "white", width: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "flex-start",
            flex: 1,
            mb: 4,
            gap: 2,
            ml: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <Wind size={ICON_SIZE} />
            <Typography variant="body1">{data.current.wind_kph} km/h</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <Droplets size={ICON_SIZE} />
            <Typography variant="body1">{data.current.humidity}%</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <CloudRain size={ICON_SIZE} />
            <Typography variant="body1">{data.current.precip_mm} mm</Typography>
          </Box>
        </Box>

      </Box>

      

      
    </Box>
  );
}

export default WeatherCard