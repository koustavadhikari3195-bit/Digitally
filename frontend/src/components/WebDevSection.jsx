import React from 'react';
import { motion } from 'framer-motion';
import { Code, Gauge, Smartphone, Shield, Palette } from 'lucide-react';

const WebDevSection = () => {
    const features = [
        { icon: <Gauge className="w-6 h-6" />, title: "Blazing Fast", desc: "Sub-second load times with modern frameworks" },
        { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First", desc: "Responsive design that works everywhere" },
        { icon: <Shield className="w-6 h-6" />, title: "Secure", desc: "Enterprise-grade security built-in" },
        { icon: <Palette className="w-6 h-6" />, title: "Custom Design", desc: "No templates—100% bespoke" }
    ];

    const process = [
        { step: "01", title: "Discovery", desc: "We learn your business, goals, and users" },
        { step: "02", title: "Design", desc: "UI/UX wireframes and high-fidelity mockups" },
        { step: "03", title: "Develop", desc: "Clean, modern code that scales" },
        { step: "04", title: "Deploy", desc: "Launch with confidence + ongoing support" }
    ];

    return (
        <section id="web-dev" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
                        <Code className="w-4 h-4" />
                        Web Development
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                        Bespoke Digital <span className="text-blue-500">Infrastructures</span>
                    </h2>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto leading-relaxed">
                        Your website is the foundation of your digital empire. We build high-speed, headless experiences that combine elite design with battle-tested technical performance.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 rounded-2xl text-center"
                        >
                            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-500">
                                {feature.icon}
                            </div>
                            <h4 className="text-lg font-bold text-text mb-2">{feature.title}</h4>
                            <p className="text-text/60 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Process */}
                <div>
                    <h3 className="text-2xl font-bold text-center text-text mb-8">Our Process</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <div key={i} className="glass-panel p-6 rounded-2xl relative">
                                <span className="text-5xl font-black text-blue-500/20 absolute top-4 right-4">{p.step}</span>
                                <h4 className="text-lg font-bold text-text mb-2">{p.title}</h4>
                                <p className="text-text/60 text-sm">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebDevSection;
