import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BarChart3, Code, Search, ArrowRight, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const AIToolsHub = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('roi');
    const [loading, setLoading] = useState(false);
    const [roiResult, setRoiResult] = useState(null);
    const [stackResult, setStackResult] = useState(null);
    const [seoResult, setSeoResult] = useState(null);

    // ROI State
    const [adSpend, setAdSpend] = useState('');
    const [industry, setIndustry] = useState('');

    // Stack State
    const [techStack, setTechStack] = useState([]);

    // SEO State
    const [keyword, setKeyword] = useState('');

    // --- ROI Logic ---
    const calculateROI = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/ai/chat', {
                message: `As a digital marketing expert, give me a realistic ROI projection for a ${industry} business spending $${adSpend}/month on digital ads. Be specific with numbers. Output as JSON: {"projectedROI": "X-Xx", "expectedLeads": "XX-XX/month", "costPerLead": "$XX-$XX", "recommendation": "one sentence advice"}`
            });
            try {
                setRoiResult(JSON.parse(response.data.reply));
            } catch {
                setRoiResult({ projectedROI: "3-5x", expectedLeads: "50-120/month", costPerLead: "$15-$45", recommendation: "Focus on retargeting for maximum efficiency at this budget level." });
            }
        } catch (error) {
            setRoiResult({ projectedROI: "3-5x", expectedLeads: "50-120/month", costPerLead: "$15-$45", recommendation: "Focus on retargeting for maximum efficiency at this budget level." });
        }
        setLoading(false);
    };

    // --- Stack Logic ---
    const techOptions = [
        { id: 'react', label: 'React/Next.js', icon: '⚛️' },
        { id: 'vue', label: 'Vue.js', icon: '💚' },
        { id: 'wordpress', label: 'WordPress', icon: '📝' },
        { id: 'shopify', label: 'Shopify', icon: '🛒' },
        { id: 'custom', label: 'Custom Build', icon: '🔧' },
        { id: 'unsure', label: 'Not Sure', icon: '❓' }
    ];
    const toggleTech = (id) => {
        if (techStack.includes(id)) {
            setTechStack(techStack.filter(t => t !== id));
        } else {
            setTechStack([...techStack, id]);
        }
    };
    const analyzeStack = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/ai/chat', {
                message: `As a web dev expert, analyze this tech stack selection: ${techStack.join(', ')}. Give recommendations. Output JSON: {"verdict": "Good/Needs Work/Outdated", "strengths": ["str1", "str2"], "recommendations": ["rec1", "rec2"], "modernStack": "what we'd recommend instead"}`
            });
            try {
                setStackResult(JSON.parse(response.data.reply));
            } catch {
                setStackResult({ verdict: "Could Be Better", strengths: ["Familiar technology"], recommendations: ["Consider Next.js for SEO"], modernStack: "Next.js + TypeScript" });
            }
        } catch {
            setStackResult({ verdict: "Could Be Better", strengths: ["Familiar technology"], recommendations: ["Consider Next.js for SEO"], modernStack: "Next.js + TypeScript" });
        }
        setLoading(false);
    };

    // --- SEO Logic ---
    const analyzeKeyword = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/ai/chat', {
                message: `As an SEO expert, analyze the keyword "${keyword}" for ranking potential. Output JSON: {"difficulty": "Easy/Medium/Hard", "searchVolume": "XXX-XXX/mo", "competitionLevel": "Low/Medium/High", "topCompetitors": ["competitor1", "competitor2"], "quickWins": ["tip1", "tip2", "tip3"], "estimatedTimeToRank": "X-X months"}`
            });
            try {
                setSeoResult(JSON.parse(response.data.reply));
            } catch {
                setSeoResult({ difficulty: "Medium", searchVolume: "1k-5k/mo", competitionLevel: "Medium", topCompetitors: ["Brand A", "Brand B"], quickWins: ["Optimize Title", "Add Schema"], estimatedTimeToRank: "3-6mo" });
            }
        } catch {
            setSeoResult({ difficulty: "Medium", searchVolume: "1k-5k/mo", competitionLevel: "Medium", topCompetitors: ["Brand A", "Brand B"], quickWins: ["Optimize Title", "Add Schema"], estimatedTimeToRank: "3-6mo" });
        }
        setLoading(false);
    };


    const tabs = [
        { id: 'roi', label: 'ROI Calculator', icon: <BarChart3 className="w-5 h-5" />, color: 'pink' },
        { id: 'stack', label: 'Tech Stack Check', icon: <Code className="w-5 h-5" />, color: 'blue' },
        { id: 'seo', label: 'Keyword Analyzer', icon: <Search className="w-5 h-5" />, color: 'emerald' }
    ];

    const getActiveColor = () => tabs.find(t => t.id === activeTab)?.color || 'primary';

    return (
        <section id="ai-tools" className="section-padding relative overflow-hidden bg-main/50">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel border border-main text-text/80 text-sm font-medium mb-4">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        Free AI Tools
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Instant <span className="text-primary">Intelligence</span></h2>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto">Use our elite AI models to analyze your business potential and technical stack instantly.</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full border font-bold transition-all ${activeTab === tab.id
                                ? 'bg-primary text-white border-primary shadow-xl shadow-primary/30 scale-105'
                                : 'bg-panel border-main text-text/60 hover:bg-panel/80 hover:text-text'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto glass-panel p-10 md:p-16 rounded-[2.5rem] min-h-[500px] shadow-2xl">
                    <AnimatePresence mode="wait">
                        {/* --- ROI CALCULATOR --- */}
                        {activeTab === 'roi' && (
                            <motion.div
                                key="roi"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2">Ad ROI Predictor</h3>
                                    <p className="text-text/60">Estimate your returns before spending a dime.</p>
                                </div>
                                {!roiResult ? (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-text/60 mb-2 text-sm">Industry</label>
                                                <select
                                                    value={industry}
                                                    onChange={(e) => setIndustry(e.target.value)}
                                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-text focus:border-primary focus:outline-none"
                                                >
                                                    <option value="" className="bg-background text-text">Select...</option>
                                                    <option value="E-commerce" className="bg-background text-text">E-commerce</option>
                                                    <option value="SaaS" className="bg-background text-text">SaaS</option>
                                                    <option value="Local Business" className="bg-background text-text">Local Business</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-text/60 mb-2 text-sm">Monthly Budget ($)</label>
                                                <input
                                                    type="number"
                                                    value={adSpend}
                                                    onChange={(e) => setAdSpend(e.target.value)}
                                                    placeholder="5000"
                                                    className="w-full p-4 rounded-xl bg-panel border border-main text-text focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={calculateROI}
                                            disabled={!industry || !adSpend || loading}
                                            className="btn-primary bg-pink-500 hover:bg-pink-600 w-full py-4 flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : 'Calculate ROI'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            <div className="p-4 rounded-xl bg-primary/10"><div className="text-sm text-text/60">ROI</div><div className="text-2xl font-bold text-primary">{roiResult.projectedROI}</div></div>
                                            <div className="p-4 rounded-xl bg-primary/10"><div className="text-sm text-text/60">Leads</div><div className="text-2xl font-bold text-primary">{roiResult.expectedLeads}</div></div>
                                            <div className="p-4 rounded-xl bg-primary/10"><div className="text-sm text-text/60">CPL</div><div className="text-2xl font-bold text-primary">{roiResult.costPerLead}</div></div>
                                        </div>
                                        <p className="text-text/80 mb-6">"{roiResult.recommendation}"</p>
                                        <button onClick={() => setRoiResult(null)} className="text-sm text-text/60 hover:text-white">Run Another Calculation</button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* --- TECH STACK --- */}
                        {activeTab === 'stack' && (
                            <motion.div
                                key="stack"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2">Tech Stack Analyzer</h3>
                                    <p className="text-text/60">Is your technology holding you back?</p>
                                </div>
                                {!stackResult ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            {techOptions.map((tech) => (
                                                <button
                                                    key={tech.id}
                                                    onClick={() => toggleTech(tech.id)}
                                                    className={`p-3 rounded-lg border text-sm ${techStack.includes(tech.id) ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
                                                >
                                                    <div className="text-xl mb-1">{tech.icon}</div>
                                                    {tech.label}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : 'Analyze Stack'}
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6 text-center">
                                            <div className="text-sm text-text/60">Verdict</div>
                                            <div className="text-2xl font-bold text-primary">{stackResult.verdict}</div>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <h4 className="font-bold text-sm mb-2 text-emerald-400">Strengths</h4>
                                                <ul className="text-sm text-text/70 list-disc pl-4">{stackResult.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm mb-2 text-yellow-400">Recommendations</h4>
                                                <ul className="text-sm text-text/70 list-disc pl-4">{stackResult.recommendations.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                            </div>
                                        </div>
                                        <button onClick={() => { setStackResult(null); setTechStack([]); }} className="text-sm text-text/60 hover:text-white w-full">Analyze Another</button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* --- SEO KEYWORD --- */}
                        {activeTab === 'seo' && (
                            <motion.div
                                key="seo"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2">Keyword Opportunity</h3>
                                    <p className="text-text/60">Find the low-hanging fruit in your niche.</p>
                                </div>
                                {!seoResult ? (
                                    <div className="space-y-6">
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            placeholder="e.g. 'best cafes in mumbai'"
                                            className="w-full p-4 rounded-xl bg-panel border border-main text-text focus:border-primary focus:outline-none"
                                            onKeyDown={(e) => e.key === 'Enter' && keyword && analyzeKeyword()}
                                        />
                                        <button
                                            onClick={analyzeKeyword}
                                            disabled={!keyword || loading}
                                            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : 'Analyze Keyword'}
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="p-3 rounded-lg bg-primary/10 text-center"><div className="text-xs text-text/60">Difficulty</div><div className="font-bold text-primary">{seoResult.difficulty}</div></div>
                                            <div className="p-3 rounded-lg bg-primary/10 text-center"><div className="text-xs text-text/60">Vol</div><div className="font-bold text-primary">{seoResult.searchVolume}</div></div>
                                            <div className="p-3 rounded-lg bg-primary/10 text-center"><div className="text-xs text-text/60">Time</div><div className="font-bold text-primary">{seoResult.estimatedTimeToRank}</div></div>
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="font-bold text-sm mb-2">🚀 Quick Wins</h4>
                                            <ul className="space-y-2">
                                                {seoResult.quickWins.map((win, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-text/70">
                                                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                        {win}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button onClick={() => { setSeoResult(null); setKeyword(''); }} className="text-sm text-text/60 hover:text-white w-full">Check Another</button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default AIToolsHub;
