import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const CTASection = () => (
    <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0a] py-32 text-center group perspective-container">
        {/* 3D Floor Grid Effect */}
        <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
                backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'perspective(500px) rotateX(60deg) scale(2) translateY(-100px)',
                transformOrigin: 'top center',
            }}
        ></div>
        {/* Fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 mt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCC885]/30 bg-[#DCC885]/10 text-[#DCC885] text-xs font-bold mb-6 uppercase tracking-widest">
                <Sparkles size={12} /> Now with AI Analytics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Your Future In Trading Starts Today</h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                Join thousands of traders who are transforming their lives with Calvio Funding.
                Leverage our new <b>AI Trading Assistant</b> to analyze your performance and scale your potential.
            </p>
            <button className="bg-[#DCC885] text-black font-bold px-10 py-4 rounded-full hover:bg-[#c5b376] transition-all transform hover:scale-105 flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(220,200,133,0.3)]">
                Get Funded Now <ArrowRight size={20} />
            </button>
        </div>
    </div>
);

export default CTASection;
