import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReader } from '../context/ReaderContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Reader = () => {
    const { text, wpm, setWpm } = useReader();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const words = useMemo(() => {
        return text.trim().split(/\s+/).filter(Boolean);
    }, [text]);

    const currentWord = words[currentIndex] || "";

    // Split word for highlighted character logic
    const splitWord = useMemo(() => {
        if (!currentWord) return { head: "", mid: "", tail: "" };

        // Optimal Recognition Point (ORP) - middle character
        const midIndex = Math.floor((currentWord.length - 1) / 2);

        return {
            head: currentWord.slice(0, midIndex),
            mid: currentWord[midIndex],
            tail: currentWord.slice(midIndex + 1),
        };
    }, [currentWord]);

    useEffect(() => {
        document.title = "Monkeyread | A minimalistic, customizable reading test";
    }, []);

    useEffect(() => {
        if (isPlaying && currentIndex < words.length) {
            const interval = (60 / wpm) * 1000;
            timerRef.current = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev + 1 >= words.length) {
                        setIsPlaying(false);
                        setIsFinished(true);
                        return prev;
                    }
                    return prev + 1;
                });
            }, interval);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, wpm, currentIndex, words.length]);

    const handleTogglePlay = () => {
        if (isFinished) {
            setCurrentIndex(0);
            setIsFinished(false);
        }
        setIsPlaying(!isPlaying);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setIsPlaying(false);
        setIsFinished(false);
    };

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-24 relative mt-12 pb-16">
            {/* Instruction - Moved above slider */}
            <p className="absolute -top-12 text-sub/20 text-sm font-medium tracking-widest uppercase">
                focus on the highlighted letter
            </p>

            {/* Speed Control */}
            <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between items-center text-sub font-bold text-sm">
                    <span>speed</span>
                    <span className="text-main">{wpm} wpm</span>
                </div>
                <input
                    type="range"
                    min="300"
                    max="1000"
                    step="10"
                    value={wpm}
                    onChange={(e) => setWpm(Number(e.target.value))}
                    className="w-full h-1 bg-sub/20 rounded-lg appearance-none cursor-pointer accent-main"
                />
            </div>

            {/* Word Display */}
            <div className="flex flex-col items-center gap-8 w-full mb-8">
                <div className="h-40 flex items-center justify-center w-full relative">
                    <div className="text-6xl md:text-8xl font-bold text-center select-none w-full break-all">
                        <span className="text-text/40">{splitWord.head}</span>
                        <span className="text-main">{splitWord.mid}</span>
                        <span className="text-text/40">{splitWord.tail}</span>
                    </div>
                </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col items-center gap-6">
                <p className="text-sub text-sm font-medium h-5 text-center w-full">
                    {/* Fixed height to prevent shaking */}
                    {!isPlaying && !isFinished && currentIndex === 0 && "Press start to begin reading"}
                    {isPlaying && "Reading..."}
                    {isFinished && "Finished!"}
                    {!isPlaying && currentIndex > 0 && !isFinished && "Paused"}
                </p>

                <div className="flex items-center gap-8">
                    {!isFinished ? (
                        <>
                            <button
                                onClick={handleTogglePlay}
                                className="flex items-center gap-2 px-8 py-3 bg-sub/10 hover:bg-sub/20 rounded-lg transition-colors min-w-[140px] justify-center"
                            >
                                {isPlaying ? (
                                    <>
                                        <Pause className="w-5 h-5 text-main" />
                                        <span className="font-bold text-sm">pause</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 text-main" />
                                        <span className="font-bold text-sm">{currentIndex === 0 ? "start" : "resume"}</span>
                                    </>
                                )}
                            </button>

                            {currentIndex > 0 && (
                                <button
                                    onClick={handleRestart}
                                    className="p-3 hover:bg-sub/10 rounded-lg transition-colors group"
                                    title="Restart"
                                >
                                    <RotateCcw className="w-5 h-5 text-sub group-hover:text-text transition-colors" />
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={handleRestart}
                            className="flex items-center gap-2 px-8 py-3 bg-sub/10 hover:bg-sub/20 rounded-lg transition-colors min-w-[140px] justify-center"
                        >
                            <RotateCcw className="w-5 h-5 text-main" />
                            <span className="font-bold text-sm">restart</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reader;
