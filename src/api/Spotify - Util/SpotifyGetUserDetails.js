/**
 * Get the current users Spotify details.
 * 
 * @async
 * @function GetUserDetails
 * @param {string} accessToken - The users Spotify accessToken
 * @returns {object} - An object containing the current users spotify details
 * 
 * @throws {Error} If incorrect data is returned.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile".
 */
const GetUserDetails = async (accessToken) => {

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();

        if (response.ok) {
            const userDetails = {
                uri: data.uri,
                userId: data.id,
                displayName: data.display_name,
                images: data.images[0]?.url,
                country: data.country,
                product: data.product,
                followers: data.followers.total,
            };

            return userDetails;
        } else {
            console.error('Error fetching user details:', data);
            throw new Error(data.error?.message || 'Failed to get user details');
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export { GetUserDetails };