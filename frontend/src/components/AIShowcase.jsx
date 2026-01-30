import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, Bot, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const AIShowcase = () => {
    const [activeDemo, setActiveDemo] = useState(0);

    const aiCapabilities = [
        {
            icon: <Bot className="w-8 h-8" />,
            title: "24/7 AI Chat Assistant",
            description: "Our AI never sleeps. It answers questions, qualifies leads, and books consultations while you rest.",
            demo: "Try our chat widget →",
            color: "from-blue-500 to-cyan-500",
            stat: "3x faster response",
            proof: "Instant responses vs. 24hr email wait"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "AI Lead Qualification",
            description: "Smart lead scoring that identifies high-value prospects and creates personalized recommendations.",
            demo: "Take the quiz above ↑",
            color: "from-purple-500 to-pink-500",
            stat: "47% higher conversion",
            proof: "Personalized pitches convert better"
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Website Intelligence",
            description: "AI-powered website analysis that roasts weak sites and prescribes exactly what needs fixing.",
            demo: "Roast a website now →",
            color: "from-orange-500 to-red-500",
            stat: "Viral marketing hook",
            proof: "Free value creates trust"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Resume ATS Optimizer",
            description: "AI scans resumes against ATS algorithms to maximize interview callbacks.",
            demo: "Upload a resume →",
            color: "from-emerald-500 to-teal-500",
            stat: "85% ATS pass rate",
            proof: "vs. 25% industry average"
        }
    ];

    return (
        <section id="showcase" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        Powered by Advanced AI
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        AI That <span className="text-primary">Actually Works</span> For You
                    </h2>
                    <p className="text-xl text-text/60 max-w-3xl mx-auto">
                        We don't just talk about AI—we deploy it. Every client interaction on this site is enhanced by custom AI systems that save time, increase conversions, and deliver real results.
                    </p>
                </div>

                {/* AI Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {aiCapabilities.map((capability, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-panel p-8 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] ${activeDemo === i ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setActiveDemo(i)}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capability.color} flex items-center justify-center text-white mb-6`}>
                                {capability.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-text mb-3">{capability.title}</h3>
                            <p className="text-text/60 mb-6">{capability.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    <span className="font-bold text-emerald-500">{capability.stat}</span>
                                </div>
                                <span className="text-sm text-text/40">{capability.proof}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Live Proof Section */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-500 font-medium">AI Systems Active Right Now</span>
                    </div>

                    <h3 className="text-3xl font-bold text-text mb-4">
                        You're Experiencing AI-Powered Marketing
                    </h3>
                    <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">
                        This entire website uses AI to personalize your experience, qualify your needs, and demonstrate exactly what we can build for YOUR business.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <div className="px-4 py-2 rounded-full bg-panel border border-main text-sm">
                            🤖 AI Chat Widget
                        </div>
                        <div className="px-4 py-2 rounded-full bg-panel border border-main text-sm">
                            🎯 Lead Qualifier
                        </div>
                        <div className="px-4 py-2 rounded-full bg-panel border border-main text-sm">
                            🔥 Website Roaster
                        </div>
                        <div className="px-4 py-2 rounded-full bg-panel border border-main text-sm">
                            📄 Resume Analyzer
                        </div>
                    </div>

                    <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                        Build This For My Business <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AIShowcase;
