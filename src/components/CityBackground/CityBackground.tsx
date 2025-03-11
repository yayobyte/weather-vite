import { Box } from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';
import { usePexels } from '../../hooks/usePexels';
import { isDayTime } from '../../helpers/date';
import { WeatherLocation } from './../../api/weather/weatherService.d'
import { getRandomNumber } from '../../helpers/numbers';
import { RESULTS_PER_PAGE } from '../../api/images/pexelsService';
import { getWeatherEffect } from '../../api/weather/helpers';

const DEFAULT_DAYTIME_IMAGE = './default_background_day.jpeg'
const DEFAULT_NIGHTTIME_IMAGE = './default_background_night.jpeg'

const getNotFoundImage = () => {
	const imageIndex = getRandomNumber(0,1)
	return `./pexels-404-${imageIndex}.jpg`
}

const getWeatherEffectImageLayout = (weatherConditionCode: number | undefined) => `./${getWeatherEffect(weatherConditionCode || 0)}.jpg`

const getDefaultImage = () => {
	return isDayTime(new Date()) ? DEFAULT_DAYTIME_IMAGE : DEFAULT_NIGHTTIME_IMAGE
}

type CityBackgroundProps = {
	location?: WeatherLocation
	children: ReactNode
	isError?: boolean
	weatherConditionCode?: number
};

const CityBackground = ({ location, children, isError, weatherConditionCode }: CityBackgroundProps) => {
	const { data } = usePexels(location?.name || '')
	const [currentImage, setCurrentImage] = useState<string>(isError ? getNotFoundImage() : getDefaultImage())
	const [opacity, setOpacity] = useState<number>(1)

	
	const weatherEffect = getWeatherEffectImageLayout(weatherConditionCode)

	console.log({ weatherConditionCode, weatherEffect })

	const createFadeEffect = (image: string) => {
		setOpacity(0)
		return setTimeout(() => {
			setCurrentImage(image)
			setTimeout(() => setOpacity(1), 50)
		}, 300)
	}

	useEffect(() => {
		let notFoundListener: number | undefined, onLoadListener: number | undefined, onErrorListener: number | undefined
		if (isError) {
			const errorImage = getNotFoundImage()
			notFoundListener = createFadeEffect(errorImage)
			return;
		}

		const pexelsImage = data?.photos?.[getRandomNumber(0,RESULTS_PER_PAGE)]?.src?.portrait
		if (pexelsImage) {
			const img = new Image()
			img.src = pexelsImage

			img.onload = () => {
				onLoadListener = createFadeEffect(pexelsImage)
			}
			
			img.onerror = () => {
				console.error("Failed to load Pexels image")
				onErrorListener = createFadeEffect(getDefaultImage())
			}
		}

		return () => {
			clearTimeout(notFoundListener)
			clearTimeout(onLoadListener)
			clearTimeout(onErrorListener)
		}

	}, [data, isError])

	return (
		<Box
			sx={{
				position: 'relative',
				minHeight: '100vh',
				width: '100%',
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `url(${currentImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					opacity: opacity,
					transition: 'opacity 0.3s ease-in-out',
				}}
			/>
			{weatherEffect && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${weatherEffect})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 1,
          }}
        />
      )}
			<Box
				sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: `rgba(0, 0, 0, ${weatherEffect ? 0.3 : 0.5})`,
						zIndex: 1,
				}}
			/>
			<Box
        sx={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          p: 3,
        }}
      >
        {children}
      </Box>
		</Box>
	)
}

export default CityBackground