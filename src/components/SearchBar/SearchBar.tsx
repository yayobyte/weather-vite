import { ChangeEvent, FormEvent, useState, useRef, useEffect, useCallback } from 'react'
import { Box, CircularProgress, IconButton, InputBase, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SearchCityResponse } from '../../api/weather/weatherService.d'

export const MIN_SEARCH_CHARS = 3
const DEBOUNCE_DELAY = 500

type SearchBarProps = {
	onSearch: (city: string) => void
	setIsListOpened: (isOpened: boolean) => void
	setDebouncedValue: React.Dispatch<React.SetStateAction<string>>
	isLoading: boolean
	data: SearchCityResponse | undefined
}

const SearchBar = ({ onSearch, setIsListOpened, setDebouncedValue, isLoading, data }: SearchBarProps) => {
	const [inputValue, setInputValue] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
	const [isItemSelected, setIsItemSelected] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)
	const suggestionListRef = useRef<HTMLDivElement>(null)

	const setIsListOpen = useCallback((isListOpened: boolean) => {
		setShowSuggestions(isListOpened)
		setIsListOpened(isListOpened)
	}, [setIsListOpened])

	const setPristineInput = useCallback(() => {
		setDebouncedValue('')
		setInputValue('')
	}, [])

	const handleClickButton = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (inputValue.trim()) {
			onSearch(inputValue)
			inputRef.current?.blur()
			setIsItemSelected(true)
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setInputValue(e.target.value)
		setIsItemSelected(false)
	}

	const handleSelectSuggestion = (city: string) => {
    setInputValue(city)
    onSearch(city)
    setIsListOpen(false)
    inputRef.current?.blur()
		setIsItemSelected(true)
		setPristineInput()
  }

	useEffect(() => {
		if(isItemSelected) return

		let timerListener: number
		if(inputValue.length >= MIN_SEARCH_CHARS) {
			timerListener = setTimeout(() => {
				setDebouncedValue(inputValue)
				setIsListOpen(true)
			}, DEBOUNCE_DELAY)
		} else {
			setIsListOpen(false)
		}
		return () => {
			clearTimeout(timerListener)
		}
	}, [inputValue, isItemSelected, setDebouncedValue, setIsListOpen])

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const isClickOnInput = inputRef.current && inputRef.current.contains(e.target as Node)
      const isClickOnSuggestionList = suggestionListRef.current && suggestionListRef.current.contains(e.target as Node)
      
      if (!isClickOnInput && !isClickOnSuggestionList) {
        setIsListOpen(false)
      } else {
				setIsListOpen(true)
			}
		}
		
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
}, [setIsListOpen, setPristineInput])

	return (
		<Box sx={{ position: 'relative', my: 2 }}>
			<Box component="form" onSubmit={handleClickButton} sx={{ my: 2 }}>
				<Paper elevation={4}>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<InputBase
							inputRef={inputRef}
							onChange={handleInputChange}
							value={inputValue}
							placeholder="Search for a city..."
							fullWidth
							sx={{ ml: 1 }}
							endAdornment={
								isLoading && inputValue.length >= MIN_SEARCH_CHARS && 
								<CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
							}
						/>
						<IconButton type='submit' sx={{ p: 1 }}>
							<SearchIcon />
						</IconButton>
					</Box>
					
				</Paper>   
			</Box>
			{(showSuggestions && !!data?.length) && (
				<Paper
					ref={suggestionListRef}
					sx={{ 
						position: 'absolute', 
						width: '100%', 
						mt: 0.5, 
						maxHeight: 300,
						overflowY: 'auto',
						zIndex: 10,
						backdropFilter: 'blur(6px)',
						background: 'rgba(255, 255, 255, 0.05)'
					}}
				>
					<List dense>
						{data.map((city) => (
							<ListItemButton
								key={city.id}
								onClick={() => handleSelectSuggestion(city.name)}
							>
								<ListItemText
									primary={<Typography variant='h6'>{city.name}</Typography>}
									secondary={<Typography variant='body1' sx={{ fontWeight: 200 }}>{city.country}</Typography>}
								/>
							</ListItemButton>
						))}
					</List>
				</Paper>
			)}
		</Box>
	)
}

export default SearchBar