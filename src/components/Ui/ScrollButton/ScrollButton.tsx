import { IconButton, SxProps, Theme } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

type ScrollButtonPropTypes = {
  handleScroll: () => void,
  orientation: 'left' | 'right'
  size: "small" | "inherit" | "large" | "medium"
  className: string
  disabled?: boolean
  sx?: SxProps<Theme> | undefined
}

const ScrollButton = ({ handleScroll, orientation, size, className, sx, disabled = false }: ScrollButtonPropTypes) => {
  const position = orientation === 'left' ? { left: 0 } : { right: 0 }
  return (
    <IconButton
      disabled={disabled}
      className={className}
      onClick={handleScroll}
      sx={{
        position: 'absolute',
        ...position,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
        opacity: 0,
        transition: 'opacity 0.3s ease',
        ...sx,
      }}
    >
      {orientation === 'left' ? <ArrowBackIosNewIcon fontSize={size} /> : <ArrowForwardIosIcon fontSize={size} />}
    </IconButton>
  )
}

export default ScrollButton
