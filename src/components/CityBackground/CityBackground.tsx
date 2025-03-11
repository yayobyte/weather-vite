import { Box } from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';
import { usePexels } from '../../hooks/usePexels';



const DEFAULT_DAYTIME_IMAGE = './default_background_day.jpeg'
const DEFAULT_NIGHTTIME_IMAGE = './default_background_night.jpeg'

const getDefaultImage = () => {
	const now = new Date()
	const hours = now.getHours()
	const isDayTime = hours >= 6 && hours < 18
	return isDayTime ? DEFAULT_DAYTIME_IMAGE : DEFAULT_NIGHTTIME_IMAGE
}

type CityBackgroundProps = {
	location: string;
	children: ReactNode;
};

const CityBackground = ({ location, children }: CityBackgroundProps) => {
	const { data } = usePexels(location)
	const [currentImage, setCurrentImage] = useState<string>(getDefaultImage())
	const [imageLoaded, setImageLoaded] = useState<boolean>(true)

	useEffect(() => {
		if (data?.photos?.[0]?.src?.portrait) {
			const pexelsImage = data.photos[0].src.portrait
			
			const img = new Image()
			img.src = pexelsImage

			img.onload = () => {
				setImageLoaded(false)
				setTimeout(() => {
					setCurrentImage(pexelsImage)
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