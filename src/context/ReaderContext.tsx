import React, { createContext, useContext, useEffect, useState } from 'react';

interface ReaderContextType {
    text: string;
    setText: (text: string) => void;
    wpm: number;
    setWpm: (wpm: number) => void;
}

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog. Speed reading is a skill that can be developed with practice. MonkeyRead helps you focus on one word at a time, highlighting the center of each word to help your eyes stay centered and move faster through the text.";

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const ReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [text, setText] = useState(() => {
        return localStorage.getItem('monkeyread-text') || DEFAULT_TEXT;
    });
    const [wpm, setWpm] = useState(() => {
        return Number(localStorage.getItem('monkeyread-wpm')) || 300;
    });

    useEffect(() => {
        localStorage.setItem('monkeyread-text', text);
    }, [text]);

    useEffect(() => {
        localStorage.setItem('monkeyread-wpm', wpm.toString());
    }, [wpm]);

    return (
        <ReaderContext.Provider value={{ text, setText, wpm, setWpm }}>
            {children}
        </ReaderContext.Provider>
    );
};

export const useReader = () => {
    const context = useContext(ReaderContext);
    if (context === undefined) {
        throw new Error('useReader must be used within a ReaderProvider');
    }
    return context;
};
