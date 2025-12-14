import React from 'react';

interface KPICardProps {
    label: string;
    value: string;
    subValue?: string;
    isPositive?: boolean;
    chart?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, subValue, isPositive, chart }) => (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5 flex flex-col justify-between h-[86px]">
        <div className="flex justify-between items-start">
            <span className="text-sm text-gray-500">{label}</span>
            {chart && <div className="w-3 h-3 rounded-full border border-[#DCC885]"></div>}
        </div>
        <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">{value}</span>
            {subValue && (
                <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{subValue}</span>
            )}
        </div>
    </div>
);

export default KPICard;
