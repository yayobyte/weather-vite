import { useQuery } from '@tanstack/react-query'
import { PexelsSearchResponse } from '../api/images/pexelsService.d'
import { PexelsService } from '../api/images/pexelsService'

const CACHE_LIFE = 20 * 60 * 1000

export function usePexels(location: string, weatherConditionCode: number | undefined) {
    return useQuery<PexelsSearchResponse, Error>({
        queryKey: ['pexels', location],
        queryFn: () => PexelsService.getCityImage(location, weatherConditionCode),
        enabled: !!location,
        staleTime: CACHE_LIFE,
        refetchOnWindowFocus: false
    })
}