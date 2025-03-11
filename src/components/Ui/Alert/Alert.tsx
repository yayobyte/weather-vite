import { Box, Typography } from "@mui/material"
import { AlertCircle } from "lucide-react";


type AlertVariant = 'error' | 'warning' | 'info'

type AlertProps = {
  message: string,
  variant?: AlertVariant
}

const variantColor: Record<AlertVariant, React.CSSProperties> = {
  error: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    border: "1px solid rgba(255, 0, 0, 0.5)"
  },
  warning: {
    backgroundColor: "rgba(255, 165, 0, 0.1)", 
    border: "1px solid rgba(255, 165, 0, 0.5)"
  },
  info: {
    backgroundColor: "rgba(0, 0, 255, 0.1)",
    border: "1px solid rgba(0, 0, 255, 0.5)"
  }
}

export const Alert = ({ message, variant = 'error' }: AlertProps) => {
  return (
    <Box
      sx={{
        ...variantColor[variant],
        py: 3,
        px: 2,
        borderRadius: 1,
        flex: 1,
        my: 2,
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backdropFilter: "blur(4px)",
      }}
    >
       <AlertCircle size={50}/>
       <Typography variant="body1" sx={{ mt: 3 }}>Error: {message}</Typography>
    </Box>
  )
}