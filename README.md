# Weather App

A simple weather app built with Vite, TypeScript, and Material UI. It allows users to search for a city, view weather conditions, and dynamically update the background based on the city's weather.

## Features

- Search for a city and view its weather details.
- Background dynamically changes based on the selected city's weather.
- Weather effects such as rain, fog, snow, and clouds are overlaid for realism.
- **Favorite cities**: Users can mark a city as a favorite.
- **Scrollable favorite cities list**: Users can add multiple cities to favorites and scroll through them.
- **Local storage persistence**: Favorites and weather data are stored in `localStorage`, so the app retains data after refresh.
- **Detailed weather information**: Displays basic data such as temperature, UV index, and wind speed.
- **Same-day forecast**: A scrollable box provides weather forecasts for different times of the day.
- **Local clock**: Displays the current time for the selected city.
- **City search integration**: Uses Weather API to show available cities.
- **Smooth UI/UX**: Features transparencies and small transitions for a visually appealing experience.
- **Dynamic UI elements**: Components adapt fluidly to different screen sizes, ensuring a great experience on mobile and desktop.

## Folder Structure

```
weather-vite/
├── public/                  # Static assets
├── src/                     # Source code
│   ├── api/                 # API integration
│   │   └── weather/         # Weather API service
│   │       ├── weatherService.ts
│   │       └── weatherService.d.ts
│   ├── components/          # React components
│   │   ├── CityBackground/  # Dynamic background component
│   │   ├── FavoritesBar/    # Bottom navigation for favorites
│   │   ├── SearchBar/       # City search with autocomplete
│   │   ├── Ui/              # Reusable UI components
│   │   │   ├── Alert/
│   │   │   ├── ScrollButton/
│   │   │   └── Spinner/
│   │   ├── WeatherCard/     # Main weather display
│   │   ├── WeatherHourForecast/ # Hourly forecast component
│   │   └── WeatherIcon/     # Weather condition icons
│   ├── helpers/             # Utility functions
│   │   ├── date.ts          # Date and time formatting
│   │   └── ui.ts            # UI animations and effects
│   ├── hooks/               # Custom React hooks
│   │   └── weather/         # Weather-related hooks
│   │       ├── useQueryCity.ts
│   │       └── useWeather.ts
│   ├── services/            # Service layer
│   │   └── localStorage/    # Local storage management
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── .env                     # Environment variables (not in repo)
├── .env.example             # Example environment variables
├── .eslintrc.cjs            # ESLint configuration
├── .gitignore               # Git ignore rules
├── index.html               # HTML entry point
├── package.json             # Package configuration
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yayobyte/weather-vite.git
   cd weather-vite
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. Set up environment variables:

   - Rename `.env.example` to `.env`
   - Update the API keys inside the `.env` file. You will receive the correct `.env` file via email, or you can manually copy and paste the keys.

4. Run the app:

   ```sh
   npm run dev
   ```

   or

   ```sh
   yarn dev
   ```

## Deployment

The app is live at: [Weather Vite](https://weather-vite-rust.vercel.app/)

## Libraries Used

The app is built using the following libraries:

- **Vite**: Fast development build tool
- **React**: UI framework
- **TypeScript**: Typed JavaScript
- **Material UI (@mui/material, @mui/icons-material)**: UI components
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **TanStack React Query**: Data fetching and state management
- **React Swipeable Views**: Carousel and swipeable views
- **Emotion (@emotion/react, @emotion/styled)**: CSS-in-JS styling

## API References

- [Pexels API Documentation](https://www.pexels.com/api/documentation/#photos-search) (for background images)
- [Weather API Documentation](https://www.weatherapi.com/docs/) (for weather data)

## UI/UX Inspiration

Here are some design inspirations that influenced the app's look and feel:

- [Pinterest Example](https://ro.pinterest.com/pin/21532904442304349/)
- [Dribbble - Weatherman UX/UI](https://dribbble.com/shots/5819437-Weather-App-Weatherman-UX-UI?utm_source=Pinterest_Shot\&utm_campaign=erikshaldzhyan\&utm_content=Weather+App+%2F+Weatherman+%2F+UX+%2F+UI\&utm_medium=Social_Share)
- [Dribbble - Weather App](https://dribbble.com/shots/5771773-Weather-App)

## License

This project is licensed under the MIT License.

