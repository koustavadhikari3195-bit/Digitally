import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function TouchCard({ children, onSwipeLeft, onSwipeRight, className = "" }) {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);

    const handleDragEnd = (_, info) => {
        if (info.offset.x > 100 && onSwipeRight) {
            onSwipeRight();
        } else if (info.offset.x < -100 && onSwipeLeft) {
            onSwipeLeft();
        }
    };

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{ x, opacity, rotate }}
            whileTap={{ scale: 0.98 }}
            className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 cursor-grab active:cursor-grabbing touch-none ${className}`}
        >
            {children}
        </motion.div>
    );
}
