import { Box, Typography } from "@mui/material"
import { HourForecast } from "../../api/weather/weatherService.d"
import { formatHour } from "../../helpers/date"
import WeatherIcon from "../WeatherIcon/WeatherIcon"

type WeatherHourForecastProps = {
  forecastHours: HourForecast[] | undefined
}

const WeatherHourForecast = ({ forecastHours }: WeatherHourForecastProps) => {
  if (!forecastHours) return null
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        border: '0.5px solid #FFFFFF',
        borderRadius: 2,
        padding: 2,
        width: '100%',
        maxHeight: '30vh',
        overflowY: 'scroll'
      }}
    >
      {forecastHours.map((hour) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ width: 50, textAlign: 'left' }}>{formatHour(hour.time)}</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: 70,
              gap: 1
            }}
          >
            <WeatherIcon size={24} code={hour.condition.code}/>
            <Typography variant="body1">{hour.chance_of_rain}%</Typography>
          </Box>
          <Typography sx={{ width: 50, textAlign: 'right' }}>{hour.temp_c}° C</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default WeatherHourForecast
