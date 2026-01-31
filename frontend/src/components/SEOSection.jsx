import React from 'react';
import { motion } from 'framer-motion';
import { Search, Link as LinkIcon, Globe, Target } from 'lucide-react';

const SEOSection = () => {
    const services = [
        { icon: <Search className="w-6 h-6" />, title: "Technical SEO", desc: "Site speed, core web vitals, crawlability" },
        { icon: <LinkIcon className="w-6 h-6" />, title: "Link Building", desc: "High-authority backlinks that move rankings" },
        { icon: <Globe className="w-6 h-6" />, title: "Local SEO", desc: "Dominate Google Maps and local search" },
        { icon: <Target className="w-6 h-6" />, title: "Content Strategy", desc: "Keyword research and content that ranks" }
    ];

    const results = [
        { metric: "312%", label: "Avg. Traffic Increase", period: "within 6 months" },
        { metric: "Page 1", label: "Rankings Achieved", period: "for 89% of keywords" },
        { metric: "47%", label: "Conversion Boost", period: "from organic traffic" }
    ];

    return (
        <section id="seo" className="section-padding bg-panel/30 backdrop-blur-sm border-t border-main">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
                        <Search className="w-4 h-4" />
                        SEO & Search Dominance
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                        Command the <span className="text-emerald-500">Search Landscape</span>
                    </h2>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto leading-relaxed">
                        Visibility is the ultimate competitive leverage. We don&apos;t just optimize—we dominate. Through technical authority and strategic content, we place your brand at the summit of every relevant search.
                    </p>
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {results.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-8 rounded-2xl text-center"
                        >
                            <p className="text-5xl font-black text-emerald-500 mb-2">{stat.metric}</p>
                            <p className="text-lg font-bold text-text mb-1">{stat.label}</p>
                            <p className="text-text/40 text-sm">{stat.period}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Services */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <div key={i} className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 transition-colors">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-emerald-500">
                                {service.icon}
                            </div>
                            <h4 className="text-lg font-bold text-text mb-2">{service.title}</h4>
                            <p className="text-text/60 text-sm">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SEOSection;
