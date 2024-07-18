import React from 'react';
import { SimpleTreeView, TreeItem2 } from '@mui/x-tree-view';
import { Box, Typography } from '@mui/material';

const buildTree = (scripts) => {
  const tree = {};

  scripts.forEach(({ name, content }) => {
    const parts = name.split('/');
    let currentLevel = tree;

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {
          id: `${index}-${part}`,
          name: part,
          children: {},
          content: index === parts.length - 1 ? content : null,
        };
      }
      currentLevel = currentLevel[part].children;
    });
  });

  const convertTreeToArray = (node, id = '') => {
    return Object.keys(node).map((key) => ({
      id: `${id}/${node[key].name}`,
      name: node[key].name,
      content: node[key].content,
      children: convertTreeToArray(node[key].children, `${id}/${node[key].name}`),
    }));
  };

  return convertTreeToArray(tree);
};

const renderTree = (nodes, handleClick) => (
  <TreeItem2
    sx={{
      color: '#eee'
    }}
    key={nodes.id}
    itemId={nodes.id}
    label={nodes.name}
    onClick={() => {
      if (!nodes.children.length) {
        handleClick({ name: nodes.name, content: nodes.content });
      }
    }}
  >
    {Array.isArray(nodes.children) &&
      nodes.children.map((node) => renderTree(node, handleClick))}
  </TreeItem2>
);

export const FileTreeView = ({ scripts, showSidebar, setCurrentFile }) => {
  const treeData = buildTree(scripts);

  const handleClick = (file) => {
    setCurrentFile({
      name: file.name || '',
      code: file.content || '',
    });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: showSidebar ? 0 : '-200px',
        width: '210px',
        height: '100%',
        backgroundColor: '#444',
        transition: 'left 0.3s ease-in-out',
        boxShadow: 3,
        zIndex: 10,
      }}
    >
      <SimpleTreeView>
        {treeData.map((data) => renderTree(data, handleClick))}
      </SimpleTreeView>
    </Box>
  );
};
