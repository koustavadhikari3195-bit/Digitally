import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const BackgroundBeams = () => {
    const { theme } = useTheme();

    // Use different blend modes for light/dark themes
    const blendMode = (theme === 'light' || theme === 'professional') ? 'multiply' : 'screen';
    const gridOpacity = (theme === 'light' || theme === 'professional') ? '0.05' : '0.1';

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Base gradient is now handled by body background in index.css */}

            {/* Animated Beams */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
            >
                {/* Beam 1 - Blue/Cyan */}
                <div className={`absolute left-[10%] top-[-20%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-${blendMode} animate-pulse duration-[4000ms]`} />

                {/* Beam 2 - Purple/Pink */}
                <div className={`absolute right-[10%] bottom-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-${blendMode} animate-pulse duration-[5000ms] delay-1000`} />

                {/* Beam 3 - Moving Light */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className={`absolute left-[40%] top-[30%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] mix-blend-${blendMode}`}
                />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: gridOpacity }}></div>
            </motion.div>
        </div>
    );
};

export default BackgroundBeams;
