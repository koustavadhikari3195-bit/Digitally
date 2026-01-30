import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Target, TrendingUp, DollarSign } from 'lucide-react';

const MarketingSection = () => {
    const stats = [
        { icon: <Target className="w-6 h-6" />, value: "847%", label: "Avg. ROAS" },
        { icon: <TrendingUp className="w-6 h-6" />, value: "3.2x", label: "Lead Growth" },
        { icon: <DollarSign className="w-6 h-6" />, value: "-62%", label: "Cost Per Acquisition" }
    ];

    const services = [
        { title: "PPC & Paid Ads", desc: "Google, Meta, TikTok, LinkedIn campaigns optimized for conversions" },
        { title: "Content Marketing", desc: "Authority-building content that ranks and converts" },
        { title: "Social Media", desc: "Organic + paid strategies that build community and drive sales" },
        { title: "Email Marketing", desc: "Automated sequences that nurture leads into customers" }
    ];

    return (
        <section id="marketing" className="section-padding bg-panel/30 backdrop-blur-sm border-t border-main">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 text-sm font-medium mb-4">
                        <Megaphone className="w-4 h-4" />
                        Digital Marketing
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                        Turn Ad Spend Into <span className="text-pink-500">Exponential Revenue</span>
                    </h2>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto leading-relaxed">
                        We don't just "run ads"—we engineer high-velocity acquisition machines. Using data-driven psychology and advanced bidding algorithms to convert attention into pure, scalable profit.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-10 rounded-3xl text-center hover:scale-[1.02] transition-transform shadow-xl"
                        >
                            <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-500">
                                {stat.icon}
                            </div>
                            <p className="text-5xl font-black text-pink-500 mb-3">{stat.value}</p>
                            <p className="text-lg text-text/50 font-medium uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <div key={i} className="glass-panel p-6 rounded-2xl hover:border-pink-500/30 transition-colors">
                            <h4 className="text-lg font-bold text-text mb-2">{service.title}</h4>
                            <p className="text-text/60 text-sm">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketingSection;
