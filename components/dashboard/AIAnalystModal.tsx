"use client";

import React, { useState, useEffect } from 'react';
import { Bot, X, Sparkles, Loader2 } from 'lucide-react';

import { Stats } from '@/types';

interface AIAnalystModalProps {
    isOpen: boolean;
    onClose: () => void;
    stats: Stats;
}

const AIAnalystModal: React.FC<AIAnalystModalProps> = ({ isOpen, onClose, stats }) => {
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && !analysis) {
            generateAnalysis();
        }
    }, [isOpen]);

    const generateAnalysis = async () => {
        setLoading(true);
        setError(null);
        const apiKey = ""; // Injected by environment

        const prompt = `
      You are an elite Wall Street Trading Coach and Risk Analyst. 
      Analyze the following live trading statistics for a funded trader account:
      
      - Equity: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.equity)}
      - Balance: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.balance)}
      - Win Rate: ${stats.winRate}%
      - Average Profit: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.avgProfit)}
      - Average Loss: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.avgLoss)}
      - Total Trades: ${stats.numTrades}

      Task:
      1. Calculate the Risk-to-Reward ratio based on Avg Profit/Avg Loss.
      2. Provide a brief, high-impact assessment of their performance (Professional yet encouraging tone).
      3. Identify one key strength and one potential risk.
      4. Give one actionable tip for the next trading session.

      Format the response with simple HTML tags for bolding (<b>) or line breaks (<br>) where appropriate for readability, but do not use markdown code blocks. Keep it concise (under 150 words).
    `;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            setAnalysis(text || "Unable to generate analysis at this time.");
        } catch (err) {
            setError("AI Service Unavailable. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-[#0a0a0a] border border-[#DCC885] w-full max-w-lg rounded-2xl p-6 shadow-[0_0_50px_rgba(220,200,133,0.15)] overflow-hidden">
                {/* Decorative header glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DCC885] to-transparent"></div>

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#DCC885]/10 flex items-center justify-center border border-[#DCC885]/20">
                            <Bot className="text-[#DCC885]" size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Gemini Market Analyst</h3>
                            <p className="text-xs text-[#DCC885] uppercase tracking-wider">Live Portfolio Insight</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="min-h-[200px] bg-[#111] rounded-xl p-5 border border-gray-800/50 text-sm leading-relaxed text-gray-300 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <Loader2 className="animate-spin text-[#DCC885]" size={32} />
                            <span className="text-xs text-gray-500 animate-pulse">Analyzing portfolio metrics...</span>
                        </div>
                    ) : error ? (
                        <div className="text-red-400 text-center py-8">{error}</div>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: analysis }}></div>
                    )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div className="text-[10px] text-gray-600 flex items-center gap-1">
                        <Sparkles size={10} /> Powered by Google Gemini
                    </div>
                    <button onClick={onClose} className="bg-[#DCC885] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#c5b376] transition-colors text-xs">
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAnalystModal;
