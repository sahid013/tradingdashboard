import React from 'react';

const TradeHistory = () => {
    const trades = [
        { id: 1, pair: 'XAUUSD', type: 'BUY', lots: 0.50, open: 2150.45, close: 2155.00, profit: 455.00, pips: 45.5, date: '12/12/2024, 10:00 AM' },
        { id: 2, pair: 'EURUSD', type: 'BUY', lots: 1.00, open: 1.0920, close: 1.0940, profit: 200.00, pips: 20.0, date: '12/12/2024, 11:30 AM' },
        { id: 3, pair: 'GBPJPY', type: 'BUY', lots: 0.40, open: 188.50, close: 189.00, profit: 180.00, pips: 50.0, date: '12/12/2024, 01:15 PM' },
        { id: 4, pair: 'US30', type: 'BUY', lots: 0.10, open: 39000, close: 39150, profit: 150.00, pips: 150.0, date: '12/12/2024, 02:45 PM' },
        { id: 5, pair: 'NAS100', type: 'BUY', lots: 0.20, open: 17800, close: 17850, profit: 100.00, pips: 50.0, date: '12/12/2024, 03:20 PM' },
        { id: 6, pair: 'XAUUSD', type: 'BUY', lots: 0.50, open: 2155.00, close: 2145.00, profit: -500.00, pips: -100.0, date: '12/12/2024, 04:10 PM' },
    ];

    return (
        <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-bold text-[#DCC885] mb-2">Trade History</h3>
            <p className="text-xs text-gray-500 mb-6">View all closed trades</p>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 border-b border-gray-800">
                            <th className="py-4 font-medium">Symbol</th>
                            <th className="py-4 font-medium">Type</th>
                            <th className="py-4 font-medium">Lots</th>
                            <th className="py-4 font-medium">Open Price</th>
                            <th className="py-4 font-medium">Close Price</th>
                            <th className="py-4 font-medium">Profit $</th>
                            <th className="py-4 font-medium">Pips</th>
                            <th className="py-4 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {trades.map((trade) => (
                            <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-[#111] transition-colors group">
                                <td className="py-4 text-white font-medium">{trade.pair}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${trade.type === 'BUY' ? 'bg-[#DCC885] text-black' : 'bg-red-500 text-white'}`}>
                                        {trade.type}
                                    </span>
                                </td>
                                <td className="py-4 text-gray-400">{trade.lots.toFixed(2)}</td>
                                <td className="py-4 text-gray-400">{trade.open}</td>
                                <td className="py-4 text-gray-400">{trade.close}</td>
                                <td className={`py-4 font-bold ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                                </td>
                                <td className="py-4 text-gray-400">{trade.pips}</td>
                                <td className="py-4 text-gray-500 text-xs">{trade.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6 text-xs text-gray-500">
                <span>Showing 1-10 of 40</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-[#111] hover:bg-[#222]">Previous</button>
                    <button className="px-3 py-1 rounded bg-[#DCC885] text-black font-bold">1</button>
                    <button className="px-3 py-1 rounded bg-[#111] hover:bg-[#222]">2</button>
                    <button className="px-3 py-1 rounded bg-[#111] hover:bg-[#222]">3</button>
                    <button className="px-3 py-1 rounded bg-[#111] hover:bg-[#222]">Next</button>
                </div>
            </div>
        </div>
    );
};

export default TradeHistory;
