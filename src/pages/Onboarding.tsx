
import { ArrowLeft, ShoppingCart, Star, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { triggerToast } from '../components/Toast';

export const Onboarding = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center bg-white p-4 pb-2 justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-slate-900 flex w-10 h-10 items-center justify-center hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
                    Family Mode
                </h2>
            </div>
            
            {/* Hero Image Section */}
            <div className="px-0">
                <div 
                    className="w-full h-80 bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxbhRzgDuRNlj18QqHLVEV0cW55Fr7SAzzD5JyNtz7Ixk89NE-bRoGq_ykO9W-ykunZpbXVNZ2g1--eynZhzcGEPNbQS69AjBplOnAYFkenRDUcao9H7Jv8aqpowFeh6xNUS-phLDcNqbPRtYnl_XbNf4ePDLvV5rDKyLzLc4Ho3uR3mv-R9UGm6r-bK4BEVRbq_e5_JEaFirNq5PkYEXqq19xdG7UlrlQVMKZglgbgB3wh4YlLrVn94-bRnkORICHvnS2AqU1-wU")' }}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 px-6 pt-8 pb-10">
                <img src="/auchanlogo.png" alt="Auchan Logo" className="h-10 mx-auto mb-6 object-contain" />
                <h1 className="text-auchan-red tracking-tight text-3xl font-extrabold leading-tight text-center pb-8">
                    Unlock Family Mode
                </h1>
                
                {/* Features List */}
                <div className="space-y-6">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                        <div className="text-auchan-red flex items-center justify-center rounded-xl bg-red-50 shrink-0 w-12 h-12">
                            <ShoppingCart size={24} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-slate-900 text-base font-bold leading-tight">1. Group grocery shopping lists</p>
                            <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed">Collaborate on lists with your whole family in real-time</p>
                        </div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                        <div className="text-auchan-red flex items-center justify-center rounded-xl bg-red-50 shrink-0 w-12 h-12">
                            <Star size={24} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-slate-900 text-base font-bold leading-tight">2. Personalized kids activities</p>
                            <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed">Discover fun and educational in-store experiences</p>
                        </div>
                    </div>
                    {/* Item 3 */}
                    <div className="flex items-start gap-4">
                        <div className="text-auchan-red flex items-center justify-center rounded-xl bg-red-50 shrink-0 w-12 h-12">
                            <Gift size={24} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-slate-900 text-base font-bold leading-tight">3. Shared loyalty reward points</p>
                            <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed">Earn and redeem benefits faster as a collective group</p>
                        </div>
                    </div>
                </div>
                
                {/* Spacer */}
                <div className="flex-1 min-h-[40px]"></div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mt-auto">
                    <button 
                        onClick={() => { triggerToast('Family Mode enabled'); navigate('/lifestyle'); }}
                        className="w-full bg-auchan-red hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
                    >
                        Unlock Family Mode
                    </button>
                    <button 
                        onClick={() => navigate('/family')}
                        className="w-full text-slate-600 font-semibold py-2 hover:text-slate-800 transition-colors"
                    >
                        Set up Family Profile first
                    </button>
                    <button 
                        onClick={() => navigate('/lifestyle')}
                        className="w-full text-slate-400 font-medium py-2 hover:text-slate-600 transition-colors text-sm"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
};
