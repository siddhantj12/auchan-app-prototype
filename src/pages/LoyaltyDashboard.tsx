import { useState } from 'react';
import { Award, Calendar, Ticket, QrCode, X, CheckCircle2 } from 'lucide-react';
import { triggerToast } from '../components/Toast';

type Reward = { title: string, pts: string, img: string, color: string };

export const LoyaltyDashboard = () => {
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [points, setPoints] = useState(2450);

    const handleRedeem = (reward: Reward) => {
        setSelectedReward(reward);
    };

    const confirmRedemption = () => {
        if (selectedReward) {
            const ptsCost = parseInt(selectedReward.pts.replace(',', ''));
            setPoints(prev => Math.max(0, prev - ptsCost));
            triggerToast(`${selectedReward.title} Successfully Redeemed`);
            setSelectedReward(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 animate-in fade-in duration-300 relative">
            {/* Header */}
            <div className="text-white px-6 pt-12 pb-24 rounded-b-[40px] relative overflow-hidden" style={{ backgroundColor: '#E21836' }}>
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

                <div className="flex justify-between items-center relative z-10 mb-8">
                    <h1 className="text-xl font-bold">My Loyalty</h1>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Award size={20} />
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <span className="text-white/80 font-medium text-sm mb-1 uppercase tracking-widest">Available Points</span>
                    <div className={`text-6xl font-black tracking-tight mb-2 transition-all duration-500`}>
                        {points.toLocaleString()}
                    </div>

                    <div className="w-full max-w-xs mt-6">
                        <div className="flex justify-between text-xs font-bold text-white/90 mb-2">
                            <span>Gold Tier</span>
                            <span>Platinum (3,000 pts)</span>
                        </div>
                        <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${(points / 3000) * 100}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reward Marketplace */}
            <div className="px-6 -mt-12 relative z-20 mb-8">
                <div className="flex justify-between items-end mb-4 px-1">
                    <h2 className="text-xl font-bold text-gray-900">Reward Marketplace</h2>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-6 px-6 snap-x hide-scrollbar">
                    {[
                        { title: 'Free Cooking Workshop', pts: '800', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80', color: 'bg-orange-500' },
                        { title: 'Indoor Skating Pass', pts: '1,200', img: 'https://images.unsplash.com/photo-1766524871451-15160b84d0e4?w=500&q=80', color: 'bg-blue-500' },
                        { title: 'VIP Event Access', pts: '2,000', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80', color: 'bg-purple-500' },
                    ].map((reward, i) => {
                        const ptsCost = parseInt(reward.pts.replace(',', ''));
                        const canAfford = points >= ptsCost;
                        
                        return (
                        <div key={i} className={`min-w-[200px] bg-white rounded-3xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)] snap-center ${canAfford ? '' : 'opacity-70 grayscale-[30%]'}`}>
                            <div className="relative h-32 rounded-2xl overflow-hidden mb-3">
                                <img src={reward.img} className="w-full h-full object-cover" alt={reward.title} />
                                <div className={`absolute top-2 right-2 ${reward.color} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg`}>
                                    {reward.pts} pts
                                </div>
                            </div>
                            <h3 className="font-bold text-sm leading-tight mb-3 pl-1">{reward.title}</h3>
                            <button 
                                onClick={() => handleRedeem(reward)}
                                disabled={!canAfford}
                                className={`w-full font-bold text-sm py-2 rounded-xl transition-colors ${canAfford ? 'bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                {canAfford ? 'Redeem' : 'Not Enough Pts'}
                            </button>
                        </div>
                    )})}
                </div>
            </div>

            {/* Points History */}
            <div className="px-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Recent Experiences</h2>
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-auchan-red">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-sm">Italian Cooking Class</div>
                                <div className="text-xs text-gray-500">Oct 14, 2026</div>
                            </div>
                        </div>
                        <div className="font-bold text-green-600">+100 pts</div>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <Ticket size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-sm">Skating Rink Entry</div>
                                <div className="text-xs text-gray-500">Oct 02, 2026</div>
                            </div>
                        </div>
                        <div className="font-bold text-green-600">+50 pts</div>
                    </div>
                </div>
            </div>

            {/* Simulated Redemption Modal */}
            {selectedReward && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedReward(null)} />
                    <div className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                        <div className="relative h-48 w-full">
                            <img src={selectedReward.img} className="w-full h-full object-cover" alt={selectedReward.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <button 
                                onClick={() => setSelectedReward(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div>
                                    <h2 className="text-2xl font-black text-white leading-tight mb-1">{selectedReward.title}</h2>
                                    <div className="flex items-center text-white/80 text-sm font-medium">
                                        -{selectedReward.pts} Points
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8 flex flex-col items-center justify-center bg-slate-50">
                            <h3 className="font-bold text-slate-900 mb-2 text-center">Show this code at the store</h3>
                            <p className="text-sm text-slate-500 text-center mb-6">Scan at the checkout or experience zone counter to redeem your reward.</p>
                            
                            <div className="bg-slate-900 px-6 pt-6 pb-4 rounded-3xl shadow-2xl shadow-black/20 mb-6 relative group overflow-hidden border-2 border-slate-800">
                                <div className="bg-white p-4 rounded-2xl">
                                    <QrCode size={180} className="text-slate-900 transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="font-mono text-white/70 text-sm tracking-[0.2em]">SCAN TO REDEEM</span>
                                </div>
                                {/* Scanning Laser Simulation border-b shadow */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-auchan-red shadow-[0_0_15px_3px_rgba(226,24,54,0.9)] animate-[scan_2s_ease-in-out_infinite]" />
                            </div>

                            <button
                                onClick={confirmRedemption}
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-black/10"
                            >
                                <CheckCircle2 size={20} /> Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes scan {
                    0%, 100% { top: 10%; opacity: 0; }
                    10% { opacity: 1; }
                    50% { top: 90%; opacity: 1; }
                    90% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};
