import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollReveal = ({ children, width = "100%", delay = 0, parallaxSpeed = 0 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax logic: if speed > 0, element moves faster/slower than scroll
    const y = useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxSpeed]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
                style={{ y: parallaxSpeed ? y : 0 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
