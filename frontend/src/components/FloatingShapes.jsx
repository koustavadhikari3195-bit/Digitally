import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const FloatingShapes = () => {
    const { theme } = useTheme();

    const isLight = theme === 'light' || theme === 'professional';
    const opacityClass = isLight ? 'opacity-20' : 'opacity-100';

    // shapes data: { size, color, initial position, animation duration }
    // shapes data: { size, color, initial position, animation duration }
    const shapes = [
        {
            type: "rounded-full",
            width: "w-64 md:w-96", height: "h-64 md:h-96",
            color: "bg-purple-500/20",
            top: "-10%", left: "-10%",
            duration: 25
        },
        {
            type: "rounded-3xl",
            width: "w-40 md:w-60", height: "h-40 md:h-60",
            color: "bg-blue-500/15",
            top: "40%", right: "-5%",
            duration: 30
        },
        {
            type: "rounded-full",
            width: "w-72 md:w-[30rem]", height: "h-72 md:h-[30rem]",
            color: "bg-primary/10",
            bottom: "-10%", left: "30%",
            duration: 35
        },
        {
            type: "rotate-45 rounded-2xl",
            width: "w-24 md:w-32", height: "h-24 md:h-32",
            color: "bg-pink-500/20",
            top: "20%", left: "15%",
            duration: 20
        },
        {
            type: "rounded-full",
            width: "w-32 md:w-48", height: "h-32 md:h-48",
            color: "bg-emerald-500/15",
            bottom: "20%", right: "15%",
            duration: 22
        }
    ];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 h-full w-full ${opacityClass}`}>
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${shape.width} ${shape.height} ${shape.color} ${shape.type} backdrop-blur-3xl`}
                    style={{ top: shape.top, left: shape.left, right: shape.right, bottom: shape.bottom, willChange: 'transform' }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingShapes;
