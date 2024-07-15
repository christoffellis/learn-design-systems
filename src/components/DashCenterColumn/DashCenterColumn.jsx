import React from 'react';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const DashCenterColumn = ({ isPlaying, setIsPlaying, setSnackbarMessage, setMainDialogOpen }) => {
  const handlePlay = () => {
    setIsPlaying(true);
    setSnackbarMessage('Game is ', isPlaying);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setSnackbarMessage('Game is ', isPlaying);
  };

  return (
    <Box
      sx={{
        width: '5%', // Adjust the width as needed
        display: 'flex',
        flexDirection: 'column', // Stack buttons vertically
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#444', // Darker background to contrast with #333
        borderRadius: 2, // Add border radius
        padding: 1, // Add some padding
      }}
    >
      {/* Play Button with Green Circle */}
      <Box
        sx={{
          position: 'relative',
          marginBottom: 1,
        }}
      >
        {isPlaying && (
          <Box
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              top: '-10px',
              left: '-10px',
            }}
          />
        )}
        <IconButton
          sx={{
            color: '#fff', // White color for contrast
            backgroundColor: isPlaying ? 'rgba(112, 255, 112, 0.5)' : 'transparent', // Light green when playing
            '&:hover': {
              backgroundColor: 'rgba(112, 255, 112, 0.7)', // Darker green on hover
            },
          }} // Set color for Play button
          onClick={handlePlay}
        >
          <PlayArrowIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Pause Button */}
      <IconButton
        sx={{
          marginBottom: 1,
          color: '#fff', // White color for contrast
          backgroundColor: !isPlaying ? 'rgba(255, 160, 112, 0.5)' : 'transparent', // Light orange when paused
          '&:hover': {
            backgroundColor: 'rgba(255, 160, 112, 0.7)', // Darker orange on hover
          },
        }} // Space between buttons
        onClick={handlePause}
      >
        <PauseIcon />
      </IconButton>

      {/* Help Button */}
      <IconButton
        sx={{ color: '#fff' }} // Set color for Help icon
        onClick={() => setMainDialogOpen(true)}
      >
        <HelpOutlineIcon />
      </IconButton>
    </Box>
  );
};
