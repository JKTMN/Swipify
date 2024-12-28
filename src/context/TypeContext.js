import React, { createContext, useContext, useEffect, useState} from 'react';

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
    const [type, setType] = useState(null);

    const saveType = (newType) => {
        setType(newType);
    };

    return (
        <TypeContext.Provider value={{type, saveType}}>
            { children }
        </TypeContext.Provider>
    );
};