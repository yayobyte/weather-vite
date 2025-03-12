import { useQuery } from '@tanstack/react-query'
import { WeatherService } from '../../api/weather/weatherService'
import { ForecastResponse } from '../../api/weather/weatherService.d'

const CACHE_LIFE = 5 * 60 * 1000

export function useWeather(location: string) {
    return useQuery<ForecastResponse, Error>({
        queryKey: ['weather', location],
        queryFn: () => WeatherService.getForecastWeather(location),
        enabled: !!location,
        staleTime: CACHE_LIFE,
        refetchOnWindowFocus: false
    })
}