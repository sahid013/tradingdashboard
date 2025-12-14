import React from 'react';
import { Info } from 'lucide-react';

interface KPICardProps {
    label: string;
    value: string;
    subValue?: string; // Used for secondary small text like "31|9"
    isPositive?: boolean; // Controls color of value (e.g. Max Drawdown red)

    // Header
    infoIcon?: boolean;
    headerIcon?: React.ReactNode;
    showToggle?: boolean; // For Profit card $/S toggle
    onToggle?: (view: 'currency' | 'percent') => void;
    toggleState?: 'currency' | 'percent';
    tooltipText?: string;

    // Visuals
    progressVariant?: 'circle' | 'horizontal' | 'none';
    progressValue?: number; // 0-100
    barColor?: string; // TailWind class for bar/ring color
}

const KPICard: React.FC<KPICardProps> = ({
    label,
    value,
    subValue,
    isPositive = true,
    infoIcon = false,
    headerIcon,
    showToggle = false,
    onToggle,
    toggleState = 'currency',
    tooltipText,
    progressVariant = 'none',
    progressValue = 0,
    barColor = 'text-[#DCC885]' // Default gold
}) => {
    // Helper to render circle
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - ((progressValue || 0) / 100) * circumference;

    return (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5 flex flex-col justify-between h-[120px] relative overflow-hidden group">

            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm font-medium">{label}</span>
                    {infoIcon && (
                        <div className="relative group/tooltip">
                            <Info size={12} className="text-gray-600 cursor-pointer hover:text-gray-400" />
                            {tooltipText && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[150px] px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 border border-gray-700 shadow-xl whitespace-nowrap">
                                    {tooltipText}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Side Controls/Icons */}
                <div className="flex items-center gap-2">
                    {showToggle && (
                        <div className="flex bg-[#111] rounded p-0.5 border border-gray-800">
                            <button
                                onClick={() => onToggle?.('currency')}
                                className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm transition-colors ${toggleState === 'currency' ? 'bg-[#DCC885] text-black' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                $
                            </button>
                            <button
                                onClick={() => onToggle?.('percent')}
                                className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm transition-colors ${toggleState === 'percent' ? 'bg-[#DCC885] text-black' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                %
                            </button>
                        </div>
                    )}
                    {headerIcon && (
                        <div className="text-[#DCC885] opacity-80">{headerIcon}</div>
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex justify-between items-end flex-1">
                <div className="flex items-baseline gap-1.5 mb-1">
                    <span className={`text-2xl font-bold tracking-tight ${isPositive ? 'text-[#DCC885]' : 'text-red-500'}`}>
                        {value}
                    </span>
                    {subValue && (
                        <span className="text-xs text-gray-500 font-mono">{subValue}</span>
                    )}
                </div>

                {/* Circular Progress (Right Side) */}
                {progressVariant === 'circle' && (
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Background Ring */}
                        <svg className="transform -rotate-90 w-full h-full">
                            <circle
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-gray-900"
                            />
                            {/* Progress Ring */}
                            <circle
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className={barColor} // Uses text-color for stroke
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                )}
            </div>

            {/* Horizontal Progress (Bottom) */}
            {progressVariant === 'horizontal' && (
                <div className="w-full h-1 bg-gray-900 rounded-full mt-3 overflow-hidden">
                    <div
                        className={`h-full rounded-full ${barColor.replace('text-', 'bg-')}`}
                        style={{ width: `${progressValue}%` }}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default KPICard;
