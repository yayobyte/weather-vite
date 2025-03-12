import { useQuery } from '@tanstack/react-query'
import { WeatherService } from '../../api/weather/weatherService'
import { SearchCityResponse } from '../../api/weather/weatherService.d'

const CACHE_LIFE = 5 * 60 * 1000

export function useQueryCity(query: string) {
    return useQuery<SearchCityResponse, Error>({
        queryKey: ['search', query],
        queryFn: () => WeatherService.searchCity(query),
        enabled: !!query,
        staleTime: CACHE_LIFE,
        refetchOnWindowFocus: false
    })
}