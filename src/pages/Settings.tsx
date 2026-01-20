import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useReader } from '../context/ReaderContext';
import { Palette, FileText, CheckCircle2 } from 'lucide-react';

const THEMES = [
    { id: 'default', name: 'modern ink', colors: { bg: '#111111', main: '#e2b714' } },
    { id: 'modern-ink', name: 'paper', colors: { bg: '#ffffff', main: '#000000' } },
    { id: 'sweden', name: 'sweden', colors: { bg: '#0058a3', main: '#ffcc00' } },
    { id: 'matrix', name: 'matrix', colors: { bg: '#000000', main: '#15ff00' } },
    { id: 'midnight', name: 'midnight', colors: { bg: '#000000', main: '#ffffff' } },
    { id: 'miami-nights', name: 'miami', colors: { bg: '#18191c', main: '#e4609b' } },
    { id: 'sonokai', name: 'sonokai', colors: { bg: '#2c2e34', main: '#9ed072' } },
];

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const { text, setText } = useReader();
    const [localText, setLocalText] = useState(text);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        const wordCount = newText.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount <= 500) {
            setLocalText(newText);
            setText(newText);
        }
    };

    const wordCount = localText.trim().split(/\s+/).filter(Boolean).length;

    return (
        <div className="max-w-3xl w-full py-12 space-y-16">
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Palette className="w-6 h-6 text-main" />
                    <h2 className="text-2xl font-bold">theme</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {THEMES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id as any)}
                            className={`p-4 rounded-lg flex items-center justify-between group border-2 transition-all ${theme === t.id ? 'border-main' : 'border-sub/20 hover:border-sub/40'
                                }`}
                            style={{ backgroundColor: t.colors.bg }}
                        >
                            <span className={`text-sm font-medium ${theme === t.id ? 'text-main' : 'text-sub group-hover:text-text'}`}>
                                {t.name}
                            </span>
                            <div
                                className="w-4 h-4 rounded-full border border-sub/20"
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
                    <div className={`text-sm ${wordCount > 450 ? 'text-error' : 'text-sub'}`}>
                        {wordCount}/500 words
                    </div>
                </div>

                <textarea
                    value={localText}
                    onChange={handleTextChange}
                    className="w-full h-64 bg-sub/5 border-2 border-sub/10 rounded-xl p-6 text-text focus:border-main outline-none transition-all resize-none font-mono text-lg"
                    placeholder="Paste your text here (up to 500 words)..."
                />

                <div className="mt-4 flex items-center gap-2 text-sub text-sm">
                    <CheckCircle2 className="w-4 h-4 text-main" />
                    <span>Text is automatically saved to browser storage.</span>
                </div>
            </section>
        </div>
    );
};

export default Settings;
