import { useQuery } from '@tanstack/react-query'
import { WeatherService } from '../../api/weather/weatherService'
import { WeatherResponse } from '../../api/weather/weatherService.d'

const CACHE_LIFE = 5 * 60 * 1000

export function useWeather(location: string) {
    return useQuery<WeatherResponse, Error>({
        queryKey: ['weather', location],
        queryFn: () => WeatherService.getCurrentWeather(location),
        enabled: !!location,
        staleTime: CACHE_LIFE,
        refetchOnWindowFocus: false
    })
}