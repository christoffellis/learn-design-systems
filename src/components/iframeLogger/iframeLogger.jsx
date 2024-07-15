import React, { useEffect, useState } from 'react';
import { Slide, Box } from '@mui/material';

export const IframeLogger = ({ isPlaying, setLevel }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.level) {
                setLevel(event.data.level[0].level);
            }
            setLogs((prevLogs) => [...prevLogs, event.data]);
        };

        window.addEventListener('message', handleMessage);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [setLevel]);

    return (
        <Slide direction="right" in={isPlaying} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    width: 300, // Set your desired width
                    height: '100%',
                    background: 'rgba(15, 15, 15, 0.9)', // Change background as needed
                    boxShadow: 2, // Optional shadow
                    overflowY: 'auto', // Enable scrolling if logs exceed height
                    position: 'fixed', // Adjust positioning as needed
                    zIndex: 2,
                    top: 0,
                    left: 0,
                }}
            >
                {logs.map((log, index) => (
                    typeof log === 'string' ? (
                        <p key={index}>{log}</p>
                    ) : null
                ))}
            </Box>
        </Slide>
    );
};
