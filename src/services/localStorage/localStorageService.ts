import { ForecastResponse } from "../../api/weather/weatherService.d";
import { LocalStorageFavorite } from './localStorageService.d'

const FAVORITES_STORAGE_KEY = "weatherApp_favorites";

export abstract class LocalStorageService {
  public static saveFavorites (favorites: ForecastResponse[]) {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(
        favorites.map((favorite) => ({
          locationName: favorite.location.name,
          country: favorite.location.country,
        }))
      )
    );
  }

  public static getFavorites (): LocalStorageFavorite[] {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (storedFavorites) {
      return JSON.parse(storedFavorites)
    }
    return []
  }
}
