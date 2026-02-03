import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cpu, Menu, X, Monitor, Palette, Sun, Moon, Zap, MessageSquare, FileText, Code, Search, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    // Handle hash-based scrolling when location changes
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    // Handle anchor link clicks - navigate and scroll
    const handleAnchorClick = (e, hash) => {
        e.preventDefault();
        setIsOpen(false);

        // If we're already on the home page
        if (location.pathname === '/') {
            if (window.location.hash !== hash) {
                // Changing hash triggers Home.jsx's hashchange listener
                window.location.hash = hash;
            } else {
                // If hash is the same, force scroll manually
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        } else {
            // Navigate to home page with hash
            navigate(`/${hash}`);
        }
    };

    const themes = [
        { id: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
        { id: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
        { id: 'neon', icon: <Monitor className="w-4 h-4" />, label: 'Neon' },
        { id: 'professional', icon: <Palette className="w-4 h-4" />, label: 'Pro' },
    ];

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 relative flex items-center justify-center">
                            <img
                                src="/logo.png"
                                alt="Digitally Logo"
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <span className={`text-2xl font-black tracking-tighter bg-clip-text text-transparent ${theme === 'professional' ? 'bg-gradient-to-r from-gray-900 to-gray-600' : 'bg-gradient-to-r from-primary to-purple-500'}`}>
                            DIGITALLY.
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-text/70 hover:text-primary font-medium transition-colors">Home</Link>
                        <a href="#roast" onClick={(e) => handleAnchorClick(e, '#roast')} className="text-red-500 hover:text-red-400 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer">🔥 Roast</a>
                        <a href="#marketing" onClick={(e) => handleAnchorClick(e, '#marketing')} className="text-text/70 hover:text-primary font-medium transition-all hover:translate-y-[-2px] cursor-pointer">Marketing</a>
                        <a href="#web-dev" onClick={(e) => handleAnchorClick(e, '#web-dev')} className="text-text/70 hover:text-primary font-medium transition-all hover:translate-y-[-2px] cursor-pointer">Web Dev</a>
                        <a href="#seo" onClick={(e) => handleAnchorClick(e, '#seo')} className="text-text/70 hover:text-primary font-medium transition-all hover:translate-y-[-2px] cursor-pointer">SEO</a>
                        <Link to="/dashboard" className="text-text/70 hover:text-primary font-medium transition-all hover:translate-y-[-2px]">Resume Tool</Link>
                        <Link to="/admin" className="text-text/30 hover:text-primary transition-all hover:scale-110" title="Admin Portal">
                            <ShieldCheck className="w-5 h-5" />
                        </Link>

                        {/* Theme Toggle */}
                        <div className="flex items-center bg-panel rounded-full p-1 border border-main shadow-lg">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => toggleTheme(t.id)}
                                    className={`p-2 rounded-full transition-all ${theme === t.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'text-text/60 hover:text-text'
                                        }`}
                                    title={t.label}
                                >
                                    {t.icon}
                                </button>
                            ))}
                        </div>

                        <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="btn-primary cursor-pointer">
                            Get Quote
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-text p-2">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden glass-panel border-t border-main overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 space-y-4">
                            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-text/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                <Cpu className="w-5 h-5" /> Home
                            </Link>
                            <a href="#roast" onClick={(e) => handleAnchorClick(e, '#roast')} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-xl transition-all font-bold cursor-pointer">
                                <Zap className="w-5 h-5" /> Roast My Site
                            </a>
                            <a href="#marketing" onClick={(e) => handleAnchorClick(e, '#marketing')} className="flex items-center gap-3 px-4 py-3 text-text/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer">
                                <MessageSquare className="w-5 h-5" /> Marketing
                            </a>
                            <a href="#web-dev" onClick={(e) => handleAnchorClick(e, '#web-dev')} className="flex items-center gap-3 px-4 py-3 text-text/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer">
                                <Code className="w-5 h-5" /> Web Development
                            </a>
                            <a href="#seo" onClick={(e) => handleAnchorClick(e, '#seo')} className="flex items-center gap-3 px-4 py-3 text-text/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer">
                                <Search className="w-5 h-5" /> SEO
                            </a>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-text/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-medium">
                                <FileText className="w-5 h-5" /> Resume ATS Tool
                            </Link>
                            <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-text/40 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-medium">
                                <ShieldCheck className="w-5 h-5" /> Admin Portal
                            </Link>

                            <div className="pt-4 border-t border-main">
                                <p className="text-xs font-bold text-text/40 mb-3 px-4 uppercase tracking-wider">Select Theme</p>
                                <div className="grid grid-cols-4 gap-2 px-2">
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => toggleTheme(t.id)}
                                            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${theme === t.id
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-panel border border-main text-text/60'
                                                }`}
                                        >
                                            {t.icon}
                                            <span className="text-[10px] font-bold">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="btn-primary w-full text-center py-4 text-lg block cursor-pointer">
                                    Get a Free Quote
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
