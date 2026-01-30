import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users,
    MessageSquare,
    Zap,
    Target,
    Filter,
    ChevronDown,
    ChevronUp,
    Search,
    Clock,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminLeads = () => {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [expandedLead, setExpandedLead] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchLeads(token);
    }, []);

    const fetchLeads = async (token) => {
        try {
            const config = {
                headers: { 'x-admin-auth': token || localStorage.getItem('adminToken') }
            };
            const response = await axios.get('/api/admin/leads', config);
            setLeads(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching leads:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            }
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: { 'x-admin-auth': token }
            };
            await axios.patch(`/api/admin/leads/${id}`, { status }, config);
            fetchLeads(token); // Refresh
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesFilter = filter === 'all' || lead.type === filter;
        const searchLower = search.toLowerCase();
        const matchesSearch =
            (lead.name?.toLowerCase().includes(searchLower)) ||
            (lead.email?.toLowerCase().includes(searchLower)) ||
            (lead.service?.toLowerCase().includes(searchLower));
        return matchesFilter && matchesSearch;
    });

    const getTypeIcon = (type) => {
        switch (type) {
            case 'contact': return <MessageSquare className="w-5 h-5 text-blue-400" />;
            case 'roast': return <Zap className="w-5 h-5 text-red-400" />;
            case 'qualify': return <Target className="w-5 h-5 text-purple-400" />;
            default: return <Users className="w-5 h-5" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-text mb-2">Leads Command Center</h1>
                    <p className="text-text/60">Manage your incoming project inquiries and tool interactions.</p>
                </div>

                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    {/* Logout */}
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminToken');
                            navigate('/admin/login');
                        }}
                        className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-all"
                    >
                        Logout
                    </button>
                    {/* Search */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-panel border border-main rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:border-primary/50"
                        />
                    </div>

                    {/* Filter */}
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-panel border border-main rounded-xl px-4 py-2 focus:outline-none"
                    >
                        <option value="all">All Types</option>
                        <option value="contact">Contact Form</option>
                        <option value="roast">Website Roasts</option>
                        <option value="qualify">Lead Qualifiers</option>
                    </select>
                </div>
            </header>

            {/* Leads Table/List */}
            <div className="space-y-4">
                {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                    <div key={lead._id} className="glass-panel rounded-2xl overflow-hidden border border-main hover:border-primary/20 transition-all">
                        <div
                            className="p-6 flex flex-wrap items-center justify-between gap-6 cursor-pointer"
                            onClick={() => setExpandedLead(expandedLead === lead._id ? null : lead._id)}
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-panel flex items-center justify-center border border-main shadow-inner">
                                    {getTypeIcon(lead.type)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-text">{lead.name || (lead.type === 'roast' ? 'Anonymous Roast' : 'Potential Lead')}</h3>
                                    <div className="flex items-center gap-3 text-sm text-text/40">
                                        <Clock className="w-3 h-3" />
                                        {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block text-center">
                                <p className="text-xs text-text/40 uppercase font-black mb-1">Service / Tool</p>
                                <p className="font-medium text-text">{lead.service || 'Analysis'}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    }`}>
                                    {lead.status.toUpperCase()}
                                </div>
                                {expandedLead === lead._id ? <ChevronUp className="w-5 h-5 text-text/40" /> : <ChevronDown className="w-5 h-5 text-text/40" />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedLead === lead._id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-main bg-black/10 overflow-hidden"
                                >
                                    <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {/* Basic Info */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-black text-primary uppercase">Details</h4>
                                            {lead.email && (
                                                <div>
                                                    <p className="text-xs text-text/40 mb-1">Email Address</p>
                                                    <p className="text-text font-medium">{lead.email}</p>
                                                </div>
                                            )}
                                            {lead.budget && (
                                                <div>
                                                    <p className="text-xs text-text/40 mb-1">Budget Range</p>
                                                    <p className="text-text font-medium">{lead.budget}</p>
                                                </div>
                                            )}
                                            {lead.message && (
                                                <div>
                                                    <p className="text-xs text-text/40 mb-1">Initial Message</p>
                                                    <p className="text-text/80 text-sm italic">"{lead.message}"</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actionable Details from Tools */}
                                        {lead.details && Object.keys(lead.details).length > 0 && (
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-black text-primary uppercase">AI Findings</h4>
                                                {lead.type === 'roast' && (
                                                    <div className="bg-panel/50 p-4 rounded-xl border border-main">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-xs font-bold text-text/60">Roast Score</span>
                                                            <span className={`text-xl font-black ${lead.details.score > 70 ? 'text-emerald-400' : 'text-red-400'}`}>{lead.details.score}</span>
                                                        </div>
                                                        <p className="text-sm text-text/80 italic">"{lead.details.headline}"</p>
                                                    </div>
                                                )}
                                                {lead.type === 'qualify' && (
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="text-xs text-text/40 mb-1">ROI Prediction</p>
                                                            <p className="text-sm font-bold text-emerald-400">{lead.details.potentialROI}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-text/40 mb-1">Timeline</p>
                                                            <p className="text-sm text-text">{lead.details.timeline}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Management Actions */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-black text-primary uppercase">Management</h4>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs text-text/40">Change Status</label>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateStatus(lead._id, 'new')}
                                                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${lead.status === 'new' ? 'bg-blue-500 text-white border-blue-500' : 'bg-panel border-main hover:border-blue-500'}`}
                                                    >
                                                        New
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(lead._id, 'contacted')}
                                                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${lead.status === 'contacted' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-panel border-main hover:border-yellow-500'}`}
                                                    >
                                                        Contacted
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(lead._id, 'closed')}
                                                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${lead.status === 'closed' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-panel border-main hover:border-emerald-500'}`}
                                                    >
                                                        Closed
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                                <XCircle className="w-4 h-4 text-red-500" /> Remove Record
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )) : (
                    <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-2 border-main">
                        <Users className="w-16 h-16 mx-auto text-text/10 mb-4" />
                        <h3 className="text-xl font-bold text-text/40">No leads found yet.</h3>
                        <p className="text-text/20">Go out there and capture some business!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLeads;
