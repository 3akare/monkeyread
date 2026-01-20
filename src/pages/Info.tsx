import React from 'react';

const Info = () => {
    return (
        <div className="max-w-2xl w-full py-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-sub/10 rounded-lg">
                    <svg className="w-8 h-8 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold">about</h2>
            </div>

            <div className="space-y-6 text-sub leading-relaxed text-lg">
                <p>
                    MonkeyRead is a speed-reading application inspired by the minimal aesthetics of Monkeytype.
                    It utilizes a technique known as <strong className="text-text">Rapid Serial Visual Presentation (RSVP)</strong>.
                </p>
                <p>
                    By centering words and highlighting the "Optimal Recognition Point" (usually the middle character),
                    MonkeyRead allows you to read content without moving your eyes across the page. This significantly
                    reduces the time spent on saccades (eye movements) and sub-vocalization, leading to faster reading speeds
                    and improved focus.
                </p>
                <p>
                    Simply paste your text in the settings, adjust your target words per minute, and press start.
                </p>
            </div>
        </div>
    );
};

export default Info;
