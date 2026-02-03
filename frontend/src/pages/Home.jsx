import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import EnhancedHero from '../components/EnhancedHero';
import { SectionLoader, CardSkeleton, ListSkeleton } from '../components/SkeletonLoader';

const WebsiteRoaster = React.lazy(() => import('../components/WebsiteRoaster'));
const LeadQualifier = React.lazy(() => import('../components/LeadQualifier'));
const AIShowcase = React.lazy(() => import('../components/AIShowcase'));
const ServiceHero = React.lazy(() => import('../components/ServiceHero'));
const MarketingSection = React.lazy(() => import('../components/MarketingSection'));
const WebDevSection = React.lazy(() => import('../components/WebDevSection'));
const SEOSection = React.lazy(() => import('../components/SEOSection'));
const ContactForm = React.lazy(() => import('../components/ContactForm'));
const PortfolioSection = React.lazy(() => import('../components/PortfolioSection'));
const AIToolsHub = React.lazy(() => import('../components/AIToolsHub'));
const BackgroundBeams = React.lazy(() => import('../components/BackgroundBeams'));
const ScrollReveal = React.lazy(() => import('../components/ScrollReveal'));
const FloatingShapes = React.lazy(() => import('../components/FloatingShapes'));

const Home = () => {
    const { theme } = useTheme();
    // Mode State: 'agency' | 'lab'
    const [viewMode, setViewMode] = useState('agency');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Handle deep links and smooth scroll
    // Handle deep links and smooth scroll
    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash;
            if (hash) {
                // Determine which mode the hash belongs to
                const agencySections = ['#marketing', '#web-dev', '#seo', '#portfolio', '#service-hero', '#contact'];
                const labSections = ['#ai-tools', '#roast', '#qualify', '#resume-tool', '#showcase'];

                if (agencySections.includes(hash)) {
                    if (viewMode !== 'agency') setViewMode('agency');
                } else if (labSections.includes(hash)) {
                    if (viewMode !== 'lab') setViewMode('lab');
                }

                // Wait for mode switch and lazy load
                setTimeout(() => {
                    const element = document.querySelector(hash);
                    if (element) {
                        const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }, 600); // Increased delay to ensure lazy loaded components render
            }
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);

        // Handle clicks on already active hash
        const handleClick = (e) => {
            const link = e.target.closest('a');
            if (link && link.hash && link.pathname === window.location.pathname) {
                if (link.hash === window.location.hash) {
                    handleHash();
                }
            }
        };
        document.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('hashchange', handleHash);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-main">
            {/* GLOBAL BACKGROUNDS */}
            <div className={`absolute inset-0 pointer-events-none -z-20 transition-opacity duration-[2000ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Suspense fallback={null}>
                    <BackgroundBeams />
                    <FloatingShapes />
                </Suspense>
            </div>

            {/* HIGH-FIDELITY HERO (Covers mode selection and branding) */}
            <EnhancedHero viewMode={viewMode} setViewMode={setViewMode} />

            {/* DYNAMIC CONTENT SWITCHER */}
            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {viewMode === 'agency' ? (
                        <motion.div
                            key="agency-content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Service Navigation */}
                            <ScrollReveal>
                                <ServiceHero />
                            </ScrollReveal>

                            {/* Main Services */}
                            <Suspense fallback={<ListSkeleton count={3} />}>
                                <ScrollReveal parallaxSpeed={0.1}>
                                    <MarketingSection />
                                </ScrollReveal>

                                <ScrollReveal>
                                    <WebDevSection />
                                </ScrollReveal>

                                <ScrollReveal parallaxSpeed={0.1}>
                                    <SEOSection />
                                </ScrollReveal>

                                <ScrollReveal>
                                    <PortfolioSection />
                                </ScrollReveal>
                            </Suspense>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="lab-content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Suspense fallback={<SectionLoader />}>
                                {/* Central Hub */}
                                <ScrollReveal>
                                    <AIToolsHub />
                                </ScrollReveal>

                                {/* Viral Tools */}
                                <ScrollReveal parallaxSpeed={0.2}>
                                    <WebsiteRoaster />
                                </ScrollReveal>

                                {/* Resume Tool */}
                                <section id="resume-tool" className="section-padding relative overflow-hidden">
                                    <div className="container-custom">
                                        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'light' || theme === 'professional' ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/10 text-purple-400'} text-sm font-medium mb-6 border border-purple-500/20`}>
                                                    <FileText className="w-4 h-4" />
                                                    AI-Powered Tool
                                                </div>
                                                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 ${theme === 'light' || theme === 'professional' ? 'text-slate-900' : 'text-white'} leading-tight`}>Beat the <span className="gradient-text">ATS Bots</span></h2>
                                                <p className={`text-xl ${theme === 'light' || theme === 'professional' ? 'text-slate-600' : 'text-slate-300'} leading-relaxed mb-10`}>90% of resumes never reach a human. Our AI analyzes your resume against real ATS algorithms and provides a detailed optimization plan.</p>
                                                <Link to="/dashboard" className="btn-gradient text-lg px-10 py-4 inline-flex items-center gap-2 group">
                                                    Analyze My Resume <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </motion.div>
                                            <div className="glass-card p-12 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className="text-center relative z-10">
                                                    <div className="text-7xl font-black gradient-text mb-2">87</div>
                                                    <div className="text-sm tracking-widest text-slate-400 uppercase font-bold">ATS COMPATIBILITY SCORE</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <ScrollReveal>
                                    <LeadQualifier />
                                </ScrollReveal>

                                <ScrollReveal>
                                    <AIShowcase />
                                </ScrollReveal>
                            </Suspense>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* SHARED CTA SECTION */}
            <ScrollReveal>
                <section id="contact" className="section-padding relative overflow-hidden border-t border-white/5">
                    <div className={`absolute inset-0 -z-10 bg-mesh-gradient ${theme === 'light' || theme === 'professional' ? 'opacity-5' : 'opacity-10'}`}></div>
                    <div className="container-custom text-center">
                        <h2 className={`text-5xl md:text-7xl font-bold mb-10 ${theme === 'light' || theme === 'professional' ? 'text-slate-900' : 'text-white'} tracking-tight`}>Ready to <span className="gradient-text">Dominate?</span></h2>
                        <p className={`text-xl ${theme === 'light' || theme === 'professional' ? 'text-slate-600' : 'text-slate-300'} mb-16 max-w-2xl mx-auto leading-relaxed`}>Whether you need elite services or custom AI tools, we forge the path to your digital superiority.</p>
                        <Suspense fallback={<CardSkeleton />}>
                            <ContactForm />
                        </Suspense>
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
};

export default Home;
