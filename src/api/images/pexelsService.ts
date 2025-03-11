import { PexelsSearchResponse } from './pexelsService.d'

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const BASE_URL = 'https://api.pexels.com/v1'
const CITY_DEFAULT_IMAGE_CONTEXT = 'main building landscape'

const getCitySearch = (city: string) => {
    return `${city} ${CITY_DEFAULT_IMAGE_CONTEXT}`
} 

export abstract class PexelsService {
    public static async getCityImage(city: string): Promise<PexelsSearchResponse> {
        try {
            const params = new URLSearchParams({
                query: getCitySearch(city),
                orientation: 'portrait',
                size: 'small',
                per_page: '1',
                locale: 'en-US',
            });
            console.log('Fetching images...')
            const endpoint = `${BASE_URL}/search?${params}`
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': API_KEY
                }
            })
            const data = response.json()
            return data
        } catch (error) {
            console.log('There was an error fetching images')
            throw new Error(error instanceof Error ? error.message : 'Unknown error occured when fetching images data')
        }
    }
}