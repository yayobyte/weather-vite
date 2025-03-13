import { SearchCityResponse, ForecastResponse } from './weatherService.d'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

export abstract class WeatherService {
	public static async getForecastWeather(location: string): Promise<ForecastResponse> {
		try {
			const params = new URLSearchParams({
				key: API_KEY,
				q: location,
				aqi: 'no',
				days: '1',
			});
			console.log('Fetching current weather...')
			const endpoint = `${BASE_URL}/forecast.json?${params}`
			const response = await fetch(endpoint, {
				method: 'GET',
			})
			const data = await response.json()
			if (data.error) {
				throw new Error(data.error.message)
			}
			return data
		} catch (error) {
			console.log('There was an error fetching weather')
			throw new Error(error instanceof Error ? error.message : 'Unknown error occured when fetching weather data')
		}
	}

	public static async searchCity(query: string): Promise<SearchCityResponse> {
		try {
			const params = new URLSearchParams({
				key: API_KEY,
				q: query,
				aqi: 'no'
			});
			console.log('Searching city...')
			const endpoint = `${BASE_URL}/search.json?${params}`
			const response = await fetch(endpoint, {
				method: 'GET',
			})
			const data = await response.json()
			if (data.error) {
				throw new Error(data.error.message)
			}
			return data
		} catch (error) {
			console.log('There was an error searching for a city')
			throw new Error(error instanceof Error ? error.message : 'Unknown error occured when searching cities')
		}
	}
}