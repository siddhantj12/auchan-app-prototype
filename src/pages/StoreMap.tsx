import { useState } from 'react';
import { ArrowLeft, Bell, Search, MapPin, Plus, Minus, LocateFixed, Utensils, Wine, Activity, Mic, ChevronDown, X, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { triggerToast } from '../components/Toast';
import { useApp } from '../context/AppContext';

const locations = {
    cooking: {
        id: 'cooking',
        title: 'Cooking Studio',
        icon: Utensils,
        colorClass: 'text-auchan-red',
        bgClass: 'bg-red-50',
        distance: '2 mins walk (140m)',
        events: [
            { time: '2 PM', title: 'Artisanal Pasta Class', subtitle: 'Led by Chef Antoine • 45 mins', tag: 'Join', active: true, route: '/booking/pasta' },
            { time: '5 PM', title: 'Organic Wine Tasting', subtitle: 'Sommelier Selection • 30 mins', tag: '', active: false, route: '/booking/wine-tasting' }
        ]
    },
    wine: {
        id: 'wine',
        title: 'Wine Cellar',
        icon: Wine,
        colorClass: 'text-purple-600',
        bgClass: 'bg-purple-50',
        distance: '1 min walk (80m)',
        events: [
            { time: '4 PM', title: 'Cheese & Wine Pairing', subtitle: 'Local selections • 45 mins', tag: 'Full', active: false, route: '/booking/wine-tasting' }
        ]
    },
    restrooms: {
        id: 'restrooms',
        title: 'Restrooms',
        icon: MapPin,
        colorClass: 'text-slate-500',
        bgClass: 'bg-slate-100',
        distance: '0.5 min walk (30m)',
        events: []
    },
    bakery: {
        id: 'bakery',
        title: 'Bakery',
        icon: Utensils,
        colorClass: 'text-orange-500',
        bgClass: 'bg-orange-50',
        distance: '1 min walk (90m)',
        events: [
            { time: 'All Day', title: 'Fresh Baked Bread', subtitle: 'Hot from the oven every hour', tag: 'Fresh', active: false, route: '' }
        ]
    },
    skating: {
        id: 'skating',
        title: 'Indoor Roller Skating Rink',
        icon: Activity,
        colorClass: 'text-indigo-500',
        bgClass: 'bg-indigo-50',
        distance: '3 mins walk (200m)',
        events: [
            { time: '10 AM', title: 'Indoor Roller Skating Rink', subtitle: 'Perfect for a fun weekend activity', tag: '3,500 HUF', active: true, route: '/booking/skating' }
        ]
    },
    stage: {
        id: 'stage',
        title: 'Central Stage',
        icon: Mic,
        colorClass: 'text-pink-500',
        bgClass: 'bg-pink-50',
        distance: '2 mins walk (150m)',
        events: [
            { time: '2 PM', title: 'Live Influencer Stage Performance', subtitle: 'Meet and greet', tag: 'Free', active: true, route: '/booking/stage-performance' }
        ]
    }
};

export const StoreMap = () => {
    const navigate = useNavigate();
    const { selectedStore, setSelectedStore } = useApp();
    const [activeLocation, setActiveLocation] = useState(locations.cooking);
    const [isNavigating, setIsNavigating] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(true);
    const [scale, setScale] = useState(1);

    const handleZoomIn = () => setScale(s => Math.min(s + 0.2, 2.5));
    const handleZoomOut = () => setScale(s => Math.max(s - 0.2, 0.4));
    const handleLocateFixed = () => {
        setScale(1);
        setIsNavigating(false);
        setActiveLocation(locations.cooking);
        setIsSheetOpen(true);
    };

    return (
        <div className="relative flex h-screen w-full max-w-md mx-auto flex-col overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header / Search Section */}
            <div className="z-20 bg-white/90 backdrop-blur-md pt-4 shadow-sm border-b border-gray-100">
                <div className="flex items-center px-4 pb-2 justify-between">
                    <button onClick={() => navigate(-1)} className="text-slate-900 flex size-12 shrink-0 items-center justify-center hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex-1 flex justify-center items-center">
                        <div className="relative flex items-center bg-slate-100 rounded-full py-1.5 px-3 hover:bg-slate-200 transition-colors cursor-pointer">
                            <select 
                                className="appearance-none bg-transparent text-slate-900 text-sm font-bold leading-tight tracking-tight text-center focus:outline-none pr-6 cursor-pointer"
                                value={selectedStore}
                                onChange={(e) => {
                                    setSelectedStore(e.target.value);
                                    triggerToast(`Switched to Auchan ${e.target.value}`);
                                }}
                            >
                                <optgroup label="Budapest">
                                    <option value="Óbuda">Óbuda</option>
                                    <option value="Savoya">Savoya</option>
                                    <option value="Soroksár">Soroksár</option>
                                    <option value="Csömör">Csömör</option>
                                    <option value="Szigetszentmiklós">Szigetszentmiklós</option>
                                    <option value="Újhegy">Újhegy (Supermarket)</option>
                                </optgroup>
                                <optgroup label="County Seats">
                                    <option value="Debrecen">Debrecen</option>
                                    <option value="Kecskemét">Kecskemét</option>
                                    <option value="Miskolc József Attila">Miskolc József Attila</option>
                                    <option value="Miskolc Pesti út">Miskolc Pesti út</option>
                                    <option value="Szeged">Szeged</option>
                                    <option value="Székesfehérvár">Székesfehérvár</option>
                                    <option value="Szolnok">Szolnok</option>
                                </optgroup>
                                <optgroup label="Other Cities">
                                    <option value="Budakalász">Budakalász</option>
                                    <option value="Budaörs">Budaörs</option>
                                    <option value="Dunakeszi">Dunakeszi</option>
                                    <option value="Fót">Fót</option>
                                    <option value="Maglód">Maglód</option>
                                    <option value="Solymár">Solymár</option>
                                    <option value="Törökbálint">Törökbálint</option>
                                </optgroup>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 text-slate-500 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex w-12 items-center justify-end">
                        <button onClick={() => triggerToast('Notifications')} className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </div>
                <div className="px-4 py-3">
                    <div className="flex flex-col min-w-40 h-12 w-full relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={20} className="text-slate-400" />
                        </div>
                        <input 
                            onClick={() => navigate('/search')}
                            className="flex w-full min-w-0 flex-1 rounded-xl focus:outline-0 focus:ring-0 border border-slate-200 bg-white h-full placeholder:text-slate-400 pl-12 pr-4 text-base font-normal shadow-sm cursor-pointer" 
                            placeholder="Search zones (e.g. Cooking Studio, Wine Cellar)" 
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Main Map Area */}
            <div className="relative flex-1 bg-slate-50 overflow-hidden">
                {/* Scrollable Container */}
                <div className="absolute inset-0 overflow-auto touch-pan-x touch-pan-y scrollbar-hide">
                    <div style={{ width: 800 * scale, height: 800 * scale, minWidth: '100%', minHeight: '100%', transition: 'all 0.3s ease-out' }}>
                        {/* Map Vector Container */}
                        <div 
                            className="w-[800px] h-[800px] relative origin-top-left bg-slate-50 transition-transform duration-300 ease-out"
                            style={{ transform: `scale(${scale})` }}
                        >
                                    {/* Simulated Store Map Background */}
                                    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
                                    
                                    {/* Store Perimeter & Entrance */}
                                    <div className="absolute inset-8 border-[6px] border-slate-200/50 rounded-[40px] pointer-events-none"></div>
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-3 bg-emerald-400 rounded-t-xl z-0 shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-black text-slate-400 uppercase tracking-widest pb-1 drop-shadow-sm">Entrance</div>

                                    {/* Checkout Zone */}
                                    <div className="absolute bottom-28 left-20 right-20 h-16 flex gap-4 opacity-90">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                            <div key={i} className="flex-1 bg-cyan-50 border-2 border-cyan-100 rounded-lg flex items-center justify-center shadow-sm">
                                                <span className="text-sm font-bold text-cyan-500">{i}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Aisle blocks */}
                                    <div className="absolute inset-x-20 top-20 bottom-52">
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-12 h-full w-full">
                                            {/* Row 1 */}
                                            <button 
                                                onClick={() => { setActiveLocation(locations.bakery); setIsNavigating(false); setIsSheetOpen(true); }}
                                                className={`border-[3px] rounded-2xl h-full w-full relative flex items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm transition-all focus:outline-none cursor-pointer ${activeLocation.id === 'bakery' ? 'bg-orange-100 border-orange-400 scale-[1.02]' : 'bg-orange-50/90 border-orange-100 hover:scale-[1.02]'}`}
                                            >
                                                <span className="rotate-[-90deg] text-xl font-black text-orange-400/80 uppercase tracking-wider shadow-white drop-shadow-md">Bakery</span>
                                            </button>
                                            <div className="bg-emerald-50/90 border-[3px] border-emerald-100 rounded-2xl h-full w-full relative flex items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm">
                                                <span className="rotate-[-90deg] text-xl font-black text-emerald-500/80 uppercase tracking-wider shadow-white drop-shadow-md">Fresh</span>
                                            </div>
                                            <div className="bg-blue-50/90 border-[3px] border-blue-100 rounded-2xl h-full w-full relative flex items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm">
                                                <span className="rotate-[-90deg] text-xl font-black text-blue-400/80 uppercase tracking-wider shadow-white drop-shadow-md">Dairy</span>
                                            </div>
                                            <div className="bg-slate-100/90 border-[3px] border-slate-200 rounded-2xl h-full w-full relative flex items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm">
                                                <span className="rotate-[-90deg] text-xl font-black text-slate-400/80 uppercase tracking-wider shadow-white drop-shadow-md">Frozen</span>
                                            </div>
                                            
                                            {/* Row 2 */}
                                            <div className="bg-slate-100/90 border-[3px] border-slate-200 rounded-2xl h-full w-full relative flex items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm">
                                                <span className="rotate-[-90deg] text-xl font-black text-slate-400/80 uppercase tracking-wider shadow-white drop-shadow-md">Pantry</span>
                                            </div>
                                            <div className="col-span-2 bg-indigo-50/90 border-[3px] border-indigo-100 rounded-2xl h-full w-full relative flex flex-col items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm">
                                                <span className="text-2xl font-black text-indigo-400/80 uppercase tracking-wider shadow-white drop-shadow-md">Electronics</span>
                                                <span className="text-sm font-bold text-indigo-300 mt-2">Appliances • Tech</span>
                                            </div>
                                            <div className="bg-pink-50/90 border-[3px] border-pink-100 rounded-2xl h-full w-full relative flex items-center justify-center shadow-sm overflow-hidden backdrop-blur-sm">
                                                <span className="rotate-[-90deg] text-xl font-black text-pink-400/80 uppercase tracking-wider shadow-white drop-shadow-md">Beauty</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Location */}
                                    <div className="absolute top-[70%] left-[24%] z-20">
                                        <div className="relative -ml-3 -mt-3">
                                            <div className="absolute -inset-4 bg-blue-500/30 rounded-full blur-md animate-pulse"></div>
                                            <div className="h-6 w-6 bg-blue-500 border-4 border-white rounded-full relative z-10 shadow-md"></div>
                                        </div>
                                    </div>

                                    {/* Dynamic Path Navigation */}
                                    {isNavigating && (
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ strokeDasharray: '1 1' }}>
                                            {activeLocation.id === 'cooking' && <path d="M 24 70 Q 35 50, 72 25" fill="none" stroke="#2563eb" strokeWidth="0.8" className="animate-[dash_2s_linear_infinite]" />}
                                            {activeLocation.id === 'wine' && <path d="M 24 70 Q 35 70, 52 64" fill="none" stroke="#2563eb" strokeWidth="0.8" className="animate-[dash_2s_linear_infinite]" />}
                                            {activeLocation.id === 'skating' && <path d="M 24 70 Q 50 40, 82 82" fill="none" stroke="#2563eb" strokeWidth="0.8" className="animate-[dash_2s_linear_infinite]" />}
                                            {activeLocation.id === 'stage' && <path d="M 24 70 Q 50 60, 42 35" fill="none" stroke="#2563eb" strokeWidth="0.8" className="animate-[dash_2s_linear_infinite]" />}
                                        </svg>
                                    )}

                                    {/* Experience Zone Pins */}
                                    <button 
                                        onClick={() => { setActiveLocation(locations.cooking); setIsNavigating(false); setIsSheetOpen(true); }}
                                        className={`absolute top-[25%] left-[72%] flex flex-col items-center transition-all z-20 -ml-6 -mt-12 cursor-pointer ${activeLocation.id === 'cooking' ? 'text-auchan-red scale-110' : 'text-slate-500 opacity-90 scale-100 hover:scale-110 hover:opacity-100'}`}
                                    >
                                        <div className={`relative flex items-center justify-center p-3 rounded-full ${activeLocation.id === 'cooking' ? 'bg-auchan-red text-white shadow-[0_0_20px_rgba(226,24,54,0.6)]' : 'bg-white text-slate-500 shadow-md border-2 border-slate-100'}`}>
                                            <MapPin size={activeLocation.id === 'cooking' ? 40 : 32} className="fill-current" />
                                        </div>
                                        {activeLocation.id === 'cooking' && <span className="bg-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg border-2 border-red-100 whitespace-nowrap mt-2 relative z-10 text-auchan-red tracking-wide">Cooking Studio</span>}
                                    </button>
                                    
                                    <button 
                                        onClick={() => { setActiveLocation(locations.wine); setIsNavigating(false); setIsSheetOpen(true); }}
                                        className={`absolute top-[64%] left-[52%] flex flex-col items-center transition-all z-20 -ml-6 -mt-12 cursor-pointer ${activeLocation.id === 'wine' ? 'text-purple-600 scale-110' : 'text-slate-500 opacity-90 scale-100 hover:scale-110 hover:opacity-100'}`}
                                    >
                                        <div className={`relative flex items-center justify-center p-3 rounded-full ${activeLocation.id === 'wine' ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-white text-slate-500 shadow-md border-2 border-slate-100'}`}>
                                            <MapPin size={activeLocation.id === 'wine' ? 40 : 32} className="fill-current" />
                                        </div>
                                        {activeLocation.id === 'wine' && <span className="bg-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg border-2 border-purple-100 whitespace-nowrap mt-2 relative z-10 text-purple-600 tracking-wide">Wine Cellar</span>}
                                    </button>
                                    
                                    <button 
                                        onClick={() => { setActiveLocation(locations.restrooms); setIsNavigating(false); setIsSheetOpen(true); }}
                                        className={`absolute top-[82%] left-[75%] flex flex-col items-center z-10 -ml-6 -mt-12 cursor-pointer transition-all hover:scale-110 active:scale-95 ${activeLocation.id === 'restrooms' ? 'scale-110 opacity-100' : 'opacity-80'}`}
                                    >
                                        <div className={`relative flex items-center justify-center p-3 rounded-full shadow-md border-2 ${activeLocation.id === 'restrooms' ? 'bg-slate-500 text-white border-slate-600' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                                            <MapPin size={32} className="fill-current text-white" />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap mt-2 border border-slate-300 ${activeLocation.id === 'restrooms' ? 'bg-slate-700 text-white' : 'bg-white text-slate-500'}`}>Restrooms</span>
                                    </button>

                                    {/* New Zone Pins */}
                                    <button 
                                        onClick={() => { setActiveLocation(locations.skating); setIsNavigating(false); setIsSheetOpen(true); }}
                                        className={`absolute top-[82%] left-[82%] flex flex-col items-center transition-all z-20 -ml-6 -mt-12 cursor-pointer ${activeLocation.id === 'skating' ? 'text-indigo-500 scale-110' : 'text-slate-500 opacity-90 scale-100 hover:scale-110 hover:opacity-100'}`}
                                    >
                                        <div className={`relative flex items-center justify-center p-3 rounded-full ${activeLocation.id === 'skating' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]' : 'bg-white text-slate-500 shadow-md border-2 border-slate-100'}`}>
                                            <Activity size={activeLocation.id === 'skating' ? 40 : 32} className="fill-current" />
                                        </div>
                                        {activeLocation.id === 'skating' && <span className="bg-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg border-2 border-indigo-100 whitespace-nowrap mt-2 relative z-10 text-indigo-600 tracking-wide">Indoor Roller Skating Rink</span>}
                                    </button>

                                    <button 
                                        onClick={() => { setActiveLocation(locations.stage); setIsNavigating(false); setIsSheetOpen(true); }}
                                        className={`absolute top-[35%] left-[42%] flex flex-col items-center transition-all z-20 -ml-6 -mt-12 cursor-pointer ${activeLocation.id === 'stage' ? 'text-pink-500 scale-110' : 'text-slate-500 opacity-90 scale-100 hover:scale-110 hover:opacity-100'}`}
                                    >
                                        <div className={`relative flex items-center justify-center p-3 rounded-full ${activeLocation.id === 'stage' ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]' : 'bg-white text-slate-500 shadow-md border-2 border-slate-100'}`}>
                                            <Mic size={activeLocation.id === 'stage' ? 40 : 32} className="fill-current" />
                                        </div>
                                        {activeLocation.id === 'stage' && <span className="bg-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg border-2 border-pink-100 whitespace-nowrap mt-2 relative z-10 text-pink-600 tracking-wide">Central Stage</span>}
                                    </button>
                                </div>
                            </div>
                        </div>

                {/* Map Floating Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                    <button onClick={handleZoomIn} className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur shadow-md text-slate-900 active:bg-slate-50 border border-slate-100 hover:bg-white transition-colors">
                        <Plus size={24} />
                    </button>
                    <button onClick={handleZoomOut} className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur shadow-md text-slate-900 active:bg-slate-50 border border-slate-100 hover:bg-white transition-colors">
                        <Minus size={24} />
                    </button>
                    <button onClick={handleLocateFixed} className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur shadow-md text-blue-600 active:bg-slate-50 border border-slate-100 hover:bg-white transition-colors">
                        <LocateFixed size={24} />
                    </button>
                </div>

                {/* Reopen Menu Button */}
                {!isSheetOpen && (
                    <button 
                        onClick={() => setIsSheetOpen(true)}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-slate-900/20 z-20 flex items-center gap-2 animate-in slide-in-from-bottom active:scale-95 transition-transform"
                    >
                        <ChevronUp size={20} />
                        View Store Info
                    </button>
                )}

                {/* Bottom Sheet Overlay Content */}
                <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-slate-100 z-30 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSheetOpen ? 'translate-y-0' : 'translate-y-[100%]'}`}>
                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="flex-1"></div>
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center -translate-x-3"></div>
                        <button onClick={() => setIsSheetOpen(false)} className="flex-1 flex justify-end">
                            <div className="bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 text-slate-500 transition-colors">
                                <X size={16} />
                            </div>
                        </button>
                    </div>
                    
                    <div className="px-6 pb-6 key={activeLocation.id}">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${activeLocation.bgClass} ${activeLocation.colorClass}`}>
                                    <activeLocation.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{activeLocation.title}</h3>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                        <LocateFixed size={16} />
                                        <span>{activeLocation.distance}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    setIsNavigating(true);
                                    triggerToast('Navigation route displayed');
                                }} 
                                className="bg-auchan-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full text-sm shadow-md shadow-red-500/20 active:scale-95 transition-transform shrink-0"
                            >
                                Navigate
                            </button>
                        </div>
                        
                        <div className="h-px bg-slate-100 w-full mb-4"></div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Today's Schedule</h4>
                                <button onClick={() => navigate('/search')} className="text-xs text-auchan-red font-bold hover:underline">View all</button>
                            </div>
                            <div className="space-y-3">
                                {activeLocation.events.length === 0 ? (
                                    <div className="text-sm text-slate-500 p-4text-center italic border border-slate-100 rounded-xl bg-slate-50">
                                        No scheduled events today.
                                    </div>
                                ) : (
                                    activeLocation.events.map((event, i) => (
                                        <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${event.active ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100 opacity-60'}`}>
                                        <div className={`text-sm font-bold w-12 text-center ${event.active ? 'text-slate-900' : 'text-slate-400'}`}>{event.time}</div>
                                        <div className="h-8 w-px bg-slate-200 shrink-0"></div>
                                        <div className={`flex-1 ${event.active ? 'cursor-pointer hover:opacity-80' : ''}`} onClick={() => event.active && navigate(event.route)}>
                                            <div className="text-sm font-semibold text-slate-900 flex justify-between items-center">
                                                <span>{event.title}</span>
                                                {event.tag && (
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${event.tag === 'Join' ? 'bg-auchan-red text-white' : 'bg-slate-200 text-slate-600'}`}>
                                                        {event.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">{event.subtitle}</div>
                                        </div>
                                    </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
