import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import PageTransition from './components/PageTransition';
import Preloader from './components/Preloader';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AnalysisResults = lazy(() => import('./pages/AnalysisResults'));
const AdminLeads = lazy(() => import('./pages/AdminLeads'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));

const LoadingFallback = () => (
    <div className="min-h-[40vh] flex flex-col items-center justify-center">
        <div className="w-16 h-[1px] bg-primary/20 rounded-full overflow-hidden">
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full bg-primary w-1/2"
            />
        </div>
    </div>
);

function App() {
    const [isPreloading, setIsPreloading] = useState(() => !sessionStorage.getItem('site-loaded'));

    useEffect(() => {
        if (isPreloading) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isPreloading]);

    return (
        <ErrorBoundary>
            <ToastProvider>
                <AnimatePresence mode="wait">
                    {isPreloading && (
                        <Preloader
                            finishLoading={() => {
                                setIsPreloading(false);
                                sessionStorage.setItem('site-loaded', 'true');
                            }}
                        />
                    )}
                </AnimatePresence>

                <Router>
                    <div className={`min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white transition-opacity duration-700 ${isPreloading ? 'opacity-0' : 'opacity-100'}`}>
                        {!isPreloading && <Navbar />}
                        <main className="flex-grow">
                            <PageTransition>
                                <Suspense fallback={<LoadingFallback />}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/analysis/:id" element={<AnalysisResults />} />
                                        <Route path="/admin" element={<AdminLeads />} />
                                        <Route path="/admin/login" element={<AdminLogin />} />
                                    </Routes>
                                </Suspense>
                            </PageTransition>
                        </main>
                        {!isPreloading && (
                            <>
                                <Footer />
                                <AIChatWidget />
                            </>
                        )}
                    </div>
                </Router>
            </ToastProvider>
        </ErrorBoundary>
    );
}

export default App;
