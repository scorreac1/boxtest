"use client";
import React, { useState, useEffect } from 'react';
// import { getFolderItems, getDownloadUrl } from '@/lib/boxapi';
// import { mergePdfs } from '@/lib/pdfco';
// import { createMergePdfPayload } from '@/lib/resources';

// type BoxItem = {
//   id: string;
//   name: string;
//   type: string;
// };

// type FileLinkItem = {
//   fileId: string;
//   link: string;
//   type: string;
// }

// export const formatFileArray = (files: Array<FileLinkItem>): Array<string> => {
//   return files.map(file => file.link);
// }

// const App: React.FC = () => {
//   const [folderItems, setFolderItems] = useState<BoxItem[]>([]);
//   const [currentFolderId, setCurrentFolderId] = useState<string>('0'); 
//   const [folderStack, setFolderStack] = useState<string[]>([]);
//   const [selectedFiles, setSelectedFiles] = useState<BoxItem[]>([]); 
//   const [shareLinks, setShareLinks] = useState<any[]>([]);
//   const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);


//   const accessToken = 'NBVEZX8SY6iz6XifjRsA3x6dQiURPfPo'; 
//   const PDFCO_API_KEY = '##############'; 


//   useEffect(() => {
//     const fetchFolderItems = () => {
//       getFolderItems(accessToken, currentFolderId)
//         .then(items => setFolderItems(items))
//         .catch(error => console.error('Error fetching folder items:', error));
//     };
//     fetchFolderItems();
//   }, [accessToken, currentFolderId]);

//   const handleFolderClick = (folderId: string) => {
//     setFolderStack([...folderStack, currentFolderId]);
//     setCurrentFolderId(folderId);
//   };

//   const handleBackClick = () => {
//     const newFolderStack = [...folderStack];
//     const parentFolderId = newFolderStack.pop();
//     if (parentFolderId !== undefined) {
//       setCurrentFolderId(parentFolderId);
//       setFolderStack(newFolderStack);
//     }
//   };

//   const isFileAdded = (fileId: string) => {
//     return selectedFiles.some(file => file.id === fileId);
//   };

//   const addFile = (file: BoxItem) => {
//     if (!isFileAdded(file.id)) {
//       setSelectedFiles([...selectedFiles, { id: file.id, name: file.name, type: file.type }]);
//     }
//   };

//   const handleFileClick = (file: BoxItem) => {
//     addFile(file);
//   };

//   const generateLinks = async (files: Array<BoxItem>) => { 
//     const links = [];
//     for (const file of files) {
//       const fileId = file.id;
//       try {
//         const accessLinkBoxFile = await getDownloadUrl(accessToken, fileId);   //change function call to createSharedLink or ...WithExpiration
//         links.push({ fileId, link: accessLinkBoxFile, type: 'downloadurl' });
//       } catch (error) {
//         console.error(`Error creating shared link for file ${fileId}:`, error);
//       }
//     }
//     setShareLinks(links); 
//   };

//   const handleMergePdfs = async (urls: Array<string>) => {
//     const jsonPayload = createMergePdfPayload(urls); 
//     const { mergedPdfUrl, error } = await mergePdfs(PDFCO_API_KEY, jsonPayload); 

//     setMergedPdfUrl(mergedPdfUrl);
//     setError(error); 
//   };

//   return (
//     <div>
//       <h1>Box Folders & Files</h1>
//       {folderStack.length > 0 && (
//         <button onClick={handleBackClick}>Back</button>
//       )}
//       <ul>
//         {folderItems.map((item) => (
//           <li key={item.id}> {/* Each child in a list should have a unique "key" prop. */}
//             {item.type === 'folder' ? (
//               <span onClick={() => handleFolderClick(item.id)} style={{ cursor: 'pointer', color: 'lightblue' }}>
//                 {item.name}
//               </span>
//             ) : (
//               <span onClick={() => handleFileClick(item)} style={{ cursor: 'pointer' }}>
//                 {item.name}
//               </span>
//             )}
//           </li>
//         ))}
//       </ul>

//       <br />
//       <h2>Selected Files</h2>
//       <ul>
//         {selectedFiles.map((file, index) => (
//           <li key={index}> 
//             {file.name} index (ID: {file.id})
//           </li>
//         ))}
//       </ul>

//       <br />
//       <h1>Generate Share Links</h1>
//       <button onClick={() => generateLinks(selectedFiles)}>Generate Links</button>
//       <ul>
//         {shareLinks.map((filesToMerge, index) => (
//           <li key={index}>
//             {filesToMerge.type} link for file {filesToMerge.fileId}: <a href={filesToMerge.link} target="_blank" rel="noopener noreferrer">{filesToMerge.link}</a>
//           </li>
//         ))}
//       </ul>

//       <br />
//       <h1>Merging PDFs Section</h1>
//       <button onClick={() => handleMergePdfs(formatFileArray(shareLinks))}>Merge PDFs</button>
//       {mergedPdfUrl && (
//         <div>
//             <h2>Merged PDF</h2>
//             <a href={mergedPdfUrl} target="_blank" rel="noopener noreferrer">Download Merged PDF</a>
//         </div>
//       )}
//       {error && (
//         <div style={{ color: 'red' }}>
//             <h2>Error</h2>
//             <p>{error}</p>
//         </div>
//       )}

//     </div>
//   );
// };

// export default App;


// ILOVEPDF Error... Failed to initialize task: Internal Server Error - {"error":{"type":"ServerError","message":"Something on our end went wrong, probably we are not catching some exception we should catch! We are logging this and we will fix it.","code":"500"}}

interface Document {
  boxid: string;
  name: string;
  company: string;
  metadata1: string;
}

interface BoxItem {
  id: string;
  name: string;
}

const DocumentSelection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [metadata1Options, setMetadata1Options] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedMetadata1, setSelectedMetadata1] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null); // Stores Box ID

  const [selectedFiles, setSelectedFiles] = useState<BoxItem[]>([]); 

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await fetch('/api/get');
              const data = await res.json();

              setCompanies(data.companies || []);
              setMetadata1Options(data.metadata1Options || []);
              setNames(data.names || []);
              setDocuments(data.documents || []);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

  useEffect(() => {
      const fetchFilteredData = async () => {
          if (!selectedCompany && !selectedMetadata1 && !selectedName) return; // Avoid unnecessary API calls

          try {
              const res = await fetch(`/api/get?company=${selectedCompany}&metadata1=${selectedMetadata1}&name=${selectedName}`);
              const data = await res.json();
              setDocuments(data.documents || []);
          } catch (error) {
              console.error('Error fetching filtered documents:', error);
              setDocuments([]);
          }
      };

      fetchFilteredData();
  }, [selectedCompany, selectedMetadata1, selectedName]);

  useEffect(() => {       // Runs when either 'selectedName' or 'documents' change  
    if (selectedName && documents.length > 0) {
      handleNameSelection(selectedName);
    }
  }, [selectedName, documents]); 


  // Function to handle document selection and extract box ID
  const handleNameSelection = (selectedName: string) => {
  // const handleNameSelection = (selected: string) => {
      // setSelectedName(selected);
      console.log(selectedName);
      const selectedDoc = documents.find(doc => doc.name === selectedName);
      console.log(selectedDoc, 'yes')
      setSelectedBoxId(selectedDoc ? selectedDoc.boxid : null);
      console.log(selectedBoxId);
  };
  
  const isFileAdded = (fileId: string) => {
    return selectedFiles.some(file => file.id === fileId);
  };

  const addFile = (file: BoxItem) => {
    if (!isFileAdded(file.id) && file.id) {
      console.log('Adding file');
      setSelectedFiles([...selectedFiles, { id: file.id, name: file.name}]);
    }
  };
  const displayFiles = () => {
    for (const file of selectedFiles) {
      console.log(file.id, file.name);
    }
  };

  return (
      <div>
          {/* Company Dropdown */}
          <label>Company:</label>
          <select onChange={(e) => setSelectedCompany(e.target.value)} className="custom-select" value={selectedCompany}>
              <option value="">Select Company</option>
              {companies.map((company) => (
                  <option key={company} value={company}>{company}</option>
              ))}
          </select>

          {/* Metadata Dropdown */}
          <label>Metadata:</label>
          <select onChange={(e) => setSelectedMetadata1(e.target.value)} className="custom-select" value={selectedMetadata1}>
              <option value="">Select Metadata</option>
              {metadata1Options.map((metadata) => (
                  <option key={metadata} value={metadata}>{metadata}</option>
              ))}
          </select>

          {/* Name Dropdown */}
          <label>Document Name:</label>
          <select onChange={(e) => setSelectedName(e.target.value)} className="custom-select" value={selectedName}>
              <option value="">Select Document</option>
              {/* {names.map((doc) => ( */}
              {documents.map((doc) => ( 
                  <option key={doc.name} value={doc.name}>{doc.name}</option>
                  // <option key={doc} value={doc}>{doc}</option>
              ))}
          </select>
          
          <button onClick={() => addFile({name: selectedName, id: selectedBoxId})}>Add Document</button>;
          <button onClick={() => displayFiles()}>Display Files</button>;

          {/* Box ID Display */}
          {selectedBoxId && (
              <p><strong>Box ID:</strong> {selectedBoxId}</p>
          )}

          {/* Document List */}
          <div>
              <h3>Documents</h3>
              {documents.length > 0 ? (
                  documents.map((doc) => (
                      <div key={doc.boxid}>
                          <p><strong>Name:</strong> {doc.name}</p>
                          <p><strong>Company:</strong> {doc.company}</p>
                          <p><strong>Category:</strong> {doc.metadata1}</p>
                      </div>
                  ))
              ) : (
                  <p>No documents found.</p>
              )}
          </div>
      </div>
  );
};

export default DocumentSelection;