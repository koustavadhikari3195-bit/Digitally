import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ServiceTemplate = ({ title, subtitle, icon: Icon, features, pricing }) => {
    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-panel rounded-2xl mb-8 animate-fade-in-up">
                        <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text to-text/60">
                        {title}
                    </h1>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto mb-10">
                        {subtitle}
                    </p>
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                        Get Started <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-panel/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                                            <p className="text-text/60">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6 text-center">Pricing Plans</h3>
                            <div className="space-y-6">
                                {pricing.map((plan, index) => (
                                    <div key={index} className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-primary">{plan.name}</span>
                                            <span className="text-xl font-bold">{plan.price}</span>
                                        </div>
                                        <p className="text-sm text-text/60">{plan.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceTemplate;
