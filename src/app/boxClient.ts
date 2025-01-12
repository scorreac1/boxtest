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


