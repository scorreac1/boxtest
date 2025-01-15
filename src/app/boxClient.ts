export const getFolderItems = async (accessToken: string, folderId: string) => {
  try {
    const response = await fetch(`https://api.box.com/2.0/folders/${folderId}/items?fields=id,name,type`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching folder items: ${response.statusText}`);
    }

    const data = await response.json();
    return data.entries;
    
  } catch (error) {
    console.error('Error fetching folder items:', error);
    throw error; 
  }
};

export const createSharedLink = async (accessToken: string, fileId: string) => {
  const response = await fetch(`https://api.box.com/2.0/files/${fileId}`, {
    method: 'PUT',  // PUT and use the body specified below if the link may not exist
    // Using GET is possible, but that means the shared links must already exist `https://api.box.com/2.0/files/${fileId}?fields=shared_link`
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shared_link: {
        access: 'open',
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error('Error creating shared link');
  }
  
  const data = await response.json();
  return data.shared_link.url;
};

// Function to create a shared link with expiration
// export const createSharedLinkWithExpiration = async (accessToken: string, fileId: string) => {
//   const expirationTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  
//   const response = await fetch(`https://api.box.com/2.0/files/${fileId}`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       shared_link: {
//         access: 'open',
//         unshared_at: expirationTime,
//       },
//     }),
//   });
  
//   if (!response.ok) {
//     throw new Error('Error creating shared link');
//   }
  
//   const data = await response.json();
//   return data.shared_link.url;
// };