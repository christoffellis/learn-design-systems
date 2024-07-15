import React, { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ScriptableIFrame } from '../ScriptableIFrame';

export const GameSection = ({ isPlaying, scripts, stylesheets, level }) => {

  return (
    <Box
      sx={{
        width: '55%',
        padding: 0,
        backgroundColor: '#faecdc',
        borderRadius: 2,
        position: 'relative', // Enable positioning for the overlay
        overflow: 'hidden', // Hide overflow
      }}
    >
      <ScriptableIFrame
        scripts={scripts}
        stylesheets={stylesheets}
        isPlaying={isPlaying}
        level={level}
      />

      {/* Gray Overlay */}
      {!isPlaying && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            backgroundColor: 'rgba(128, 128, 128, 0.5)',
            zIndex: 1, // Ensure overlay is above other content
          }}
        >
          <Typography
          >
            Stopped
          </Typography>
        </Box>
      )}

      
    </Box>
  );
};
