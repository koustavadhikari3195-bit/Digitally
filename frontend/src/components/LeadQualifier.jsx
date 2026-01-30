import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Calendar, Loader2, CheckCircle, Zap } from 'lucide-react';
import axios from 'axios';

const LeadQualifier = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        businessType: '',
        currentWebsite: '',
        biggestChallenge: '',
        budget: '',
        timeline: ''
    });

    const questions = [
        { key: 'businessType', question: "What type of business do you run?", placeholder: "e.g., E-commerce, SaaS, Local Service, Agency...", icon: "🏢" },
        { key: 'biggestChallenge', question: "What's your biggest digital challenge right now?", placeholder: "e.g., Not enough leads, website looks outdated, low SEO rankings...", icon: "🎯" },
        { key: 'budget', question: "What's your monthly marketing budget?", placeholder: "", icon: "💰", options: ["Under $1K", "$1K - $5K", "$5K - $15K", "$15K+"] },
        { key: 'timeline', question: "When do you want to see results?", placeholder: "", icon: "⏰", options: ["ASAP (30 days)", "1-3 months", "3-6 months", "Just exploring"] }
    ];

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitForm();
        }
    };

    const submitForm = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/ai/qualify-lead', formData);
            setResult(response.data);
        } catch (error) {
            setResult({
                headline: "You're Exactly Who We Help",
                diagnosis: "Based on your answers, you're leaving money on the table with your current digital presence.",
                recommendedServices: ["Strategic Growth Audit", "Conversion Optimization"],
                potentialROI: "2-5x return in 90 days is realistic for your situation",
                urgency: "Every day without optimization is revenue lost to competitors.",
                nextStep: "Book your free strategy session"
            });
        }
        setLoading(false);
    };

    const currentQ = questions[step];

    return (
        <section id="qualify" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Strategy Session
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get Your <span className="text-primary">Custom Growth Plan</span>
                    </h2>
                    <p className="text-xl text-text/60">Answer 4 quick questions. Our AI will recommend the exact strategy for your business.</p>
                </div>

                <div className="glass-panel p-8 md:p-12 rounded-3xl">
                    {!result ? (
                        <>
                            {/* Progress Bar */}
                            <div className="flex gap-2 mb-8">
                                {questions.map((_, i) => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-panel border border-main'}`} />
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-8">
                                        <span className="text-5xl mb-4 block">{currentQ.icon}</span>
                                        <h3 className="text-2xl font-bold text-text">{currentQ.question}</h3>
                                    </div>

                                    {currentQ.options ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {currentQ.options.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setFormData({ ...formData, [currentQ.key]: option });
                                                        handleNext();
                                                    }}
                                                    className={`p-4 rounded-xl border-2 transition-all text-left font-medium ${formData[currentQ.key] === option
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-main bg-panel hover:border-primary/50 text-text'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={formData[currentQ.key]}
                                                onChange={(e) => setFormData({ ...formData, [currentQ.key]: e.target.value })}
                                                placeholder={currentQ.placeholder}
                                                className="w-full p-4 rounded-xl bg-panel border border-main text-text placeholder-text/40 focus:border-primary focus:outline-none text-lg"
                                                onKeyDown={(e) => e.key === 'Enter' && formData[currentQ.key] && handleNext()}
                                            />
                                            <button
                                                onClick={handleNext}
                                                disabled={!formData[currentQ.key]}
                                                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="animate-spin" /> : <>Continue <ArrowRight /></>}
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-10 h-10 text-primary" />
                            </div>

                            <h3 className="text-3xl font-bold text-text mb-4">{result.headline}</h3>
                            <p className="text-xl text-text/70 mb-8">{result.diagnosis}</p>

                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {result.recommendedServices.map((service, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                                        <CheckCircle className="text-primary w-5 h-5" />
                                        <span className="font-medium text-text">{service}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-8">
                                <p className="text-lg font-bold text-primary mb-2">Potential ROI</p>
                                <p className="text-2xl font-black text-text">{result.potentialROI}</p>
                            </div>

                            <p className="text-yellow-500 font-medium mb-6">⚡ {result.urgency}</p>

                            <a
                                href="#contact"
                                className="btn-primary inline-flex items-center gap-2 px-10 py-5 text-xl"
                            >
                                <Calendar className="w-5 h-5" />
                                {result.nextStep}
                            </a>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LeadQualifier;
