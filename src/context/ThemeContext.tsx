import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'modern-ink' | 'paper' | 'sweden' | 'matrix' | 'midnight' | 'miami-nights' | 'sonokai' | 'spiderman';

export const THEME_OPTIONS = [
    { id: 'default', name: 'Monkey', colors: { bg: '#111111', main: '#e2b714' } },
    { id: 'modern-ink', name: 'Modern Ink', colors: { bg: '#ffffff', main: '#000000' } },
    { id: 'paper', name: 'Novels', colors: { bg: '#d8c8b8', main: '#4a3b32' } },
    { id: 'sweden', name: 'Sweden', colors: { bg: '#0058a3', main: '#ffcc00' } },
    { id: 'matrix', name: 'Matrix', colors: { bg: '#000000', main: '#15ff00' } },
    { id: 'midnight', name: 'Midnight', colors: { bg: '#000000', main: '#ffffff' } },
    { id: 'miami-nights', name: 'Miami', colors: { bg: '#18191c', main: '#e4609b' } },
    { id: 'sonokai', name: 'Sonokai', colors: { bg: '#2c2e34', main: '#9ed072' } },
    { id: 'spiderman', name: 'Spiderman', colors: { bg: '#0f0f1b', main: '#e23636' } },
] as const;

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('monkeyread-theme') as Theme) || 'default';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('monkeyread-theme', theme);

        // Update favicon
        const themeOption = THEME_OPTIONS.find(t => t.id === theme);
        if (themeOption) {
            const color = themeOption.colors.main;
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M6 12h.001"/><path d="M10 12h.001"/><path d="M14 12h.001"/><path d="M18 12h.001"/><path d="M7 16h10"/></svg>`;
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = url;
            }
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
