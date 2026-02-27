"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
                    <h2 className="text-2xl font-bold text-text-main">Oops, something went wrong!</h2>
                    <p className="mt-2 text-text-secondary">We're sorry for the inconvenience. Please try refreshing the page.</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-6 rounded-lg bg-primary px-6 py-2 font-bold text-white shadow-md hover:bg-primary-hover transition-colors"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
