import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		text: {
			primary: '#ffffff',
			secondary: 'rgba(255, 255, 255, 0.7)',
		},
	},
	typography: {
		fontFamily: "'Raleway', sans-serif",
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(0, 0, 0, 0.25)',
					backdropFilter: 'blur(2px)',
					color: '#ffffff',
					background: 'rgba(255, 255, 255, 0.1)',
					border: '1px solid rgba(255, 255, 255, 0.18)',
					padding: 3,
					borderRadius: 8,
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
					root: {
						paddingLeft: 8,
						paddingRight: 8,
						flex: 1,
					},
					input: {
						padding: 1,
						borderRadius: 8,
					},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: '#ffffff',
				},
				h1: {
					fontFamily: "'Roboto Flex', sans-serif",
					fontWeight: 100,
					fontSize: '6rem',
				},
				h3: {
					fontSize: '2rem'
				},
				body2: {
					color: 'rgba(255, 255, 255, 0.8)',
					fontWeight: 200,
				},
			},
		},
	},
})