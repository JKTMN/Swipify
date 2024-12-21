
const tempPlaylists = [
    {
        id: 0,
        title: "Temp Playlist 1",
        description: "Temp Description 1",
        image: require('../../assets/TempPlaylistImages/1.png'),
    },
    {
        id: 1,
        title: "Temp Playlist 2",
        description: "Temp Description 2",
        image: require('../../assets/TempPlaylistImages/2.jpg'),
    },
    {
        id: 2,
        title: "Temp Playlist 3",
        description: "Temp Description 3",
        image: require('../../assets/TempPlaylistImages/3.png'),
    },
    {
        id: 3,
        title: "Temp Playlist 4",
        description: "Temp Description 4",
        image: require('../../assets/TempPlaylistImages/4.jpg'),
    },
    {
        id: 4,
        title: "Temp Playlist 5",
        description: "Temp Description 5",
        image: require('../../assets/TempPlaylistImages/5.jpg'),
    },
    {
        id: 5,
        title: "Temp Playlist 6",
        description: "Temp Description 6",
        image: require('../../assets/TempPlaylistImages/6.jpg'),
    },
]

const getPlaylistData = () => {
    return tempPlaylists;
}

export default getPlaylistData;