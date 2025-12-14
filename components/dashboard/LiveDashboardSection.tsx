"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { WifiOff, Wallet, DollarSign, PieChart, TrendingUp, Hash } from 'lucide-react';

// Register ChartJS components needed for this section
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { Stats } from '@/types';

interface LiveDashboardSectionProps {
    stats: Stats;
    setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

const LiveDashboardSection: React.FC<LiveDashboardSectionProps> = ({ stats, setStats }) => {
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const [chartDataState, setChartDataState] = useState([12, 19, 25, 30, 28, 22, 15]);

    // --- SIMULATION ENGINE ---
    useEffect(() => {
        const connectTimer = setTimeout(() => {
            setConnectionStatus('Live');
        }, 1500);

        const interval = setInterval(() => {
            setStats((prev) => {
                const volatility = (Math.random() - 0.5);
                const newEquity = prev.equity + (volatility * 150);
                const newBalance = Math.random() > 0.7 ? prev.balance + (volatility * 50) : prev.balance;
                const newWinRate = Math.min(100, Math.max(0, prev.winRate + (volatility * 0.5)));
                let newTrades = prev.numTrades;
                let newLots = prev.lots;

                if (Math.random() > 0.9) {
                    newTrades += 1;
                    newLots += 0.1;
                }

                return {
                    equity: newEquity,
                    balance: newBalance,
                    winRate: parseFloat(newWinRate.toFixed(1)),
                    avgProfit: prev.avgProfit + (volatility * 2),
                    avgLoss: prev.avgLoss + (volatility * 1),
                    numTrades: newTrades,
                    lots: newLots,
                };
            });

            if (Math.random() > 0.8) {
                setChartDataState(prev => {
                    const newData = [...prev];
                    newData[6] = Math.max(5, newData[6] + (Math.random() - 0.5) * 5);
                    return newData;
                });
            }
        }, 1000);

        return () => {
            clearTimeout(connectTimer);
            clearInterval(interval);
        };
    }, [setStats]);

    // --- CHART CONFIG ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { grid: { color: '#222' }, ticks: { color: '#666' } },
            x: { grid: { display: false }, ticks: { color: '#666' } },
        },
        plugins: {
            legend: { position: 'top' as const, align: 'end' as const, labels: { color: '#888', usePointStyle: true, boxWidth: 6 } },
        },
        animation: { duration: 500 },
    };

    const chartConfig = {
        labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        datasets: [
            {
                label: 'Trades',
                data: chartDataState,
                backgroundColor: '#22c55e',
                barThickness: 6,
                borderRadius: 4,
            },
            {
                label: 'Lots',
                data: chartDataState.map(d => d * 0.4),
                backgroundColor: '#DCC885',
                barThickness: 6,
                borderRadius: 4,
            },
        ],
    };

    const fmt = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* --- LEFT SECTION: Trade Statistics --- */}
            <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl border border-gray-800 relative overflow-hidden">

                {/* Status Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                    {connectionStatus === 'Live' ? (
                        <>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        </>
                    ) : (
                        <WifiOff size={14} className="text-red-500" />
                    )}
                </div>

                <h3 className="text-xl font-bold text-[#DCC885] mb-6">Trade Statistics</h3>

                <div className="space-y-5">
                    <StatRow icon={<Wallet size={16} />} label="Equity" value={fmt(stats.equity)} barColor="bg-[#DCC885]" width="90%" />
                    <StatRow icon={<DollarSign size={16} />} label="Balance" value={fmt(stats.balance)} barColor="bg-green-500" width="88%" />
                    <StatRow icon={<PieChart size={16} />} label="Win Rate" value={`${stats.winRate}%`} barColor="bg-blue-500" width={`${stats.winRate}%`} />
                    <StatRow icon={<TrendingUp size={16} />} label="Avg Profit" value={fmt(stats.avgProfit)} barColor="bg-green-400" width="60%" />
                    <StatRow icon={<TrendingUp size={16} className="rotate-180 text-red-500" />} label="Avg Loss" value={fmt(stats.avgLoss)} barColor="bg-red-500" width="40%" />
                    <StatRow icon={<Hash size={16} />} label="No. Trades" value={stats.numTrades.toString()} barColor="bg-purple-500" width="75%" />
                </div>
            </div>

            {/* --- RIGHT SECTION: Activity Chart --- */}
            <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl border border-gray-800 flex flex-col">
                <h3 className="text-xl font-bold text-[#DCC885] mb-6">Activity</h3>
                <div className="flex-1 min-h-[250px] w-full">
                    <Bar options={chartOptions} data={chartConfig} />
                </div>
            </div>
        </div>
    );
};

interface StatRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    barColor: string;
    width: string;
}

const StatRow: React.FC<StatRowProps> = ({ icon, label, value, barColor, width }) => (
    <div className="group">
        <div className="flex justify-between items-center mb-2 text-sm">
            <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                <span className="p-1.5 bg-[#111] border border-gray-800 rounded text-[#DCC885]">{icon}</span>
                {label}
            </div>
            <span className="font-mono text-white text-base tracking-wide transition-all duration-300">{value}</span>
        </div>
        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
            <div className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.3)]`} style={{ width: width }}></div>
        </div>
    </div>
);

export default LiveDashboardSection;
