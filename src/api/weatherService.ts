import { WeatherResponse } from './weatherService.d'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

export abstract class WeatherService {
    public static async getCurrentWeather(location: string): Promise<WeatherResponse> {
        try {
            const params = new URLSearchParams({
                key: API_KEY,
                q: location,
                aqi: 'no'
            });
            console.log('Fetching current weather...')
            const endpoint = `${BASE_URL}/current.json?${params}`
            const response = await fetch(endpoint, {
                method: 'GET',
            })
            const data = response.json()
            return data
        } catch (error) {
            console.log('There was an error fetching weather')
            throw new Error(error instanceof Error ? error.message : 'Unknown error occured when fetching weather data')
        }
    }
}