import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Slide, Tooltip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { ForecastResponse } from '../../api/weather/weatherService.d';
import { smoothScroll } from '../../helpers/ui';
import ScrollButton from '../Ui/ScrollButton/ScrollButton';

interface FavoritesBarProps {
  favorites: ForecastResponse[]
  onAddClick: () => void
  currentIndex: number
  onSelectFavorite: (index: number) => void
}

const FavoritesBar = ({ favorites, onAddClick, currentIndex, onSelectFavorite }: FavoritesBarProps) => {
  const [showNav, setShowNav] = useState(favorites.length > 0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowNav(favorites.length > 0)
  }, [favorites.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (favorites.length <= 1) return
      
      if (e.key === 'ArrowRight' && currentIndex < favorites.length - 1) {
        onSelectFavorite(currentIndex + 1)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectFavorite(currentIndex - 1)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, favorites, onSelectFavorite])

  const handlePrevCity = () => {
    if (currentIndex > 0) {
      onSelectFavorite(currentIndex - 1)
    }
  }

  const handleNextCity = () => {
    if (currentIndex < favorites.length - 1) {
      onSelectFavorite(currentIndex + 1)
    }
  }

  useEffect(() => {
    if (barRef.current) {
      const dotWidth = 16
      const centerOffset = barRef.current.offsetWidth / 2 - dotWidth / 2
      const scrollTarget = currentIndex * dotWidth - centerOffset + dotWidth * 2
      
      smoothScroll(barRef, scrollTarget, { 
        axis: 'x',
        duration: 300
      })
    }
  }, [currentIndex, favorites.length])

  if (favorites.length === 0) {
    return null
  }

  return (
    <Slide direction="up" in={showNav} mountOnEnter unmountOnExit timeout={500}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          zIndex: 1000,
          opacity: showNav ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {favorites.length > 1 && (
          <ScrollButton
            handleScroll={handlePrevCity}
            orientation="left"
            size="medium"
            className="left-arrow"
            disabled={currentIndex === 0}
            sx={{
              color: 'white',
              opacity: currentIndex === favorites.length - 1 ? 0.5 : 1,
              display: 'flex',
              ml: 2,
              backgroundColor: null,
              '&:hover': null,
            }}
          />
        )}
        
        <Box
          ref={barRef}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            mx: 2
          }}
        >
          {favorites.map((city, index) => (
            <Box
              key={`${city.location.name}-${index}`}
              onClick={() => onSelectFavorite(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                mx: 0.5,
                transform: index === currentIndex ? 'scale(1.4)' : 'scale(1)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            />
          ))}
          
          <Tooltip title="Add new city">
            <IconButton 
              onClick={onAddClick}
              sx={{ 
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              <LocationOn />
            </IconButton>
          </Tooltip>
        </Box>
        
        {favorites.length > 1 && (
          <ScrollButton
            handleScroll={handleNextCity}
            orientation="right"
            size="medium"
            className="left-arrow"
            disabled={currentIndex === favorites.length - 1}
            sx={{
              color: 'white',
              opacity: currentIndex === favorites.length - 1 ? 0.5 : 1,
              display: 'flex',
              mr: 2,
              backgroundColor: null,
              '&:hover': null,
            }}
          />
        )}
      </Box>
    </Slide>
  )
}

export default FavoritesBar