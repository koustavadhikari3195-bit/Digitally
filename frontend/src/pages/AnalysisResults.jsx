import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, ChevronRight, Share2, Download, Sparkles } from 'lucide-react';
import axios from 'axios';

const AnalysisResults = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRewriting, setIsRewriting] = useState(false);
    const [rewrittenText, setRewrittenText] = useState(null);

    // Mock data for immediate visualization if API fails or backend not running yet
    const mockData = {
        score: 72,
        summary: "Strong technical skills but lacks quantifiable impact. The resume feels generic and doesn't stand out amongst senior candidates.",
        top_skills: ["React", "Node.js", "MongoDB"],
        missing_keywords: ["System Design", "CI/CD", "Cloud Architecture"],
        critical_issues: ["Passive voice used frequently", "Summary is too vague"],
        improvement_plan: ["Rewrite bullets using X-Y-Z formula", "Add specific metrics to project descriptions"],
        job_match_prediction: "Mid-Level Frontend Developer"
    };

    useEffect(() => {
        let isMounted = true;
        const fetchAnalysis = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const response = await axios.get(`/api/resumes/${id}`, { headers });

                if (isMounted) {
                    if (response.data.analysisResult) {
                        setData(response.data.analysisResult);
                        setLoading(false);
                    } else {
                        // Limit retries to 15 (approx 30 seconds total)
                        if (!window.__analysisRetries) window.__analysisRetries = 0;
                        if (window.__analysisRetries < 15) {
                            window.__analysisRetries++;
                            setTimeout(fetchAnalysis, 2000);
                        } else {
                            console.warn("Analysis timeout. Falling back to mock data.");
                            setData(mockData);
                            setLoading(false);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching analysis:", error);
                if (isMounted) {
                    setData(mockData); // Fallback to mock on hard error
                    setLoading(false);
                }
            }
        };

        fetchAnalysis();
        return () => { isMounted = false; };
    }, [id]);

    const handleRewrite = async () => {
        setIsRewriting(true);
        setRewrittenText(""); // Clear old text
        try {
            const token = localStorage.getItem('token');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await axios.post('/api/chat/rewrite', {
                bullet: data.improvement_plan.join(". ")
            }, { headers });
            setRewrittenText(response.data.rewritten);
        } catch (error) {
            console.error("Rewrite failed:", error);
        } finally {
            setIsRewriting(false);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Resume Analysis Result',
            text: `Check out my resume analysis score: ${data.score}/100! Result from Digitally.`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Shared failed:", err);
        }
    };

    const handleExport = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                    <h2 className="text-xl text-text font-semibold">Analyzing Intelligence...</h2>
                    <p className="text-text/60">Parsing ATS compatibility and keywords</p>
                </div>
            </div>
        );
    }

    const getScoreColor = (s) => {
        if (s >= 80) return "text-emerald-400";
        if (s >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 print:pt-0">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 print:hidden">
                <div>
                    <Link to="/dashboard" className="text-text/60 hover:text-primary mb-2 inline-block text-sm">&larr; Back to Dashboard</Link>
                    <h1 className="text-3xl font-bold text-text">Analysis Report</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleShare}
                        className="btn-secondary flex items-center gap-2 transition-all hover:bg-white/10"
                    >
                        <Share2 className="h-4 w-4" /> Share
                    </button>
                    <button onClick={handleExport} className="btn-primary flex items-center gap-2"><Download className="h-4 w-4" /> Export PDF</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column: Score & Summary */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Score Card */}
                    <div className="glass-panel p-8 rounded-2xl text-center">
                        <h3 className="text-text/60 font-medium mb-4">ATS Compatibility Score</h3>
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-[var(--border-color)]" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * data.score) / 100} className={getScoreColor(data.score)} />
                            </svg>
                            <span className={`absolute text-5xl font-bold ${getScoreColor(data.score)}`}>{data.score}</span>
                        </div>
                        <p className="mt-4 text-text/70 text-sm">{data.job_match_prediction}</p>
                    </div>

                    {/* Skills */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h4 className="text-text font-bold mb-4">Top Skills Detected</h4>
                        <div className="flex flex-wrap gap-2">
                            {data.top_skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Feedback */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Summary */}
                    <div className="glass-panel p-8 rounded-2xl border-l-4 border-primary">
                        <h3 className="text-xl font-bold text-text mb-2">Executive Summary</h3>
                        <p className="text-text/70 leading-relaxed">{data.summary}</p>
                    </div>

                    {/* Critical Issues */}
                    <div className="glass-panel p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                            <XCircle className="text-red-500" /> Critical Issues
                        </h3>
                        <ul className="space-y-4">
                            {data.critical_issues.map((issue, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                                    <span className="text-red-400 mt-1">•</span>
                                    <span className="text-text/70">{issue}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Improvement Plan */}
                    <div className="glass-panel p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                            <CheckCircle className="text-emerald-500" /> Improvement Plan
                        </h3>
                        <ul className="space-y-4">
                            {data.improvement_plan.map((step, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-bold mt-0.5">
                                        {i + 1}
                                    </div>
                                    <span className="text-text/70">{step}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-[var(--border-color)] print:hidden">
                            <h4 className="text-text font-medium mb-4">Want these fixed automatically?</h4>
                            <button
                                onClick={handleRewrite}
                                disabled={isRewriting}
                                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                {isRewriting ? <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting...</> : "Rewrite with AI"}
                            </button>
                        </div>
                    </div>

                    {/* Rewritten Result */}
                    {rewrittenText && (
                        <div className="glass-panel p-8 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5">
                            <h3 className="text-xl font-bold text-emerald-500 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" /> Optimized Resume Bullets
                            </h3>
                            <div className="bg-panel p-6 rounded-xl border border-main text-text/80 whitespace-pre-wrap leading-relaxed">
                                {rewrittenText}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AnalysisResults;

