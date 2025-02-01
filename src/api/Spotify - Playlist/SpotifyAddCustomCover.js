/**
 * Updates the cover image of a specified Spotify playlist using a Base64-encoded image.
 * 
 * @async
 * @function AddCoverImage
 * @param {Object} params - The function parameters.
 * @param {string} params.accessToken - The users Spotify accessToken.
 * @param {string} params.playlistId - The unique ID of the playlist to update.
 * @param {string} param.selectedImageB64 - The base64-encoded string of the image.
 * 
 * @throws {Error} if the image data is missing or the upload fails.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover". 
 */
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