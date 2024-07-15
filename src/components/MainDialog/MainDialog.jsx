import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Pagination,
} from '@mui/material';
import { LevelData } from '../../enums';

export const MainDialog = ({ level, open, onClose }) => {
  const [prevLevel, setPrevLevel] = useState(level.level);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1; // Number of items to display per page
  const text = showSuccessMessage ? LevelData[level.level - 1]?.successText :  LevelData[level.level]?.content || [];
  const totalPages = Math.ceil(text.length / itemsPerPage);

  useEffect(() => {
    if (level.level > prevLevel) {
      setShowSuccessMessage(true);
      setPrevLevel(level.level);
      setCurrentPage(1); // Reset to the first page for the new level
    }
  }, [level.level, prevLevel]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  // Function to render HTML content as Material-UI Typography components
  const renderContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    return Array.from(doc.body.childNodes).map((node, index) => {
      if (node.nodeName === 'P') {
        return (
          <Typography key={index} variant="body1" paragraph>
            {Array.from(node.childNodes).map((childNode, childIndex) => {
              if (childNode.nodeName === 'CODE') {
                return (
                  <Typography
                    key={childIndex}
                    component="code"
                    sx={{
                      backgroundColor: '#252525',
                      padding: '2px 4px',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {childNode.innerText}
                  </Typography>
                );
              } else
              if (childNode.nodeName === 'B') {
                return (
                  <Typography
                    key={childIndex}
                    component="code"
                    sx={{
                      fontWeight: 'bold'
                    }}
                  >
                    {childNode.innerText}
                  </Typography>
                );
              }
              return childNode.nodeType === Node.TEXT_NODE ? childNode.textContent : null;
            })}
          </Typography>
        );
      }
      if (node.nodeName === 'PRE') {
        return (
          <Typography key={index} variant="body1" component="pre" sx={{ backgroundColor: '#252525', padding: '8px', borderRadius: '4px' }}>
            {node.innerText}
          </Typography>
        );
      }
      return null;
    });
  };

  // Get the current content based on the current page
  const currentContent = text.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#333',
          color: '#f3f3f3'
        }}
      >
        {showSuccessMessage ? LevelData[level.level - 1]?.title : LevelData[level.level]?.title}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#333',
          color: '#f3f3f3',
          animation: 'height 0.3s ease-in-out',
          '& .MuiDialogContent-root': {
            backgroundColor: '#444',
          },
        }}
      >
        {showSuccessMessage && (
          <Typography variant="h6" color="success.main" paragraph>
            {LevelData[prevLevel]?.successMessage}
          </Typography>
        )}
        {currentContent.map((item, index) => renderContent(item))} {/* Render the HTML content */}
      </DialogContent>

      {totalPages > 1 && <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#333',
          padding: '16px',
          '& .MuiPaginationItem-root': {
            color: '#f3f3f3',
          },
          '& .Mui-selected': {
            backgroundColor: '#555',
            color: '#fff',
          },
          '& .MuiPaginationItem-ellipsis': {
            color: '#f3f3f3',
          },
        }}
      />}
      <DialogActions
        sx={{
          backgroundColor: '#333',
          color: '#f3f3f3'
        }}
      >

        <Button variant="outlined" onClick={() => {
          if (showSuccessMessage)
          {
            setShowSuccessMessage(false);
          }
          else
          {
            onClose();
          }
          
          }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
