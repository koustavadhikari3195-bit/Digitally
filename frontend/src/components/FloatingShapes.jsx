import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const FloatingShapes = () => {
    const { theme } = useTheme();

    const isLight = theme === 'light' || theme === 'professional';
    const opacityClass = isLight ? 'opacity-20' : 'opacity-100';

    // shapes data: { size, color, initial position, animation duration }
    const shapes = [
        {
            type: "rounded-full",
            width: "w-64", height: "h-64",
            color: "bg-purple-500/10",
            top: "10%", left: "5%",
            duration: 20
        },
        {
            type: "rounded-3xl", // Cube-ish
            width: "w-40", height: "w-40",
            color: "bg-blue-500/10",
            top: "60%", right: "10%",
            duration: 25
        },
        {
            type: "rounded-full",
            width: "w-96", height: "h-96",
            color: "bg-primary/5",
            top: "30%", left: "40%",
            duration: 30
        },
        {
            type: "rotate-45 rounded-xl", // Diamond
            width: "w-20", height: "h-20",
            color: "bg-pink-500/20",
            bottom: "10%", left: "20%",
            duration: 15
        },
        {
            type: "rounded-full",
            width: "w-32", height: "h-32",
            color: "bg-emerald-500/10",
            top: "80%", left: "70%",
            duration: 18
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
