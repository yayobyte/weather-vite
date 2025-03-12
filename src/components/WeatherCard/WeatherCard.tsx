import { 
  Typography, 
  Box,
  Divider,
} from '@mui/material'
import { Wind, Droplets, CloudRain, ThermometerSun } from "lucide-react";
import { WeatherResponse } from '../../api/weather/weatherService.d'
import { getTimeInTimezone } from '../../helpers/date'
import { useEffect, useState } from 'react';

type WeatherCardProps = {
  data: WeatherResponse
  isListOpened: boolean
}

const ICON_SIZE = 30

const WeatherCard = ({ data, isListOpened }: WeatherCardProps) => {
  const [localTime, setLocalTime] = useState(getTimeInTimezone(data.location.tz_id))

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(getTimeInTimezone(data.location.tz_id))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [data])

  const hasLongCityName = data.location.name.length > 14

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        opacity: isListOpened ? 0.3 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 400, fontFamily: "'Raleway', sans-serif", fontSize: hasLongCityName ? "1.5rem" : "2rem" }}>
          {data.location.name.toUpperCase()}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "'Roboto Flex', sans-serif"}}>
          {localTime}
        </Typography>
      </Box>

      <Box
        sx={{ display: 'flex', width: '100%', flexDirection: "row" }}
      >
        <Box
          sx={{
            mb: 8,
            flex: { xs: 3, sm: 4 },
            justifyContent: 'space-between',
            flexDirection: 'column',
            mr: 0,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 300,
              ml: 4,
              mb: { xs: 2, sm: 1},
              fontSize: { xs: "5.5rem", sm: "7.7rem" },
            }}
          >
            {data.current.temp_c}°
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThermometerSun size={20} />
              <Typography variant="body1" sx={{ fontFamily: "'Raleway', sans-serif" }}>
                Feels like {data.current.feelslike_c}°C
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ fontSize: { xs: "1rem", sm: "1.3rem" }, fontWeight: 600}}>{data.current.condition.text}</Typography>
        </Box>

        <Divider orientation='vertical' sx={{ height: { xs: 190, sm: 200 }, bgcolor: "white", width: 2 }} />

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