import React from 'react';

export function CardSkeleton() {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
            </div>
            <div className="space-y-3">
                <div className="h-3 bg-white/10 rounded"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
                <div className="h-3 bg-white/10 rounded w-4/6"></div>
            </div>
        </div>
    );
}

export function ListSkeleton({ count = 3 }) {
    return (
        <div className="space-y-4">
            {[...Array(count)].map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

export function TextSkeleton({ lines = 3 }) {
    return (
        <div className="space-y-3 animate-pulse">
            {[...Array(lines)].map((_, i) => (
                <div key={i} className="h-4 bg-white/10 rounded w-full"></div>
            ))}
        </div>
    );
}

export const SectionLoader = () => (
    <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-primary/60 text-sm font-medium animate-pulse uppercase tracking-widest">Loading Section...</div>
    </div>
);
