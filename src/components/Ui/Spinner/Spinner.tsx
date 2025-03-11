import { Box, CircularProgress } from "@mui/material"

type SpinnerProps = {
  isLoading: boolean
}

const Spinner = ({ isLoading }: SpinnerProps) => {
	if ( !isLoading ) { return (<></>)}
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
			<CircularProgress />
		</Box>
	)
}

export default Spinner