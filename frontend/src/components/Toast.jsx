import { motion, AnimatePresence } from 'framer-motion';
import { useState, createContext, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, 5000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className={`pointer-events-auto backdrop-blur-xl bg-slate-900/80 border p-4 rounded-xl min-w-[300px] shadow-2xl ${toast.type === 'success' ? 'border-green-500/50 text-green-400' :
                                    toast.type === 'error' ? 'border-red-500/50 text-red-400' :
                                        toast.type === 'warning' ? 'border-yellow-500/50 text-yellow-400' :
                                            'border-blue-500/50 text-blue-400'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-xl font-bold">
                                    {toast.type === 'success' && '✓'}
                                    {toast.type === 'error' && '✕'}
                                    {toast.type === 'warning' && '⚠'}
                                    {toast.type === 'info' && 'ℹ'}
                                </div>
                                <div className="flex-1 font-medium">{toast.message}</div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};
