import React from 'react';
import { Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => (
    <footer className="border-t border-gray-900 bg-black pt-20 pb-10">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
                {/* Brand */}
                <div className="max-w-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-[#DCC885] flex items-center justify-center text-black font-bold text-xl">C</div>
                        <span className="text-xl font-bold text-white tracking-wide">CALVIO <span className="text-[#DCC885]">FUNDING</span></span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Calvio Funding provides the best funding models for traders worldwide. Financial advice, financial representative.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-20 text-sm text-gray-400">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Platform</h4>
                        <a href="#" className="block hover:text-[#DCC885] transition-colors">Models</a>
                        <a href="#" className="block hover:text-[#DCC885] transition-colors">Pricing</a>
                        <a href="#" className="block hover:text-[#DCC885] transition-colors">Success Stories</a>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Company</h4>
                        <a href="#" className="block hover:text-[#DCC885] transition-colors">About Us</a>
                        <a href="#" className="block hover:text-[#DCC885] transition-colors">Careers</a>
                        <a href="#" className="block hover:text-[#DCC885] transition-colors">Contact</a>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Exact Layout Match */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 gap-6">

                {/* Legal Links (Left) */}
                <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[11px] text-gray-500 font-medium uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                </div>

                {/* Social Icons (Right) - Simplified Clean Look */}
                <div className="flex gap-6">
                    <SocialIcon icon={<Twitter size={18} />} />
                    <SocialIcon icon={<Instagram size={18} />} />
                    <SocialIcon icon={<Youtube size={18} />} />
                    <SocialIcon icon={<Facebook size={18} />} />
                </div>
            </div>

            <p className="text-[10px] text-gray-700 mt-8 text-center md:text-left">
                © 2025 Calvio Funding. All rights reserved. <br />
                Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros Islet, Saint Lucia.
            </p>
        </div>
    </footer>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <a href="#" className="text-gray-500 hover:text-[#DCC885] transition-colors duration-300 transform hover:-translate-y-1">
        {icon}
    </a>
);

export default Footer;
