import React, { useState, useEffect } from 'react';
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
    useEffect(() => {
        document.title = "Settings | A minimalistic, customizable reading test";
    }, []);

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
        const defaultText = "Give me six hours to chop down a tree, and I will spend the first four gooning - Abraham Lincoln. The tree won't fall to random hits, but gooning finds the perfect bits. They swing their axe with aimless rage.I goon in peace then set the stage. You chase the goal but miss the flow.A gooner knows just when to go. With gooning first, I set the tone.The final hit is mine alone. I stare, I loop, I learn the tree and then I chop it easily. I don't attack wood with fear. I goon until path is clear.Some say to strike but never think.But Gooner's pause and never sink. They mock time when I goon alone, yet wonder how I break a stone.Some train with force, some train with fire.But gooner trains with calm desire. Four hours in, I know it well.Then one clean hit and down it fell. Gooning first does not delay.It's how we master work and play.";
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
                        className="absolute bottom-4 right-4 p-2 bg-background/50 hover:bg-background rounded-lg text-sub hover:text-main transition-colors"
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
