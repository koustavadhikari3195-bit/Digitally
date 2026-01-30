import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

export default function AnimatedList({ items = [], renderItem, className = "" }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`space-y-4 ${className}`}
        >
            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                >
                    {renderItem(item, idx)}
                </motion.div>
            ))}
        </motion.div>
    );
}
