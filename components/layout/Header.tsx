import React from 'react';
import { ArrowRight, Menu } from 'lucide-react';

const Header = () => (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-900">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#DCC885] flex items-center justify-center text-black font-bold text-xl">
                    C
                </div>
                <span className="text-xl font-bold text-white tracking-wide">CALVIO <span className="text-[#DCC885]">FUNDING</span></span>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <a href="#" className="text-white">Dashboard</a>
                <a href="#" className="hover:text-[#DCC885] transition-colors">Trading</a>
                <a href="#" className="hover:text-[#DCC885] transition-colors">History</a>
                <a href="#" className="hover:text-[#DCC885] transition-colors">Leaderboard</a>
            </nav>

            {/* Action */}
            <button className="hidden md:flex bg-[#DCC885] text-black px-5 py-2 rounded font-bold text-sm hover:bg-[#c5b376] transition-colors items-center gap-2">
                New Account <ArrowRight size={16} />
            </button>

            {/* Mobile Menu */}
            <button className="md:hidden text-white"><Menu /></button>
        </div>
    </header>
);

export default Header;
