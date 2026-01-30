import React, { useRef } from 'react';
import { Megaphone, Rocket, PenTool, Layout, Search, FileText, ChevronRight, Calculator, MessageSquare } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, desc, features, link, color, badge }) => {
    // 3D Tilt Logic
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
                transform: "translateZ(0)"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative p-8 rounded-3xl bg-panel/80 border border-main hover:border-${color}-500/50 transition-all duration-300 overflow-hidden cursor-pointer antialiased shadow-lg hover:shadow-2xl`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {/* Glow Effect */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${color}-500/10 rounded-full blur-[80px] group-hover:bg-${color}-500/20 transition-all duration-500`}></div>

                {/* Badge */}
                {badge && (
                    <span className={`absolute top-4 right-4 px-3 py-1 bg-${color}-500/20 text-${color}-400 text-xs font-bold rounded-full border border-${color}-500/20`}>
                        {badge}
                    </span>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                    <Icon className={`w-7 h-7 text-${color}-400 group-hover:text-${color}-300`} />
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold text-text mb-3 group-hover:text-${color}-400 transition-colors`}>{title}</h3>
                <p className="text-text/60 text-sm mb-6 leading-relaxed h-[60px]">{desc}</p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                    {features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-text/80">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500`}></div>
                            {feature}
                        </div>
                    ))}
                </div>

                {/* Link */}
                <a href={link} className={`inline-flex items-center gap-2 text-${color}-400 font-bold group-hover:translate-x-2 transition-transform`}>
                    Explore Service <ChevronRight className="w-4 h-4" />
                </a>
            </div>
        </motion.div>
    );
};

const ServiceHero = () => {
    const services = [
        {
            icon: Megaphone, title: "Digital Marketing",
            desc: "Data-driven campaigns that convert strangers into high-value clients.",
            features: ["ROI Calculator", "PPC & Ads", "Funnel Strategy"],
            link: "#marketing", color: "pink", badge: "POPULAR"
        },
        {
            icon: Rocket, title: "Web Development",
            desc: "Bespoke, high-performance websites built with React & Next.js.",
            features: ["Tech Stack AI", "Custom UI/UX", "Speed Optimized"],
            link: "#web-dev", color: "blue", badge: "PREMIUM"
        },
        {
            icon: Search, title: "SEO Dominance",
            desc: "Own page one results with technical SEO and authority building.",
            features: ["Keyword AI", "Backlinking", "Rank Tracking"],
            link: "#seo", color: "emerald", badge: "LIVE"
        },
        {
            icon: Calculator, title: "Website Roaster",
            desc: "Brutal, AI-powered analysis of your current website's flaws.",
            features: ["Instant Audit", "UX Grading", "Conversion Tips"],
            link: "#roast", color: "orange", badge: "FREE TOOL"
        },
        {
            icon: FileText, title: "Resume ATS",
            desc: "Optimize your resume to beat Applicant Tracking Systems.",
            features: ["Score Check", "Keyword Fix", "PDF Parser"],
            link: "#resume-tool", color: "purple", badge: "AI"
        },
        {
            icon: MessageSquare, title: "AI Chat Agents",
            desc: "24/7 customer support agents that capture leads while you sleep.",
            features: ["Instant Reply", "Lead Capture", "Custom Knowledge"],
            link: "#ai-tools", color: "cyan"
        }
    ];

    return (
        <section id="service-hero" className="section-padding relative">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-text">World-Class Services</h2>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto leading-relaxed">Everything you need to dominate your market in the digital age.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <ServiceCard key={i} {...s} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
