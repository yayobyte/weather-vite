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
		<Box component="form" onSubmit={handleClickButton} sx={{ my: 2 }}>
			<Paper elevation={4}>
				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
					<InputBase
						onChange={handleInputChange}
						value={inputValue}
						placeholder="Search for a city..."
					/>
					<IconButton type='submit'>
						<SearchIcon />
					</IconButton>
				</Box>
				
			</Paper>   
		</Box>
	)
}

export default SearchBar