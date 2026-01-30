import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Loader2, AlertTriangle, CheckCircle, XCircle, Share2 } from 'lucide-react';
import axios from 'axios';

const WebsiteRoaster = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleRoast = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await axios.post('/api/ai/roast-website', { url });
            setResult(response.data);
        } catch (error) {
            setResult({
                score: 0,
                headline: "Roast Failed",
                roast: "We couldn't analyze this URL. Make sure it's a valid website!",
                quickWins: ["Check the URL format", "Ensure the site is live"],
                verdict: "Error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-500';
        if (score >= 60) return 'text-yellow-500';
        if (score >= 40) return 'text-orange-500';
        return 'text-red-500';
    };

    const getVerdictIcon = (verdict) => {
        switch (verdict) {
            case "Chef's Kiss": return <CheckCircle className="text-emerald-500" />;
            case 'Solid': return <CheckCircle className="text-blue-500" />;
            case 'Decent': return <AlertTriangle className="text-yellow-500" />;
            default: return <XCircle className="text-red-500" />;
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'My Website Roast Result',
            text: `My website just got a score of ${result.score}/100! Verdict: ${result.verdict}. Try it here:`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert('Roast result copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <section id="roast" className="py-20 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4"
                    >
                        <Globe className="w-4 h-4" />
                        Free Website Audit
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get Your Website <span className="text-red-500">Roasted</span>
                    </h2>
                    <p className="text-text/60 text-lg max-w-2xl mx-auto">
                        Paste any URL and our AI will give you a brutally honest critique. No sugarcoating. Just truth.
                    </p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleRoast} className="glass-panel p-6 rounded-2xl mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://your-website.com"
                            className="flex-1 bg-panel border border-main rounded-xl px-6 py-4 text-text placeholder-text/40 focus:outline-none focus:border-red-500/50 text-lg shadow-sm"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Roasting...
                                </>
                            ) : (
                                '🔥 Roast It'
                            )}
                        </button>
                    </div>
                </form>

                {/* Results */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="glass-panel p-8 rounded-2xl"
                        >
                            {/* Score Header */}
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className={`text-6xl font-black ${getScoreColor(result.score)}`}>
                                        {result.score}
                                    </div>
                                    <div>
                                        <p className="text-text/60 text-sm">Score out of 100</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {getVerdictIcon(result.verdict)}
                                            <span className="font-bold text-text">{result.verdict}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="btn-secondary flex items-center gap-2"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share Roast
                                </button>
                            </div>

                            {/* Headline */}
                            <h3 className="text-2xl font-bold text-text mb-4">{result.headline}</h3>
                            <p className="text-text/70 text-lg leading-relaxed mb-8">{result.roast}</p>

                            {/* Quick Wins */}
                            <div className="bg-emerald-500/10 rounded-xl p-6">
                                <h4 className="font-bold text-emerald-500 mb-4">🎯 Quick Wins (Fix These Today)</h4>
                                <ul className="space-y-3">
                                    {result.quickWins.map((win, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text/80">
                                            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-sm font-bold shrink-0">
                                                {i + 1}
                                            </span>
                                            {win}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-text/60 mb-4">Want us to fix all of this for you?</p>
                                <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                                    Get a Free Consultation
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default WebsiteRoaster;
