"use client";
import React, { useState, useEffect } from 'react';
import { getFolderItems, getDownloadUrl } from '@/lib/boxapi';
import { mergePdfs } from '@/lib/pdfco';
import { createMergePdfPayload } from '@/lib/resources';

type BoxItem = {
  id: string;
  name: string;
  type: string;
};

type FileLinkItem = {
  fileId: string;
  link: string;
  type: string;
}

export const formatFileArray = (files: Array<FileLinkItem>): Array<string> => {
  return files.map(file => file.link);
}

const App: React.FC = () => {
  const [folderItems, setFolderItems] = useState<BoxItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string>('0'); 
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<BoxItem[]>([]); 
  const [shareLinks, setShareLinks] = useState<any[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const accessToken = '##############'; 
  const PDFCO_API_KEY = '##############'; 


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

  const addFile = (file: BoxItem) => {
    if (!isFileAdded(file.id)) {
      setSelectedFiles([...selectedFiles, { id: file.id, name: file.name, type: file.type }]);
    }
  };

  const handleFileClick = (file: BoxItem) => {
    addFile(file);
  };

  const generateLinks = async (files: Array<BoxItem>) => { 
    const links = [];
    for (const file of files) {
      const fileId = file.id;
      try {
        const accessLinkBoxFile = await getDownloadUrl(accessToken, fileId);   //change function call to createSharedLink or ...WithExpiration
        links.push({ fileId, link: accessLinkBoxFile, type: 'downloadurl' });
      } catch (error) {
        console.error(`Error creating shared link for file ${fileId}:`, error);
      }
    }
    setShareLinks(links); 
  };

  const handleMergePdfs = async (urls: Array<string>) => {
    const jsonPayload = createMergePdfPayload(urls); 
    const { mergedPdfUrl, error } = await mergePdfs(PDFCO_API_KEY, jsonPayload); 

    setMergedPdfUrl(mergedPdfUrl);
    setError(error); 
  };

  return (
    <div>
      <h1>Box Folders & Files</h1>
      {folderStack.length > 0 && (
        <button onClick={handleBackClick}>Back</button>
      )}
      <ul>
        {folderItems.map((item) => (
          <li key={item.id}> {/* Each child in a list should have a unique "key" prop. */}
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

      <br />
      <h2>Selected Files</h2>
      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}> 
            {file.name} index (ID: {file.id})
          </li>
        ))}
      </ul>

      <br />
      <h1>Generate Share Links</h1>
      <button onClick={() => generateLinks(selectedFiles)}>Generate Links</button>
      <ul>
        {shareLinks.map((filesToMerge, index) => (
          <li key={index}>
            {filesToMerge.type} link for file {filesToMerge.fileId}: <a href={filesToMerge.link} target="_blank" rel="noopener noreferrer">{filesToMerge.link}</a>
          </li>
        ))}
      </ul>

      <br />
      <h1>Merging PDFs Section</h1>
      <button onClick={() => handleMergePdfs(formatFileArray(shareLinks))}>Merge PDFs</button>
      {mergedPdfUrl && (
        <div>
            <h2>Merged PDF</h2>
            <a href={mergedPdfUrl} target="_blank" rel="noopener noreferrer">Download Merged PDF</a>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
            <h2>Error</h2>
            <p>{error}</p>
        </div>
      )}

    </div>
  );
};

export default App;


// ILOVEPDF Error... Failed to initialize task: Internal Server Error - {"error":{"type":"ServerError","message":"Something on our end went wrong, probably we are not catching some exception we should catch! We are logging this and we will fix it.","code":"500"}}