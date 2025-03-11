import { ChangeEvent, FormEvent, useState } from 'react'
import { Box, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

type SearchBarProps = {
	onSearch: (city: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [inputValue, setInputValue] = useState<string>('')
	const handleClickButton = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (inputValue.trim()) {
			onSearch(inputValue)
		}
	}
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setInputValue(e.target.value)
	}
	return (
		<Box component="form" onSubmit={handleClickButton}>
			<Paper
				elevation={4}
				sx={{ 
					display: 'flex', 
					alignItems: 'center',
				}}
			>
				<InputBase
					onChange={handleInputChange}
					value={inputValue}
					placeholder="Search for a city..."
				/>
				<IconButton type='submit'>
					<SearchIcon />
				</IconButton>
			</Paper>   
		</Box>
	)
}

export default SearchBar