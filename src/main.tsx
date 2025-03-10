import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { theme } from './theme.ts'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
	<QueryClientProvider client={queryClient}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</QueryClientProvider>
	</StrictMode>,
)
