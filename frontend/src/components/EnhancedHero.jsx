import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Rocket, Star, Users, Bot, Building2, Beaker, Zap, ArrowRight } from 'lucide-react';

export default function EnhancedHero({ viewMode, setViewMode }) {
    const { theme } = useTheme();
    const { scrollY } = useScroll();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [200, 600], [1, 0]);

    useEffect(() => {
        const handleMouse = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const getHeroBackground = () => {
        switch (theme) {
            case 'light': return 'bg-gradient-to-br from-slate-50 via-white to-slate-100';
            case 'neon': return 'bg-gradient-to-br from-black via-purple-950 to-pink-950';
            case 'professional': return 'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100';
            default: return 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900';
        }
    };

    const isLight = theme === 'light' || theme === 'professional';

    return (
        <div className={`relative min-h-[110vh] overflow-hidden ${getHeroBackground()}`}>
            {/* Animated Background Orbs */}
            <motion.div
                style={{ x: y1, y: y2 }}
                className={`absolute top-20 left-20 w-96 h-96 ${isLight ? 'bg-purple-500/10' : 'bg-purple-500/20'} rounded-full blur-3xl pointer-events-none`}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />

            <motion.div
                style={{ x: y2, y: y1 }}
                className={`absolute bottom-20 right-20 w-96 h-96 ${isLight ? 'bg-pink-500/10' : 'bg-pink-500/20'} rounded-full blur-3xl pointer-events-none`}
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [90, 0, 90],
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Mouse-Following Gradient */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(800px circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, ${isLight ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.15)'}, transparent 80%)`
                }}
            />

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 flex flex-col items-center justify-center min-h-[110vh] px-4 py-32 text-center"
            >
                {/* Branding Hook */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 font-black uppercase tracking-[0.2em] text-sm ${isLight ? 'bg-slate-900/10 text-slate-900 border-slate-900/10' : 'bg-primary/20 text-primary border-primary/20'} border`}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    The Vanguard of AI Execution
                </motion.div>
                {/* Glassmorphism Card */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ duration: 0.8 }}
                    className={`max-w-6xl backdrop-blur-2xl ${isLight ? 'bg-white/60 border-slate-200' : 'bg-white/5 border-white/10'} border rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden`}
                >
                    <motion.h1
                        className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r ${isLight ? 'from-purple-700 via-pink-600 to-blue-700' : 'from-purple-400 via-pink-400 to-blue-400'} bg-clip-text text-transparent leading-[1.1] pb-2 px-1 tracking-tight mx-auto`}
                        animate={{
                            backgroundPosition: ['0%', '100%', '0%']
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        style={{ backgroundSize: '200%' }}
                    >
                        Forge Your Digital Dominance
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-lg md:text-2xl ${isLight ? 'text-slate-600' : 'text-slate-300'} mb-14 font-medium max-w-2xl mx-auto leading-relaxed`}
                    >
                        Elite human creativity. Advanced AI weaponization. We build brands that command their markets.
                    </motion.p>

                    {/* Mode Toggle with Animation */}
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        {['agency', 'lab'].map((mode) => (
                            <motion.button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all ${viewMode === mode
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                                    : `${isLight ? 'bg-slate-200/50 hover:bg-slate-200 text-slate-700' : 'bg-white/5 hover:bg-white/10 text-slate-300'}`
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {mode === 'agency' ? <Building2 className="w-5 h-5" /> : <Beaker className="w-5 h-5" />}
                                {mode === 'agency' ? 'Agency' : 'AI Lab'}
                            </motion.button>
                        ))}
                    </div>

                    {/* Animated Hooks Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 w-full">
                        {[
                            { value: 'ROAS', label: 'Exponential ROI', icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" /> },
                            { value: 'SYNC', label: 'AI Precision', icon: <Bot className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" /> },
                            { value: 'ELITE', label: 'Infrastructure', icon: <Building2 className="w-6 h-6 md:w-8 md:h-8 text-blue-500" /> },
                            { value: 'FORCE', label: 'Global Scale', icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-orange-400" /> }
                        ].map((hook, idx) => (
                            <motion.div
                                key={hook.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`flex flex-col items-center backdrop-blur-lg ${isLight ? 'bg-slate-50/50 border-slate-200' : 'bg-white/5 border-white/10'} border rounded-2xl p-4 md:p-6 shadow-lg`}
                            >
                                <div className="mb-3">{hook.icon}</div>
                                <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${isLight ? 'from-purple-700 to-pink-600' : 'from-purple-400 to-pink-400'} bg-clip-text text-transparent pb-1`}>
                                    {hook.value}
                                </div>
                                <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{hook.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="text-slate-400 text-sm mb-2">Scroll to explore</div>
                    <div className="w-6 h-10 border-2 border-slate-400 rounded-full mx-auto flex justify-center">
                        <motion.div
                            className="w-1.5 h-2 bg-slate-400 rounded-full mt-2"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
