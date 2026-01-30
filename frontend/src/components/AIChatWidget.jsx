import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hey! I'm the Digitally AI. Ask me anything about our services, or just say hi. 👋" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await axios.post('/api/ai/chat', {
                message: input,
                history: messages.slice(-6) // Keep last 6 messages for context
            });

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Hmm, my circuits are a bit fried. Try again?"
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const quickReplies = [
        "What services do you offer?",
        "Tell me about web development",
        "How can AI help my business?"
    ];

    return (
        <>
            {/* Chat Toggle Button - Enhanced Visibility */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
                {/* Label */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-panel px-4 py-2 rounded-full border border-[var(--border-color)] shadow-lg hidden sm:block"
                    >
                        <p className="text-sm font-medium text-text">💬 Chat with AI</p>
                    </motion.div>
                )}

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
                </motion.button>

                {/* Pulsing Indicator */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                    </span>
                )}
            </div>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-28 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'var(--panel-bg)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-main bg-gradient-to-r from-primary/20 to-purple-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text">Digitally AI</h3>
                                    <p className="text-xs text-text/60">Always online • Ready to help</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-br-md text-sm'
                                        : 'bg-panel border border-main text-text rounded-bl-md text-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 text-text px-4 py-2 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {quickReplies.map((reply, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setInput(reply);
                                        }}
                                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-main">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-panel border border-main rounded-xl px-4 py-2 text-text placeholder-text/40 text-sm focus:outline-none focus:border-primary/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-50 hover:bg-primary/80 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;
