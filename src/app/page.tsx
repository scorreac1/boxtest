"use client";
import React, { useState, useEffect } from 'react';
import { getFolderItems } from './boxClient';

const App: React.FC = () => {
  const [folderItems, setFolderItems] = useState<any[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string>('0'); // 
  const [folderStack, setFolderStack] = useState<string[]>([]); 
  const accessToken = '################'; 

  useEffect(() => {
    async function fetchFolderItems() {
      try {
        const items = await getFolderItems(accessToken, currentFolderId);
        setFolderItems(items);
      } catch (error) {
        console.error('Error fetching folder items:', error);
      }
    }
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
              <span onClick={() => handleFolderClick(item.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                {item.name}
              </span>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

