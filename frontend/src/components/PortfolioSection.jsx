import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, ArrowRight, Layout, Globe, Smartphone, TrendingUp, Trophy } from 'lucide-react';

const PortfolioSection = () => {
    const works = [
        // Star Projects (Span Full or Large)
        {
            title: "Royal Heritage Hotel",
            category: "Luxury Hospitality",
            location: "Jaipur, India",
            flag: "🇮🇳",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=75&w=800",
            result: "+200% Booking Rate",
            desc: "Complete digital transformation for a 5-star heritage property. Integrated booking engine, 3D virtual tours, and a high-conversion funnel.",
            tech: ["Next.js", "Three.js", "Booking Engine"]
        },
        {
            title: "Apex FinTech",
            category: "SaaS Dashboard",
            location: "London, UK",
            flag: "🇬🇧",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=800",
            result: "$2.4M Scured",
            desc: "Institutional-grade trading analytics interface. Built for speed, security, and real-time data visualization.",
            tech: ["React", "D3.js", "WebSockets"]
        },
        // Standard Projects
        {
            title: "Organic Harvest",
            category: "D2C E-commerce",
            location: "Kerala, India",
            flag: "🇮🇳",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=75&w=800",
            result: "$50k/mo Revenue",
            desc: "From local market to global D2C brand. Shopify implementation with custom headless checkout.",
            tech: ["Shopify Plus", "Klaviyo"]
        },
        {
            title: "Dr. Sharma's Clinic",
            category: "Medical SEO",
            location: "New Delhi, India",
            flag: "🇮🇳",
            image: "https://images.unsplash.com/photo-1505751172107-573225a94022?auto=format&fit=crop&q=75&w=800",
            result: "#1 Google Rank",
            desc: "Local SEO domination. 400% increase in patient inquiries within 3 months.",
            tech: ["Local SEO", "GMB"]
        },
        {
            title: "Urban Bites",
            category: "Food Delivery App",
            location: "Mumbai, India",
            flag: "🇮🇳",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=75&w=800",
            result: "50k+ Downloads",
            desc: "Hyper-local delivery ecosystem. Rider app, customer app, and restaurant dashboard.",
            tech: ["Flutter", "Node.js"]
        },
        {
            title: "EcoStyle Fashion",
            category: "Sustainable Fashion",
            location: "New York, USA",
            flag: "🇺🇸",
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=75&w=800",
            result: "300% ROAS",
            desc: "High-fashion e-commerce with AI-powered sizing and sustainable supply chain tracking.",
            tech: ["Magneto", "AI"]
        }
    ];

    return (
        <section id="portfolio" className="section-padding relative overflow-hidden bg-panel/10">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
                            <Trophy className="w-4 h-4" />
                            Hall of Fame
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-4">
                            Architecting High-Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Results</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-text/60 text-xl leading-relaxed">
                            We don't just deliver projects; we deliver market-shifting performance. Explore our portfolio of elite digital transformations across global markets.
                        </p>
                    </div>
                </div>

                {/* Grid - NOW LARGER AND MORE INFLUENTIAL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {works.map((work, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            {/* Background Image with Zoom Effect */}
                            <div className="absolute inset-0">
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=800';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                {/* Top Badges */}
                                <div className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="flex gap-2">
                                        {work.tech && work.tech.map((t, idx) => (
                                            <span key={idx} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium border border-white/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                    </div>
                                </div>

                                {/* Bottom Info */}
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-purple-400 font-bold tracking-wider text-sm uppercase">{work.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/40"></span>
                                        <span className="text-white/60 text-sm flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {work.location} {work.flag}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">{work.title}</h3>

                                    <p className="text-white/70 text-lg mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
                                        {work.desc}
                                    </p>

                                    <div className="inline-block">
                                        <div className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/30 backdrop-blur-md">
                                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 font-black text-2xl">
                                                {work.result}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="#contact" className="inline-flex items-center gap-2 text-text/60 hover:text-white transition-colors">
                        View All Projects <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
