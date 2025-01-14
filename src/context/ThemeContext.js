import React, { createContext, useState, useEffect} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

/**
 * ThemeContext is a context for managing the them of the app.
 * This context allows for toggling between themes, using the system theme,
 * and setting the selected theme in AsyncStorage.
 * 
 * The provider component allows children to access and manage the apps theme.
 * THe theme is either retrieved from AsyncStorage, defaults to the system theme,
 * or is set manually.
 * 
 * @component
 * @param {Object} props - The properties for the component.
 * @param {children} props.children - The child components that will use the context.
 * 
 * @returns {JSX.Element} A provider wrapping its children with the ThemeContext.
 * 
 * @source "https://blog.logrocket.com/building-react-native-theme-switcher-app/"
 */

export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState(colorScheme || 'light');
  
    /**
     * Loads the saved theme from AsyncStorage when the app loads/ state changes.
     */
    useEffect(() => {
      const getTheme = async () => {
        try {
          const savedTheme = await AsyncStorage.getItem('theme');
          if (savedTheme) {
            setTheme(savedTheme);
          }
        } catch (error) {
          console.log('Error loading theme:', error);
        }
      };
      getTheme();
    }, []);
  
    /**
     * Updates the theme when the colour scheme changes.
     */
    useEffect(() => {
      if (colorScheme) {
        setTheme(colorScheme);
      }
    }, [colorScheme]);
  
    /**
     * Toggles the theme to a new value and saves it to AsyncStorage.
     * 
     * @function toggleTheme
     * @param {string} newTheme - The new theme to apply.
     */
    const toggleTheme = (newTheme) => {
      setTheme(newTheme);
      AsyncStorage.setItem('theme', newTheme);
    };
  
    /**
     * Sets the theme to the systems colour scheme and saves it to AsyncStorage.
     * 
     * @function useSystemTheme
     */
    const useSystemTheme = () => {
      setTheme(colorScheme);
      AsyncStorage.setItem('theme', colorScheme);
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme, useSystemTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  export default ThemeContext;