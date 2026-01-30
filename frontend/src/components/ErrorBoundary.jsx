import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-main p-4 text-center">
                    <div className="glass-panel p-8 rounded-2xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-text mb-4">Something went wrong.</h2>
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 text-left">
                            <p className="text-red-400 font-mono text-xs overflow-auto max-h-40 whitespace-pre-wrap">
                                {this.state.error?.stack || this.state.error?.message || this.state.error?.toString()}
                            </p>
                        </div>
                        <p className="text-text/60 mb-6 font-medium">The application encountered an unexpected error. Please share the error above with support.</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="btn-primary w-full"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
