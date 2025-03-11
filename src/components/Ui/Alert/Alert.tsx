import { Box, Typography } from "@mui/material"

type AlertProps = {
  message: string,
}

export const Alert = ({ message }: AlertProps) => {
  return (
    <Box
      sx={{
        py: 3,
        flex: 1,
        my: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
       <Typography variant="h5" sx={{ fontWeight: 200 }}>{message}</Typography>
    </Box>
  )
}