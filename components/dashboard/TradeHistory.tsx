import React from 'react';

const TradeHistory = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;

    const trades = [
        { id: 1, pair: 'XAUUSD', type: 'BUY', lots: 0.50, open: 2150.45, close: 2155.00, profit: 455.00, pips: 45.5, date: '12/12/2024, 10:00 AM' },
        { id: 2, pair: 'EURUSD', type: 'BUY', lots: 1.00, open: 1.0920, close: 1.0940, profit: 200.00, pips: 20.0, date: '12/12/2024, 11:30 AM' },
        { id: 3, pair: 'GBPJPY', type: 'BUY', lots: 0.40, open: 188.50, close: 189.00, profit: 180.00, pips: 50.0, date: '12/12/2024, 01:15 PM' },
        { id: 4, pair: 'US30', type: 'BUY', lots: 0.10, open: 39000, close: 39150, profit: 150.00, pips: 150.0, date: '12/12/2024, 02:45 PM' },
        { id: 5, pair: 'NAS100', type: 'BUY', lots: 0.20, open: 17800, close: 17850, profit: 100.00, pips: 50.0, date: '12/12/2024, 03:20 PM' },
        { id: 6, pair: 'XAUUSD', type: 'BUY', lots: 0.50, open: 2155.00, close: 2145.00, profit: -500.00, pips: -100.0, date: '12/12/2024, 04:10 PM' },
        { id: 7, pair: 'EURJPY', type: 'SELL', lots: 0.30, open: 162.50, close: 162.00, profit: 150.00, pips: 50.0, date: '12/12/2024, 05:00 PM' },
        { id: 8, pair: 'BTCUSD', type: 'BUY', lots: 0.05, open: 72000, close: 72500, profit: 250.00, pips: 500.0, date: '12/12/2024, 06:30 PM' },
        { id: 9, pair: 'USDCAD', type: 'SELL', lots: 1.50, open: 1.3500, close: 1.3480, profit: 300.00, pips: 20.0, date: '12/13/2024, 09:15 AM' },
        { id: 10, pair: 'AUDUSD', type: 'BUY', lots: 0.80, open: 0.6600, close: 0.6620, profit: 160.00, pips: 20.0, date: '12/13/2024, 10:45 AM' },
        { id: 11, pair: 'XAUUSD', type: 'SELL', lots: 0.20, open: 2160.00, close: 2150.00, profit: 200.00, pips: 100.0, date: '12/13/2024, 01:20 PM' },
        { id: 12, pair: 'GBPUSD', type: 'BUY', lots: 1.00, open: 1.2700, close: 1.2730, profit: 300.00, pips: 30.0, date: '12/13/2024, 03:00 PM' },
        { id: 13, pair: 'NZDUSD', type: 'SELL', lots: 0.50, open: 0.6100, close: 0.6080, profit: 100.00, pips: 20.0, date: '12/14/2024, 08:30 AM' },
        { id: 14, pair: 'USOIL', type: 'BUY', lots: 0.10, open: 78.50, close: 79.50, profit: 100.00, pips: 100.0, date: '12/14/2024, 10:15 AM' },
        { id: 15, pair: 'XAGUSD', type: 'BUY', lots: 0.50, open: 24.50, close: 24.80, profit: 150.00, pips: 30.0, date: '12/14/2024, 11:45 AM' },
    ];

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = trades.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(trades.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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
                        {currentItems.map((trade) => (
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
                <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, trades.length)} of {trades.length}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded transition-colors ${currentPage === 1 ? 'bg-[#111] text-gray-600 cursor-not-allowed' : 'bg-[#111] hover:bg-[#222] text-white'}`}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`px-3 py-1 rounded font-bold transition-colors ${currentPage === number
                                    ? 'bg-[#DCC885] text-black'
                                    : 'bg-[#111] hover:bg-[#222] text-white'
                                }`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded transition-colors ${currentPage === totalPages ? 'bg-[#111] text-gray-600 cursor-not-allowed' : 'bg-[#111] hover:bg-[#222] text-white'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradeHistory;
