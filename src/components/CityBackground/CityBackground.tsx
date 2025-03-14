import { Box } from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';
import { usePexels } from '../../hooks/images/usePexels';
import { isDayTime } from '../../helpers/date';
import { WeatherLocation } from './../../api/weather/weatherService.d'
import { getRandomNumber } from '../../helpers/numbers';
import { RESULTS_PER_PAGE } from '../../api/images/pexelsService';

const DEFAULT_DAYTIME_IMAGE = './default_background_day.jpg'
const DEFAULT_NIGHTTIME_IMAGE = './default_background_night.jpg'
const IMAGE_CHANGE_TIMING = 20 * 1000

const getNotFoundImage = () => {
	const imageIndex = getRandomNumber(0,5)
	return `./pexels-404-${imageIndex}.jpg`
}

const getDefaultImage = () => {
	return isDayTime(new Date()) ? DEFAULT_DAYTIME_IMAGE : DEFAULT_NIGHTTIME_IMAGE
}

const cssPositionAbsoluteFromZero = {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
}

type CityBackgroundProps = {
	location?: WeatherLocation
	children: ReactNode
	isError?: boolean
	weatherConditionCode?: number
};

const CityBackground = ({ location, children, isError, weatherConditionCode }: CityBackgroundProps) => {
	const { data } = usePexels(location?.name || '', weatherConditionCode)
	const [currentImage, setCurrentImage] = useState<string>(isError ? getNotFoundImage() : getDefaultImage())
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(getRandomNumber(0,RESULTS_PER_PAGE))
	const [opacity, setOpacity] = useState<number>(1)

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

		const pexelsImage = data?.photos?.[currentImageIndex]?.src?.portrait
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

	}, [data, isError, currentImageIndex])

	useEffect(() => {
		const imageChangerTimer = setInterval(() => {
			setCurrentImageIndex(getRandomNumber(0,RESULTS_PER_PAGE))
		}, IMAGE_CHANGE_TIMING)
		return () => clearTimeout(imageChangerTimer)
	}, [data, isError, currentImageIndex])

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
					...cssPositionAbsoluteFromZero,
					backgroundImage: `url(${currentImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					opacity: opacity,
					transition: 'opacity 0.3s ease-in-out',
				}}
			/>
			<Box
				sx={{
						...cssPositionAbsoluteFromZero,
						backgroundColor: `rgba(0, 0, 0, 0.5)`,
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