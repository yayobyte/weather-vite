import { ChangeEvent, MouseEvent, useState } from 'react'

type SearchBarProps = {
    onSearch: (city: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState<string>('')
    const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onSearch(inputValue)
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputValue(e.target.value)
    }
    return (
        <>
            <form>
                <input onChange={handleInputChange} value={inputValue} />
                <button onClick={handleClickButton}>
                    Search
                </button>
            </form>   
        </>
    )
}

export default SearchBar