const AddCoverImage = async ({ accessToken, playlistId, selectedImageB64 }) => {

  if (!selectedImageB64) {
    throw new Error("Image data is not available.");
  }

  const base64Data = selectedImageB64.split(',')[1];

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'image/jpeg',
      },
      body: base64Data,
    });
    if (response.ok) {
    } else {
      throw new Error('Failed to add cover art:', response);
    }

  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Failed to upload cover image');
  }
};

export { AddCoverImage };