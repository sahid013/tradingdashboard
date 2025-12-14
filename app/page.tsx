"use client";

import React, { useState } from 'react';

import PerformanceSection from '../components/dashboard/PerformanceSection';
import LiveDashboardSection from '../components/dashboard/LiveDashboardSection';
import TradeHistory from '../components/dashboard/TradeHistory';

import AIAnalystModal from '../components/dashboard/AIAnalystModal';
import { Stats } from '@/types';

const LiveTradingDashboard = () => {
  // AI State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Shared Data State
  const [liveStats, setLiveStats] = useState<Stats>({
    equity: 102034.50,
    balance: 101090.25,
    winRate: 68.5,
    avgProfit: 450.00,
    avgLoss: 210.00,
    numTrades: 145,
    lots: 23.5,
  });

  return (
    <div className="min-h-screen bg-black font-sans text-gray-300 selection:bg-[#DCC885] selection:text-black relative">


      <main className="container mx-auto px-4 py-8 space-y-12 max-w-7xl">
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 rounded-full border border-gray-800 bg-[#111] text-xs text-[#666] mb-2 uppercase tracking-widest">
            Verified User
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#DCC885]">Trader Performance Summary</h1>
        </div>

        {/* 1. Account Info & Performance Chart */}
        <PerformanceSection onOpenAI={() => setIsAIModalOpen(true)} />

        {/* 2. LIVE SECTION */}
        <LiveDashboardSection stats={liveStats} setStats={setLiveStats} />

        {/* 3. Trade History Table */}
        <TradeHistory />


      </main>



      {/* AI MODAL */}
      {isAIModalOpen && (
        <AIAnalystModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          stats={liveStats}
        />
      )}
    </div>
  );
};

export default LiveTradingDashboard;
