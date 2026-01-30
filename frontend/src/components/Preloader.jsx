import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ finishLoading }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 1500),
            setTimeout(() => finishLoading(), 2100)
        ];
        return () => timers.forEach(clearTimeout);
    }, [finishLoading]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                        DIGITALLY<span className="text-primary">.</span>
                    </span>
                </motion.div>

                {/* Progress Bar */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="h-full bg-primary"
                    />
                </div>

                {/* Loading Text */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 text-xs tracking-[0.3em] uppercase text-white/40 font-bold"
                    >
                        {step === 0 && "Initializing"}
                        {step === 1 && "Forging Intelligence"}
                        {step === 2 && "Welcome"}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>
        </motion.div>
    );
};

export default Preloader;
