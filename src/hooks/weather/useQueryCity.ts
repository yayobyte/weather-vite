import { useCallback  } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { WeatherService } from "../../api/weather/weatherService";
import { SearchCityResponse, ForecastResponse } from "../../api/weather/weatherService.d";

const CACHE_LIFE = 5 * 60 * 1000;

export function useQueryCity(query: string) {
	const queryClient = useQueryClient()

	const getForcast = useCallback(async (searchQuery: string): Promise<ForecastResponse> => {
    const result = await WeatherService.getForecastWeather(searchQuery)
    queryClient.setQueryData(["search", searchQuery], result)
    return result
  }, [queryClient])

	const queryResults = useQuery<SearchCityResponse, Error>({
		queryKey: ["search", query],
		queryFn: () => WeatherService.searchCity(query),
		enabled: !!query,
		staleTime: CACHE_LIFE,
		refetchOnWindowFocus: false,
	})

  return {
    ...queryResults,
		getForcast,
  };
}
