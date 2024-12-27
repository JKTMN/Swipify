
// Idk if works, requires an image of under 256kb and currently cannot test!

const AddCoverImage = async (props) => {
  const { accessToken, playlistId, selectedImageB64 } = props;

  if (!accessToken) {
    throw new Error('Access token is required');
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'image/jpeg',
  };

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
      method: 'PUT',
      headers: headers,
      body: selectedImageB64,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error('Error adding cover art to playlist:', data);
      throw new Error(data.error?.message || 'Failed to add cover art to playlist');
    }
  } catch (error) {
    console.error('Error adding cover art to playlist', error);
    throw error;
  }
};

export { AddCoverImage };
