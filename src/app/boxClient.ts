import axios from 'axios'; // HTTP requests

export const getFolderItems = async (accessToken: string, folderId: string) => {
  try {
    const response = await axios.get(`https://api.box.com/2.0/folders/${folderId}/items`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: 'id,name,type',
      },
    });
    return response.data.entries;
  } catch (error) {
    console.error('Error fetching folder items:', error);
    throw error; 
  }
};
