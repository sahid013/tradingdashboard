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
import { WifiOff, Wallet, DollarSign, PieChart, TrendingUp, TrendingDown, Hash, BarChart2, Award, AlertCircle } from 'lucide-react';

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

        return () => {
            clearTimeout(connectTimer);
        };
    }, []);

    // --- CHART CONFIG ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: { display: false }, // No horizontal grid lines
                ticks: {
                    color: '#666',
                    callback: (value: any) => '$' + value / 1000 + 'k'
                },
                border: { display: false }
            },
            x: {
                grid: { color: '#333', borderDash: [4, 4], drawBorder: false }, // Vertical dashed lines
                ticks: { color: '#666' },
                border: { display: false }
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: { color: '#888', usePointStyle: true, boxWidth: 8, padding: 20 }
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: '#111',
                titleColor: '#fff',
                bodyColor: '#ccc',
                borderColor: '#333',
                borderWidth: 1,
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart' as const,
        },
    };

    const chartConfig = {
        labels: ['29', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        datasets: [
            {
                label: 'Trades',
                data: [1500, 1800, 2100, 2700, 2700, 2200, 1500], // Scaled up to match $k view
                backgroundColor: '#22c55e',
                barThickness: 10,
                borderRadius: 4,
                grouped: false, // Allows overlap
                order: 2, // Render first (behind)
            },
            {
                label: 'Lots',
                data: [500, 700, 800, 1100, 950, 800, 550], // Scaled up
                backgroundColor: '#fbbf24', // Yellowish color from image
                barThickness: 10,
                borderRadius: 4,
                grouped: false, // Allows overlap
                order: 1, // Render second (on top) - Wait, in Chart.js higher order is 'z-index' usually? No, array order usually dictates. Let's use order property to be safe. ChartJS default: lower 'order' is drawn ON TOP? No, default is 0. Reversing array might be safer details.
                // Actually, in Chart.js, datasets are drawn in order of the array. Dataset[0] is background, Dataset[1] is foreground.
                // So I will just utilize the array order and remove 'order' property to avoid confusion, or set explicit z-index if needed.
                // Let's stick to array position: Green first, Yellow second.
            },
        ],
    };

    const fmt = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* --- LEFT SECTION: Trade Statistics --- */}
            <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl border border-gray-800 relative overflow-hidden flex flex-col">

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

                <h3 className="text-xl font-bold text-[#DCC885] mb-6" suppressHydrationWarning>Trade Statistics</h3>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                    <div className="space-y-1">
                        <StatRow icon={<TrendingUp size={18} />} label="Equity" value={fmt(stats.equity)} progressValue={60} barColor="bg-[#DCC885]" />
                        <StatRow icon={<TrendingUp size={18} />} label="Balance" value={fmt(stats.balance)} progressValue={100} barColor="bg-green-500" />
                        <StatRow icon={<TrendingUp size={18} />} label="Win rate" value={`${stats.winRate}%`} progressValue={stats.winRate} barColor="bg-green-500" />
                        <StatRow icon={<TrendingUp size={18} className="text-green-500" />} label="Avg profit" value={fmt(stats.avgProfit)} progressValue={85} barColor="bg-green-500" />
                        <StatRow icon={<TrendingDown size={18} className="text-red-500" />} label="Avg loss" value={fmt(stats.avgLoss)} progressValue={40} barColor="bg-green-500" />
                        <StatRow icon={<BarChart2 size={18} />} label="Number of trades" value={stats.numTrades.toString()} progressValue={90} barColor="bg-green-500" />
                        <StatRow icon={<BarChart2 size={18} />} label="Lots" value={stats.lots.toString()} progressValue={70} barColor="bg-green-500" />
                        <StatRow icon={<TrendingUp size={18} />} label="Sharpe Ratio" value="2.14" progressValue={80} barColor="bg-green-500" />
                        <StatRow icon={<Award size={18} />} label="Average RRR" value="1:2.5" progressValue={100} barColor="bg-green-500" />
                        <StatRow icon={<TrendingUp size={18} />} label="Expectancy" value="$88.40" progressValue={95} barColor="bg-green-500" />
                        <StatRow icon={<Award size={18} />} label="Profit factor" value="3.81" progressValue={85} barColor="bg-green-500" />
                        <StatRow icon={<Award size={18} className="text-green-500" />} label="Best Trade" value="$450.00" progressValue={90} barColor="bg-green-500" />
                        <StatRow icon={<AlertCircle size={18} className="text-red-500" />} label="Worst Trade" value="-$120.00" progressValue={45} barColor="bg-green-500" />
                    </div>
                </div>
            </div>

            {/* --- RIGHT SECTION: Activity Chart --- */}
            <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl border border-gray-800 flex flex-col">
                <h3 className="text-xl font-bold text-[#DCC885] mb-6" suppressHydrationWarning>Activity</h3> {/* Increased size */}
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
    progressValue: number;
    barColor: string;
}

import { Info } from 'lucide-react';

const StatRow: React.FC<StatRowProps> = ({ icon, label, value, progressValue, barColor }) => (
    <div className="flex items-center gap-4 py-2">
        {/* Square Icon Container */}
        <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-gray-400 shrink-0 border border-gray-800">
            {icon}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{label}</span>
                    <Info size={12} className="text-gray-500 cursor-pointer hover:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-white">{value}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
                <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
                />
            </div>
        </div>
    </div>
);

export default LiveDashboardSection;
