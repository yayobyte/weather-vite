import { Box } from '@mui/material';
import { ReactNode } from 'react';
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

	const backgroundImage = data?.photos?.[0].src.portrait || getDefaultImage()

	return (
		<Box
			sx={{
				position: 'relative',
				minHeight: '100vh',
				width: '100%',
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					zIndex: 1,
				},
			}}
		>
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