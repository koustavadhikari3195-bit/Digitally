import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Loader2, AlertCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [uploading, setUploading] = useState(false);
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchHistory = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            let guestIds = [];
            try {
                guestIds = JSON.parse(localStorage.getItem('guest-resume-history') || '[]');
                if (!Array.isArray(guestIds)) guestIds = [];
            } catch (e) {
                guestIds = [];
            }

            let url = '/api/resumes';
            const params = [];
            if (guestIds.length > 0) params.push(`ids=${guestIds.join(',')}`);

            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }

            if (!token && guestIds.length === 0) {
                setHistory([]);
                setLoadingHistory(false);
                return;
            }

            const res = await axios.get(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            // Ensure we always have an array
            setHistory(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch history:", err);
            setHistory([]);
        } finally {
            setLoadingHistory(false);
        }
    }, []);

    // Fetch history on mount
    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('resume', file);

        try {
            // 1. Upload
            const headers = { 'Content-Type': 'multipart/form-data' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const uploadRes = await axios.post('/api/resumes', formData, { headers });

            const resumeId = uploadRes.data?._id;
            if (!resumeId) throw new Error("Upload succeeded but no ID returned.");

            // 1b. Store in guest history if not logged in
            if (!token) {
                let guestHistory = [];
                try {
                    guestHistory = JSON.parse(localStorage.getItem('guest-resume-history') || '[]');
                    if (!Array.isArray(guestHistory)) guestHistory = [];
                } catch (e) {
                    guestHistory = [];
                }

                if (!guestHistory.includes(resumeId)) {
                    guestHistory.push(resumeId);
                    localStorage.setItem('guest-resume-history', JSON.stringify(guestHistory));
                }
            }

            // 2. Analyze (Trigger immediately for better UX)
            await axios.post(`/api/resumes/${resumeId}/analyze`, {}, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });

            // 3. Navigate
            navigate(`/analysis/${resumeId}`);

        } catch (err) {
            console.error(err);
            setError("Upload failed. Please try a valid PDF, DOC, or DOCX file.");
        } finally {
            setUploading(false);
        }
    }, [navigate]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        multiple: false
    });

    const formatTime = (dateStr) => {
        if (!dateStr) return 'N/A';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-numeric', minute: '2-numeric' });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-text">Dashboard</h1>
                <p className="text-text/60">Manage your resumes and view analysis reports.</p>
            </div>

            {/* Guest Orientation */}
            {!localStorage.getItem('token') && (
                <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-3 text-blue-400">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">
                            <span className="font-bold">Guest Mode:</span> Your scans are stored locally.
                            <button
                                onClick={() => navigate('/admin/login')}
                                className="ml-2 underline font-bold hover:text-blue-200 transition-colors"
                            >
                                Register
                            </button> to sync across devices.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Area */}
                <div className="glass-panel p-8 rounded-2xl border-dashed border-2 border-main bg-panel/50 hover:border-primary transition-colors cursor-pointer" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-panel p-4 rounded-full mb-4">
                            {uploading ? <Loader2 className="h-8 w-8 text-primary animate-spin" /> : <UploadCloud className="h-8 w-8 text-primary" />}
                        </div>
                        <h3 className="text-xl font-semibold text-text mb-2">
                            {isDragActive ? "Drop here..." : "Upload your Resume"}
                        </h3>
                        <p className="text-text/60 mb-6 max-w-sm">
                            Drag & drop your PDF here, or click to browse. We&apos;ll analyze it instantly.
                        </p>
                        {error && (
                            <div className="flex items-center text-red-400 gap-2 mt-4 text-sm bg-red-900/20 px-4 py-2 rounded-lg">
                                <AlertCircle className="h-4 w-4" /> {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Scans */}
                <div className="glass-panel p-8 rounded-2xl overflow-hidden flex flex-col">
                    <h3 className="text-xl font-bold text-text mb-6">Recent Scans</h3>
                    <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {loadingHistory ? (
                            <div className="flex justify-center p-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-center p-12 border border-dashed border-main rounded-xl">
                                <FileText className="w-12 h-12 text-text/10 mx-auto mb-4" />
                                <p className="text-text/40 text-sm">No analysis history found.</p>
                            </div>
                        ) : (
                            (history || []).map((item) => (
                                <Link
                                    key={item?._id || Math.random()}
                                    to={item?._id ? `/analysis/${item._id}` : '#'}
                                    className="flex items-center justify-between p-4 bg-panel rounded-lg border border-main hover:border-primary/40 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-primary/60" />
                                        <div>
                                            <h4 className="text-text font-medium group-hover:text-primary transition-colors truncate max-w-[150px]">{item?.originalName || 'Untitled'}</h4>
                                            <p className="text-[10px] text-text/40 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {item?.createdAt ? formatTime(item.createdAt) : 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${!item?.analysisResult?.score ? 'bg-slate-500/10 text-slate-400' :
                                        item.analysisResult.score >= 80 ? 'bg-emerald-500/10 text-emerald-400' :
                                            item.analysisResult.score >= 60 ? 'bg-yellow-500/10 text-yellow-400' :
                                                'bg-red-500/10 text-red-400'
                                        }`}>
                                        {item?.analysisResult?.score ? `Score: ${item.analysisResult.score}` : 'Pending'}
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

