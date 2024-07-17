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

    React.useEffect(() => {
        if (isPlaying)
        {
            setLogs([]);    
        }
    }, [isPlaying])

    return (
        <Slide direction="right" in={isPlaying} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    width: 300, // Set your desired width
                    background: '#222', // Solid grey background
                    overflowY: 'auto', // Enable scrolling if logs exceed height
                    position: 'fixed', // Adjust positioning as needed
                    zIndex: 2,
                    top: 0,
                    left: 0,
                    margin: 2.5, // Margin
                    border: '4px solid #484848', // Border with less dark grey
                    borderRadius: 2,
                    color: 'white', // White text color
                    fontFamily: 'monospace', // Monospaced font
                    padding: 2.5, // Padding inside the box
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
