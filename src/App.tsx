import { useState, useEffect } from "react";
import { useWeather } from "./hooks/weather/useWeather";
import SearchBar, { MIN_SEARCH_CHARS } from "./components/SearchBar/SearchBar";
import { Box, Container } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import Spinner from "./components/Ui/Spinner/Spinner";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import CityBackground from "./components/CityBackground/CityBackground";
import { Alert } from "./components/Ui/Alert/Alert";
import { useQueryCity } from "./hooks/weather/useQueryCity";
import FavoritesBar from "./components/FavoritesBar/FavoritesBar";
import { ForecastResponse } from "./api/weather/weatherService.d";
import { LocalStorageService } from "./services/localStorage/localStorageService";

function App() {
  const [location, setLocation] = useState("Medellin")
  const [isListOpened, setIsListOpened] = useState(false)
  const [debouncedValue, setDebouncedValue] = useState<string>("")
  const [favorites, setFavorites] = useState<ForecastResponse[]>([])
  const [currentFavoriteIndex, setCurrentFavoriteIndex] = useState(0)
  const [viewingSearchResults, setViewingSearchResults] = useState(true)

  const {
    data,
    error,
    isError: isWeatherError,
    isLoading: isWeatherLoading,
  } = useWeather(location)
  const {
    data: searchData,
    isLoading: searchIsLoading,
    isError: isCitySearchError,
		getForcast,
  } = useQueryCity(
    debouncedValue.length >= MIN_SEARCH_CHARS ? debouncedValue : ""
  )

  const onSearch = (city: string) => {
    setLocation(city)
    setViewingSearchResults(true)
  }

  const addToFavorites = () => {
    if (!data) return

    const alreadyExists = favorites.some(
      (fav) => fav.location.name === data.location.name
    )

    if (!alreadyExists) {
      const newFavorites = [...favorites, data]
      setFavorites(newFavorites)
      setCurrentFavoriteIndex(newFavorites.length - 1)
      setViewingSearchResults(false)

			LocalStorageService.saveFavorites(newFavorites)
    }
  }

  const removeFromFavorites = (index: number) => {
    const newFavorites = [...favorites]
    newFavorites.splice(index, 1)
    setFavorites(newFavorites)

    // Avoid ovoerflow
    if (currentFavoriteIndex >= newFavorites.length) {
      setCurrentFavoriteIndex(Math.max(0, newFavorites.length - 1))
    }

    if (newFavorites.length === 0) {
      setViewingSearchResults(true)
    }

    LocalStorageService.saveFavorites(newFavorites)
  }

  useEffect(() => {
		const parsedFavorites = LocalStorageService.getFavorites()
		
		setViewingSearchResults(parsedFavorites.length === 0)

		Promise.all(
			parsedFavorites.map((fav: { locationName: string }) => getForcast(fav.locationName))
		).then((loadedFavorites) => {
			setFavorites(loadedFavorites)
		})

  }, [getForcast])

  // Show current favorite or search result based on viewingSearchResults state
  const currentViewData = viewingSearchResults
    ? data
    : favorites[currentFavoriteIndex]

  const handleSelectFavorite = (index: number) => {
    setCurrentFavoriteIndex(index)
    setViewingSearchResults(false)
  }

  const handleOpenSearch = () => {
    setViewingSearchResults(true)
    // TODO: Replace with a ref
    document.querySelector("input")?.focus()
  }

	const handleRemoveFavorite = () => {
		const index = favorites.findIndex(
			(favorite) => favorite.location.name === data?.location.name
		)
		if (index !== -1) removeFromFavorites(index)
	}

  const isError = isWeatherError || isCitySearchError || searchData?.length === 0
  const isLoading = isWeatherLoading || searchIsLoading
	const isFavorite = favorites.some((fav) => fav.location.name === data?.location.name)
	const currentViewIndex = viewingSearchResults ? favorites.length : currentFavoriteIndex

  return (
    <CityBackground
      location={currentViewData?.location}
      isError={isError}
      weatherConditionCode={currentViewData?.current.condition.code}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <SearchBar
            onSearch={onSearch}
            setIsListOpened={setIsListOpened}
            setDebouncedValue={setDebouncedValue}
            isLoading={searchIsLoading}
            data={searchData}
          />
          <Spinner isLoading={isLoading} />
          {isError && !isLoading && (
            <Alert message={error?.message || "City not found"} />
          )}

          {!isError && !isLoading && (
            <Box sx={{ flex: 1, overflow: "hidden" }}>
							<SwipeableViews
								index={currentViewIndex}
								onChangeIndex={handleSelectFavorite}
								enableMouseEvents
								containerStyle={{ height: "100%" }}
								resistance
							>
								{favorites.map((favoriteData, index) => (
									<Box
										key={`favorite-${index}`}
										sx={{ height: "100%", px: 1 }}
									>
										<WeatherCard
											data={favoriteData}
											isListOpened={isListOpened}
											isFavorite={true}
											onRemoveFavorite={() => removeFromFavorites(index)}
										/>
									</Box>
								))}
								<Box sx={{ height: "100%", px: 1 }}>
									{data && (
										<WeatherCard
											data={data}
											isListOpened={isListOpened}
											isFavorite={isFavorite}
											onAddToFavorite={addToFavorites}
											onRemoveFavorite={handleRemoveFavorite}
										/>
									)}
								</Box>
							</SwipeableViews>
            </Box>
          )}
        </Box>
        <FavoritesBar
          favorites={favorites}
          onAddClick={handleOpenSearch}
          currentIndex={currentViewIndex}
          onSelectFavorite={handleSelectFavorite}
        />
      </Container>
    </CityBackground>
  )
}

export default App
