import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { IframeLogger } from '../../components';
import { FileTreeView } from '../../components/FileTreeView';

// Define custom theme for Monaco editor
monaco.editor.defineTheme('myCustomTheme', {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '008800', fontStyle: 'italic' },
    { token: 'keyword', foreground: '0000ff' },
    { token: 'variable', foreground: '000000' },
    { token: 'number', foreground: 'ff0000' },
    { token: 'string', foreground: 'a31515' },
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#000000',
    'editorCursor.foreground': '#8B0000',
    'editor.lineHighlightBackground': '#0000FF20',
    'editor.lineHighlightBorder': '#0000FF',
  }
});

export const CodeEditor = ({ fileCode, setFileCode, isPlaying, setLevel, level }) => {
  const [currentFile, setCurrentFile] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (fileCode) {
        for (const file of fileCode)
        {
          if (file.editable)
          {
            setCurrentFile({
              name: file.name || '',
              code: file.content || '',
            })
          }
        }
    }
  }, [level.level]);

  const handleEditorChange = (value) => {
    const newFileCode = fileCode.map((file) => {
      console.log(currentFile.name, `/${file.name}`);
      if (`/${file.name}` === currentFile.name) {
        console.log(value);
        return {
          ...file,
          content: value, // Update the content property
        };
      }
      return file; // Return the file unchanged
    });

    setFileCode(newFileCode);
  };

  const handleMouseMove = (event) => {
    if (showSidebar)
    {
      if (event.clientX <= 200) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    }
    else
    {
      if (event.clientX <= 50) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    }
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        padding: 0,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        position: 'relative', // Add relative positioning
      }}
    >
      <Box
        sx={{
          padding: 1,
          backgroundColor: '#222',
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}
      >
        {currentFile?.name || 'No file selected'}
      </Box>

      <IframeLogger isPlaying={isPlaying} setLevel={setLevel}/>

      {currentFile &&
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={currentFile.code} // Use the code for the current file
        onChange={handleEditorChange} // Handle changes
      />}

      <FileTreeView
        scripts={fileCode}
        showSidebar={showSidebar}
        setCurrentFile={setCurrentFile}
      />
    </Box>
  );
};

export default CodeEditor;
