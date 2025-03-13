import { Box, IconButton, Typography } from "@mui/material"
import { HourForecast } from "../../api/weather/weatherService.d"
import { formatHour } from "../../helpers/date"
import WeatherIcon from "../WeatherIcon/WeatherIcon"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useEffect, useRef } from "react"
import { Easing, smoothScroll, SmoothScrollOptions } from "../../helpers/ui"
import ScrollButton from "../Ui/ScrollButton/ScrollButton"

type WeatherHourForecastProps = {
  forecastHours: HourForecast[] | undefined
}

const DEFAULT_ANIMATION = Easing.easeInOutCubic
const DEFAULT_ANIMATION_TIME = 600

const animationProperties : SmoothScrollOptions = { 
  axis: 'x',
  duration: DEFAULT_ANIMATION_TIME, 
  easing: DEFAULT_ANIMATION
}

const WeatherHourForecast = ({ forecastHours }: WeatherHourForecastProps) => {

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    smoothScroll(scrollContainerRef, -200, animationProperties);
  };
  
  const scrollRight = () => {
    smoothScroll(scrollContainerRef, 200, animationProperties);
  };

  //Show to the user that the container can be scrolled-x
  useEffect(() => {
    const rightScrollerTimer = setTimeout(() => {
      scrollRight()
      scrollRight()
    }, 4 * 1000);

    return () => {
      clearTimeout(rightScrollerTimer)
    }
  }, [])

  if (!forecastHours) return null

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        mt: 3,
        pb: 1,
        '&:hover .scroll-button': {
          opacity: 1,
        },
      }}
    >
      <ScrollButton className="scroll-button" size="small" orientation="left" handleScroll={scrollLeft} />
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          border: '0.5px solid #FFFFFF',
          borderRadius: 2,
          padding: 2,
          width: '100%',
          maxHeight: '20vh',
          overflowX: 'auto'
        }}
      >
        {forecastHours.map((hour) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                gap: 0.5,
              }}
            >
              <WeatherIcon size={20} code={hour.condition.code}/>
              <Typography variant="body1">{hour.chance_of_rain}%</Typography>
            </Box>
            <Typography sx={{ width: 50, textAlign: 'center' }}>{hour.temp_c.toFixed(0)}°c</Typography>
            <Typography variant="body1" sx={{ width: 50, textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{formatHour(hour.time)}</Typography>
          </Box>
        ))}
      </Box>
      <ScrollButton className="scroll-button" size="small" orientation="right" handleScroll={scrollRight} />
    </Box>
  )
}

export default WeatherHourForecast
