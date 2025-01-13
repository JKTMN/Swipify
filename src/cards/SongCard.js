import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import WebView from 'react-native-webview';

const SongCard = ({ trackId }) => {
    const [htmlContent, setHtmlContent] = useState('');

    const styles = StyleSheet.create({
        card: {
            flex: 0.53,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: "#E8E8E8",
            justifyContent: 'center',
            backgroundColor: '#FCFCFC',
            alignItems: 'center',
            padding: 10,
        },
    });

    useEffect(() => {
        const content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Spotify Iframe Player</title>
            </head>
            <body>
                <div class="container">
                    <div class="player">
                        <iframe id="spotify-player" 
                                src="https://open.spotify.com/embed/track/${trackId}" 
                                width="100%" 
                                height="500" 
                                frameborder="0" 
                                allowtransparency="true" 
                                allowautoplay="true"
                                allow="encrypted-media"></iframe>
                    </div>
                </div>
            </body>
            </html>
        `;
        setHtmlContent(content);
    }, [trackId]);

    return (
        <WebView
            style={styles.card}
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            javaScriptEnabled={true}
            scrollEnabled={false}
        />
    );
};


export default SongCard;
