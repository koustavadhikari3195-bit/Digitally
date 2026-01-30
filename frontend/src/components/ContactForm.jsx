import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, DollarSign, Calendar, MessageSquare, MapPin } from 'lucide-react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [includeLocation, setIncludeLocation] = useState(false);
    const [locationData, setLocationData] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        let currentLoc = null;
        if (includeLocation) {
            try {
                const pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                currentLoc = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy
                };
            } catch (err) {
                console.warn('Location access denied or failed.');
            }
        }

        try {
            await axios.post('/api/contact', {
                ...formData,
                location: currentLoc
            });
            setStatus('success');
            setFormData({ name: '', email: '', service: '', budget: '', message: '' });
            setIncludeLocation(false);
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="text-3xl font-bold text-text mb-2">Send us a Message</h3>
            <p className="text-text/60 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text mb-2 block">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full p-4 rounded-xl bg-panel border-2 border-white/10 text-text placeholder-text/30 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text mb-2 block">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full p-4 rounded-xl bg-panel border-2 border-white/10 text-text placeholder-text/30 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text mb-2 block">Service Interested In</label>
                        <div className="relative">
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-panel border-2 border-white/10 text-text focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none appearance-none transition-all font-medium"
                            >
                                <option value="" className="bg-background text-text">Select a service...</option>
                                <option value="Web Development" className="bg-background text-text">Web Development</option>
                                <option value="Digital Marketing" className="bg-background text-text">Digital Marketing</option>
                                <option value="SEO Optimization" className="bg-background text-text">SEO Optimization</option>
                                <option value="Website Roast" className="bg-background text-text">Website Roast</option>
                                <option value="Resume ATS Tool" className="bg-background text-text">Resume ATS Tool</option>
                                <option value="Other" className="bg-background text-text">Other</option>
                            </select>
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text mb-2 block">Estimated Budget</label>
                        <div className="relative">
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-panel border-2 border-white/10 text-text focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none appearance-none transition-all font-medium"
                            >
                                <option value="" className="bg-background text-text">Select budget range...</option>
                                <option value="Under $1k" className="bg-background text-text">Under $1k</option>
                                <option value="$1k - $5k" className="bg-background text-text">$1k - $5k</option>
                                <option value="$5k - $10k" className="bg-background text-text">$5k - $10k</option>
                                <option value="$10k+" className="bg-background text-text">$10k+</option>
                            </select>
                            <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text mb-2 block">Project Details</label>
                    <div className="relative">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                            rows="4"
                            className="w-full p-4 rounded-xl bg-panel border-2 border-white/10 text-text placeholder-text/30 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-medium resize-none"
                        ></textarea>
                        <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-text/40 pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-panel border-2 border-white/5 hover:border-primary/30 transition-all cursor-pointer group mb-6" onClick={() => setIncludeLocation(!includeLocation)}>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${includeLocation ? 'bg-primary border-primary' : 'border-white/20'}`}>
                            {includeLocation && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text group-hover:text-primary transition-colors flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Include my location
                            </p>
                            <p className="text-xs text-text/40">Helping us serve you better based on your region</p>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${status === 'success'
                        ? 'bg-emerald-500 text-white'
                        : 'btn-primary'
                        }`}
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Message Sent!
                        </>
                    ) : status === 'error' ? (
                        <>
                            <AlertCircle className="w-5 h-5" />
                            Try Again
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
