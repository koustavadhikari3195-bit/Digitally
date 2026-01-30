import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default to 'dark' or read from localStorage
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('site-theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old theme classes
        root.classList.remove('light', 'dark', 'neon', 'professional');

        // Add new theme class
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem('site-theme', theme);
    }, [theme]);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
