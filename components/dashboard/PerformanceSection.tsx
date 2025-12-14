"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { User } from 'lucide-react';
import KPICard from './KPICard';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

interface PerformanceSectionProps {
    // onOpenAI removed
}

const PerformanceSection: React.FC<PerformanceSectionProps> = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('Daily');

    const dailyData = {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
        datasets: [
            {
                label: 'Balance',
                data: [500, 1200, 900, 2100, 1800, 3200, 2900, 4500, 3800, 5000],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#22c55e',
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'Equity',
                data: [400, 1100, 1300, 1900, 2400, 2800, 3500, 3200, 4100, 4800],
                borderColor: '#DCC885',
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
            }
        ],
    };

    const weeklyData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Balance',
                data: [5000, 8500, 12000, 15500, 18000],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#22c55e',
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'Equity',
                data: [4800, 8200, 11500, 15000, 17500],
                borderColor: '#DCC885',
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
            }
        ],
    };

    const chartData = selectedPeriod === 'Daily' ? dailyData : weeklyData;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index' as const, intersect: false },
        plugins: {
            legend: { position: 'top' as const, align: 'end' as const, labels: { color: '#888', usePointStyle: true } },
            tooltip: {
                backgroundColor: '#111',
                titleColor: '#fff',
                bodyColor: '#ccc',
                borderColor: '#333',
                borderWidth: 1,
                padding: 10
            }
        },
        scales: {
            x: { grid: { color: '#222' }, ticks: { color: '#666' } },
            y: { grid: { color: '#222' }, ticks: { color: '#666' } },
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    {/* Updated Icon Style */}
                    <div className="w-12 h-12 rounded-lg bg-white/10 text-white flex items-center justify-center border border-white/10">
                        <User size={24} />
                    </div>
                    <div>
                        {/* Updated Text Color and Details */}
                        <h2 className="text-2xl font-bold text-white">Name</h2>
                        <p className="text-sm text-gray-400">Account: 84930229 • Phase 2</p>
                    </div>
                </div>

                {/* AI BUTTON */}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Chart - Added 'relative' and overflow hidden to fix rendering */}
                <div className="lg:col-span-3 bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-[#DCC885]">Cumulative Daily Profit</h3>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-[#111] border border-gray-800 text-xs text-gray-400 rounded px-2 py-1 outline-none"
                        >
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                        </select>
                    </div>
                    {/* Chart Container */}
                    <div className="relative w-full h-[300px]">
                        <Line data={chartData} options={options} />
                    </div>
                </div>

                {/* Side Stats */}
                <div className="space-y-4">
                    <KPICard label="Profit" value="$10,016.81" subValue="+2.4%" isPositive={true} />
                    <KPICard label="Win Rate" value="77.5%" chart={true} />
                    <KPICard label="Profit Factor" value="3.81" chart={true} />
                    <KPICard label="Max Drawdown" value="1.38%" isPositive={false} />
                </div>
            </div>
        </div>
    );
};

export default PerformanceSection;
