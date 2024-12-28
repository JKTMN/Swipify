import React, { useContext } from "react";
import { AuthContext } from '../context/AccessTokenContext';

export const useAccessToken = () => {
    const { accessToken } = useContext(AuthContext);

    if (!accessToken) {
        alert('Error access token has expired, please login again.')
    }

    return accessToken;
};