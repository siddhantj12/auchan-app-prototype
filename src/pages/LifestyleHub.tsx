import { Search, MapPin, Calendar, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { triggerToast } from '../components/Toast';

export const LifestyleHub = () => {
    const navigate = useNavigate();
    const { selectedStore, setSelectedStore } = useApp();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-auchan-red font-bold">
                    <MapPin size={20} fill="currentColor" className="text-white" />
                    <div className="relative flex items-center bg-red-50 rounded-lg py-1 px-2 hover:bg-red-100 transition-colors cursor-pointer border border-red-100">
                        <select 
                            className="appearance-none bg-transparent text-auchan-red text-base font-bold leading-tight tracking-tight focus:outline-none pr-6 cursor-pointer"
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
                        <ChevronDown size={16} className="absolute right-2 text-auchan-red pointer-events-none" />
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/search')}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                >
                    <Search size={20} className="text-gray-600" />
                </button>
            </div>

            <div className="px-6 mb-8">
                <h1 className="text-2xl font-bold tracking-tight mb-1">Discover Experiences</h1>
                <p className="text-gray-500 text-sm">Join events, workshops, and classes in-store</p>
            </div>

            {/* Hero Carousel */}
            <div className="px-6 mb-8">
                <div
                    onClick={() => navigate('/booking/pasta')}
                    className="relative h-64 rounded-3xl overflow-hidden shadow-lg cursor-pointer transform transition-transform active:scale-95"
                >
                    <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Cooking Class"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                        <span className="bg-auchan-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                            Featured Event
                        </span>
                        <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Italian Pasta<br />Masterclass</h2>
                        <div className="flex items-center text-white/90 text-sm font-medium">
                            <Calendar size={16} className="mr-1.5" />
                            This Saturday
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Grid */}
            <div className="px-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Categories</h3>
                    <button onClick={() => navigate('/search')} className="text-auchan-red text-sm font-medium hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { icon: '🍳', label: 'Cooking', id: 'cooking' },
                        { icon: '🍷', label: 'Wine', id: 'wine' },
                        { icon: '⛸️', label: 'Indoor Skating', id: 'sports' },
                        { icon: '🎨', label: 'Kids', id: 'kids' },
                        { icon: '🛠️', label: 'Workshops', id: 'workshops' },
                    ].map((cat, i) => (
                        <button key={i} onClick={() => navigate(`/search?category=${cat.id}`)} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm text-2xl">
                                {cat.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-600">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="px-6 pb-24">
                <h3 className="font-bold text-lg mb-4">Recommended for You</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Kids Painting Workshop', price: 'Free', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60', rating: 4.9, route: '/booking/kids-workshop' },
                        { title: 'Wine & Cheese Tasting', price: '5,000 HUF', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60', rating: 4.7, route: '/booking/wine-tasting' }
                    ].map((item, i) => (
                        <div key={i} onClick={() => navigate(item.route)} className="flex gap-4 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]">
                            <img src={item.img} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
                            <div className="flex flex-col justify-center flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-bold text-gray-600">{item.rating}</span>
                                </div>
                                <h4 className="font-bold text-base leading-tight mb-2">{item.title}</h4>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="font-bold text-auchan-red">{item.price}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); navigate(item.route); }}
                                        className="bg-gray-900 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
