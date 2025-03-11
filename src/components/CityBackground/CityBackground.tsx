import { Box } from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';
import { usePexels } from '../../hooks/usePexels';
import { isDayTime } from '../../helpers/date';
import { WeatherLocation } from './../../api/weather/weatherService.d'
import { getRandomNumber } from '../../helpers/numbers';
import { RESULTS_PER_PAGE } from '../../api/images/pexelsService';

const DEFAULT_DAYTIME_IMAGE = './default_background_day.jpeg'
const DEFAULT_NIGHTTIME_IMAGE = './default_background_night.jpeg'

const getNotFoundImage = () => {
	const imageIndex = getRandomNumber(0,1)
	return `./pexels-404-${imageIndex}.jpg`
}

const getDefaultImage = () => {
	return isDayTime(new Date()) ? DEFAULT_DAYTIME_IMAGE : DEFAULT_NIGHTTIME_IMAGE
}

type CityBackgroundProps = {
	location?: WeatherLocation;
	children: ReactNode;
	isError?: boolean
};

const CityBackground = ({ location, children, isError = false }: CityBackgroundProps) => {
	const { data } = usePexels(location?.name || '')
	const [currentImage, setCurrentImage] = useState<string>(getDefaultImage())
	const [imageLoaded, setImageLoaded] = useState<boolean>(true)

	useEffect(() => {
		const pexelsImage = data?.photos?.[getRandomNumber(0,RESULTS_PER_PAGE)]?.src?.portrait
		if (pexelsImage) {
			const img = new Image()
			img.src = pexelsImage

			img.onload = () => {
				setImageLoaded(false)
				
				setTimeout(() => {
					setCurrentImage(isError ? getNotFoundImage() : pexelsImage)
					setImageLoaded(true)
				}, 300)
			}
			
			img.onerror = () => {
				console.error("Failed to load Pexels image")
				setCurrentImage(getDefaultImage())
				setImageLoaded(true)
			}
		}
}, [data])

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
					opacity: imageLoaded ? 1 : 0,
					transition: 'opacity 0.3s ease-in-out',
				}}
			/>
			<Box
				sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
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