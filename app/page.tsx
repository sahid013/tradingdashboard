"use client";

import React, { useState } from 'react';

import PerformanceSection from '../components/dashboard/PerformanceSection';
import LiveDashboardSection from '../components/dashboard/LiveDashboardSection';
import TradeHistory from '../components/dashboard/TradeHistory';

import { Stats } from '@/types';

const LiveTradingDashboard = () => {

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

        {/* 1. Account Info & Performance Chart */}
        <PerformanceSection />

        {/* 2. LIVE SECTION */}
        <LiveDashboardSection stats={liveStats} setStats={setLiveStats} />

        {/* 3. Trade History Table */}
        <TradeHistory />


      </main>
    </div>
  );
};

export default LiveTradingDashboard;
