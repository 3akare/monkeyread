import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useReader } from '../context/ReaderContext';
import { Palette, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

const THEME_OPTIONS = [
    { id: 'default', name: 'Monkey', colors: { bg: '#111111', main: '#e2b714' } },
    { id: 'modern-ink', name: 'Modern Ink', colors: { bg: '#ffffff', main: '#000000' } },
    { id: 'paper', name: 'Novels', colors: { bg: '#d8c8b8', main: '#4a3b32' } },
    { id: 'sweden', name: 'Sweden', colors: { bg: '#0058a3', main: '#ffcc00' } },
    { id: 'matrix', name: 'Matrix', colors: { bg: '#000000', main: '#15ff00' } },
    { id: 'midnight', name: 'Midnight', colors: { bg: '#000000', main: '#ffffff' } },
    { id: 'miami-nights', name: 'Miami', colors: { bg: '#18191c', main: '#e4609b' } },
    { id: 'sonokai', name: 'Sonokai', colors: { bg: '#2c2e34', main: '#9ed072' } },
    { id: 'spiderman', name: 'Spiderman', colors: { bg: '#0f0f1b', main: '#e23636' } },
];

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const { text, setText } = useReader();
    const [localText, setLocalText] = useState(text);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        const wordCount = newText.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount <= 1000) {
            setLocalText(newText);
            setText(newText);
        }
    };

    const handleResetText = () => {
        const defaultText = "The quick brown fox jumps over the lazy dog. Speed reading is a skill that can be developed with practice. MonkeyRead helps you focus on one word at a time, highlighting the center of each word to help your eyes stay centered and move faster through the text.";
        setLocalText(defaultText);
        setText(defaultText);
    };

    const wordCount = localText.trim().split(/\s+/).filter(Boolean).length;

    return (
        <div className="max-w-4xl w-full py-12 space-y-16">
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Palette className="w-6 h-6 text-main" />
                    <h2 className="text-2xl font-bold">theme</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {THEME_OPTIONS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id as any)}
                            className={`p-4 rounded-lg flex items-center justify-between group transition-all duration-200 border border-transparent ${theme === t.id
                                    ? 'ring-2 ring-main shadow-lg'
                                    : 'hover:bg-sub/10 hover:border-sub/10'
                                }`}
                            style={{ backgroundColor: theme === t.id ? t.colors.bg : undefined }}
                        >
                            <span
                                className={`text-sm font-medium transition-colors ${theme === t.id ? 'text-main' : 'text-sub group-hover:text-text'
                                    }`}
                                style={{ color: theme === t.id ? t.colors.main : undefined }}
                            >
                                {t.name}
                            </span>
                            <div
                                className={`w-4 h-4 rounded-full transition-all ${theme !== t.id && 'opacity-50 group-hover:opacity-100'}`}
                                style={{ backgroundColor: t.colors.main }}
                            />
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-main" />
                        <h2 className="text-2xl font-bold">custom text</h2>
                    </div>
                    <div className={`text-sm ${wordCount > 950 ? 'text-error' : 'text-sub'}`}>
                        {wordCount}/1000 words
                    </div>
                </div>

                <div className="relative group">
                    <textarea
                        value={localText}
                        onChange={handleTextChange}
                        className="w-full h-64 bg-background border border-sub/20 rounded-xl p-6 text-text caret-main focus:border-main outline-none transition-all resize-none font-mono text-lg placeholder:text-sub/30 no-scrollbar"
                        placeholder="Paste your text here (up to 1000 words)..."
                    />
                    <button
                        onClick={handleResetText}
                        className="absolute bottom-4 right-4 p-2 bg-background/50 hover:bg-background rounded-lg text-sub hover:text-main transition-colors border border-sub/10 hover:border-main/50"
                        title="Reset to default text"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sub text-sm">
                    <CheckCircle2 className="w-4 h-4 text-main" />
                    <span>Text is automatically saved.</span>
                </div>
            </section>
        </div>
    );
};

export default Settings;
