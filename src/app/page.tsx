"use client";
import React, { useState, useEffect } from 'react';
import { getFolderItems } from './boxClient';

type FileItem = {
  id: string;
  name: string;
  type: string;
};

const App: React.FC = () => {
  const [folderItems, setFolderItems] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string>('0'); 
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]); 
  const accessToken = '##################'; 

  useEffect(() => {
    const fetchFolderItems = () => {
      getFolderItems(accessToken, currentFolderId)
        .then(items => setFolderItems(items))
        .catch(error => console.error('Error fetching folder items:', error));
    };
    fetchFolderItems();
  }, [accessToken, currentFolderId]);

  const handleFolderClick = (folderId: string) => {
    setFolderStack([...folderStack, currentFolderId]);
    setCurrentFolderId(folderId);
  };

  const handleBackClick = () => {
    const newFolderStack = [...folderStack];
    const parentFolderId = newFolderStack.pop();
    if (parentFolderId !== undefined) {
      setCurrentFolderId(parentFolderId);
      setFolderStack(newFolderStack);
    }
  };

  const isFileAdded = (fileId: string) => {
    return selectedFiles.some(file => file.id === fileId);
  };

  const addFile = (file: FileItem) => {
    if (!isFileAdded(file.id)) {
      setSelectedFiles([...selectedFiles, { id: file.id, name: file.name, type: file.type }]);
    }
  };

  const handleFileClick = (file: FileItem) => {
    addFile(file);
  };

  return (
    <div>
      <h1>Box Folders & Files</h1>
      {folderStack.length > 0 && (
        <button onClick={handleBackClick}>Back</button>
      )}
      <ul>
        {folderItems.map((item) => (
          <li key={item.id}>
            {item.type === 'folder' ? (
              <span onClick={() => handleFolderClick(item.id)} style={{ cursor: 'pointer', color: 'lightblue' }}>
                {item.name}
              </span>
            ) : (
              <span onClick={() => handleFileClick(item)} style={{ cursor: 'pointer' }}>
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
      <br /><br />
      <h2>Selected Files</h2>
      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>
            {file.name} (ID: {file.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
