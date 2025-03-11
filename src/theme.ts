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
		fontFamily: "'Roboto', sans-serif",
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
					borderRadius: 2,
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
					root: {
						paddingLeft: 8,
						paddingRight: 8,
					},
					input: {
						padding: '8px',
					},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: '#ffffff',
				},
				body2: {
					color: 'rgba(255, 255, 255, 0.7)',
				},
			},
		},
	},
})