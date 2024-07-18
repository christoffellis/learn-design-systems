import React, { useEffect, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { CodeEditor } from '../codeEditor';
import { DashCenterColumn, GameSection, MainDialog } from '../../components';
import { LevelEnums } from '../../enums';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State for player status
  const [mainDialogOpen, setMainDialogOpen] = useState(true);
  const [level, setLevel] = useState({ level: 1, maxReachedLevel: 0 }); // State for level enum
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [scripts, setScripts] = useState([]);
  const [stylesheets, setStylesheets] = useState([]);

  useEffect(() => {
    if (snackbarMessage) {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage]);

  useEffect(() => {
    setSnackbarMessage(isPlaying ? "Game is now Playing!" : "Game is Paused!");
  }, [isPlaying]);

  const scriptFiles = [
    {
      name: 'main.js',
      editable: false,
      minActiveLevel: LevelEnums.Singleton,
    },
    {
      name: 'factoryClass.js',
      editable: false,
      minActiveLevel: LevelEnums.Singleton,
    },
    { 
      name: 'level1/management.js',
      editable: true,
      minActiveLevel: LevelEnums.Singleton,
    },
    { 
      name: 'level2/loadingBay.js',
      editable: true,
      minActiveLevel: LevelEnums.ObjectPool,
    },
    { 
      name: 'level2/deliveryTruck.js',
      editable: true,
      minActiveLevel: LevelEnums.ObjectPool,
    },
  ];
  const sheetFiles = ['style.css'];

  useEffect(() => {
    const loadEditableFiles = async () => {
      const filePromises = scriptFiles.map(async (file) => {
          try {
            const response = await fetch(`iframeScripts/${file.name}`);
            const content = await response.text();
            return { ...file, content };
          } catch (error) {
            console.error('Error loading editable file:', error);
            return { name: '', content: '', editable: false, minActiveLevel: 0 }; // Return empty in case of error
          }
      });

      const fileContents = await Promise.all(filePromises);
      console.log(fileContents);
      setScripts(fileContents); // Update state
    };

    loadEditableFiles();
    setStylesheets(sheetFiles); // Set stylesheets directly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (level) {
      setMainDialogOpen(true);
    }
  }, [level.level]);

  const handleLevelChange = (newLevel) => {
    if (newLevel > level.maxReachedLevel) {
      setLevel((prev) => ({ ...prev, level: newLevel, maxReachedLevel: Math.max(prev.maxReachedLevel, newLevel) }));
    } else {
      setLevel((prev) => ({ ...prev, level: newLevel }));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding={2}
      gap={2}
      sx={{ height: '95vh', backgroundColor: '#333' }}
    >
      <CodeEditor fileCode={scripts} setFileCode={setScripts} isPlaying={isPlaying} setLevel={handleLevelChange} level={level} />

      <DashCenterColumn
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSnackbarMessage={setSnackbarMessage}
        setLevel={handleLevelChange}
        setMainDialogOpen={setMainDialogOpen}
      />

      <GameSection
        isPlaying={isPlaying}
        scripts={scripts}
        stylesheets={sheetFiles}
        level={level}
      />

      <MainDialog level={level} open={mainDialogOpen} onClose={() => setMainDialogOpen(false)} />

      {/* Snackbar Toast */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" color="warning" variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
