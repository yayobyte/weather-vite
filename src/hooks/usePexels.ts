import { useQuery } from '@tanstack/react-query'
import { PexelsSearchResponse } from '../api/images/pexelsService.d'
import { PexelsService } from '../api/images/pexelsService'

const CACHE_LIFE = 20 * 60 * 1000

export function usePexels(location: string) {
    return useQuery<PexelsSearchResponse, Error>({
        queryKey: ['pexels', location],
        queryFn: () => PexelsService.getCityImage(location),
        enabled: !!location,
        staleTime: CACHE_LIFE,
        refetchOnWindowFocus: false
    })
}