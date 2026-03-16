import { useState } from 'react';
import { ArrowLeft, Settings, Award, Users, Plus, ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { triggerToast } from '../components/Toast';
import { useApp } from '../context/AppContext';

export const FamilyProfile = () => {
    const navigate = useNavigate();
    const [familyMode, setFamilyMode] = useState(true);
    const { activeFamilyMember, setActiveFamilyMember, addToCart } = useApp();
    const [editingMember, setEditingMember] = useState<{ id: string, name: string, age: number } | null>(null);

    const [familyMembers, setFamilyMembers] = useState([
        { id: 'leo', name: 'Leo', age: 7, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvTe0td8zqcbqhm_H4x4s4ypIiBsmd1MIC_VFPThTZG6e3G9AB0-vsICF8P11V1G6Vv3YQO7ygEnwvkahhHhpc3SvfjH504Z6o70eWVzpyLLMHzAZ6kVe2Kt8Ak4UIIiKrAfUOyTZucy_K9TGu0mMeXCQsB48ESJSo1ClPFZEaAR4sVZKKCkNe6W3Fbu6g9R9CcYJbw5AYG3MelRA6dfkiVL_Z5znRQPO-bxUH9_Z52xTXu0qYbhrDNkNyl4oC031TmW4-BsbDq8U', bg: 'bg-orange-100' },
        { id: 'mila', name: 'Mila', age: 5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzRjdY0F_VD3iFvb4WjDWq6tslxxOm4EyvuzEyXTVot4PtsGXYTp2NXbvB-gzeDJejJilz1oMinp-GXdNfdEY17JbDS1COal1rW0Htzh4YwOEDcdpF8N55j9DKlr-FSQvpzTq3PItlyIy6n9v0fgoL0uAhnTZY1B1xG0vIJuoefYuel4UIYD5OL_nLyCgIRF1--UhIYHu83m2maWd-oLyYvZCGpNc-wrqUvJsqQbJXY6p_MXrAd2n5yYxwKM8gOMEU9BE8S3YbfDs', bg: 'bg-purple-100' }
    ]);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');
    const [newMemberAge, setNewMemberAge] = useState('');

    const handleAddMemberSubmit = () => {
        if (newMemberName && newMemberAge) {
            setFamilyMembers([...familyMembers, {
                id: newMemberName.toLowerCase().replace(/\s+/g, '-'),
                name: newMemberName,
                age: parseInt(newMemberAge) || 0,
                image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&auto=format&fit=crop&q=60',
                bg: 'bg-green-100'
            }]);
            setIsAddingMember(false);
            setNewMemberName('');
            setNewMemberAge('');
            triggerToast(`${newMemberName} added to family!`);
        }
    };

    const handleMemberClick = (memberId: string) => {
        if (activeFamilyMember === memberId) {
            setActiveFamilyMember(null);
            triggerToast('Viewing All Recommendations');
        } else {
            setActiveFamilyMember(memberId);
            const member = familyMembers.find(m => m.id === memberId);
            if (member) {
                triggerToast(`Viewing ${member.name}'s Recommendations`);
            }
        }
    };

    const handleEditClick = (e: React.MouseEvent, member: any) => {
        e.stopPropagation();
        setEditingMember(member);
    };

    const saveEdit = () => {
        if (editingMember) {
            triggerToast(`Saved profile for ${editingMember.name}`);
            setEditingMember(null);
        }
    };

    return (
        <div className="bg-white font-sans text-slate-900 min-h-screen flex flex-col pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Navigation */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft size={24} className="text-slate-900" />
                </button>
                <h1 className="text-lg font-bold tracking-tight text-center flex-1">Auchan Family</h1>
                <button onClick={() => triggerToast('Settings Opened')} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors">
                    <Settings size={24} className="text-slate-900" />
                </button>
            </div>

            {/* Main Content Scroll Area */}
            <main className="flex-1 overflow-y-auto">
                {/* Parent Profile Card / Loyalty Card */}
                <div className="px-4 py-4">
                    <div className="p-5 bg-gradient-to-br from-auchan-red to-red-900 rounded-2xl shadow-lg relative overflow-hidden">
                        {/* Decorative background overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5" />
                        
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                                <div 
                                    className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-white/20 shadow-inner" 
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvgAlTjSfxsR51dlT1E8hj-wj5tHSpPM8tp6D59x2aFnKww85YIGn9FPvDYHlR85SzKH9BafoOX0RsO5Vu3zDvJI56mRAXWaCmkTjF_2TUEuWUhyX_nowmMEpuSkxAVaxTV6bt3yfO45Pgbx2e5XB9DlofwfFCB0fqIlFkNhw6dfiyW-eKjJz1an8ow9i92TpqXPx1cog7IYvUvbnOsBv8JA0-jKngdTdvJpaw6ZGlOzPKULikdpxtY4PUmDdW_Xai1MTFyS1fK7A')" }}
                                />
                            </div>
                            <div className="flex-1 text-white">
                                <h2 className="text-xl font-bold leading-tight">Sophie Dupont</h2>
                                <p className="text-white/80 text-sm flex items-center gap-1 mt-1 font-medium">
                                    <Award size={16} className="text-yellow-400" />
                                    Loyalty Status: <span className="text-yellow-400 font-bold tracking-wide">GOLD</span>
                                </p>
                            </div>
                            <button onClick={() => triggerToast('Manage Profile')} className="bg-white/20 backdrop-blur text-white border border-white/30 text-xs font-bold px-3 py-2 rounded-lg hover:bg-white/30 transition-colors">
                                Edit
                            </button>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center relative z-10 text-white/90">
                            <span className="font-mono text-sm tracking-widest opacity-80">AUC • 4920 1192 4810</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Member since '24</span>
                        </div>
                    </div>
                </div>

                {/* Family Mode Toggle Button */}
                <div className="mx-4 my-4">
                    <button 
                        onClick={() => {
                            setFamilyMode(!familyMode);
                            triggerToast(familyMode ? 'Family Mode Disabled' : 'Family Mode Activated');
                        }}
                        className={`w-full flex items-center justify-center gap-3 font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] ${
                            familyMode 
                            ? 'bg-red-800 text-white shadow-red-900/20' 
                            : 'bg-auchan-red hover:bg-red-700 text-white shadow-red-500/20'
                        }`}
                    >
                        <Users size={20} />
                        {familyMode ? 'Family Mode Active' : 'Activate Family Mode'}
                    </button>
                </div>

                {/* Family Members Carousel */}
                <div className="px-4 py-2">
                    <h3 className="text-base font-bold mb-3">Family Members</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {familyMembers.map((member) => (
                            <div 
                                key={member.id}
                                onClick={() => handleMemberClick(member.id)} 
                                className={`flex flex-col items-center min-w-[80px] cursor-pointer group relative`}
                            >
                                <div className={`w-16 h-16 rounded-2xl ${member.bg} flex items-center justify-center border-2 shadow-sm overflow-hidden mb-2 transition-all group-hover:scale-105 group-active:scale-95 ${activeFamilyMember === member.id ? 'border-auchan-red ring-2 ring-red-200 ring-offset-2' : 'border-white'}`}>
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <p className={`text-sm ${activeFamilyMember === member.id ? 'font-black text-auchan-red' : 'font-semibold'}`}>
                                    {member.name}, {member.age}
                                </p>
                                <button 
                                    onClick={(e) => handleEditClick(e, member)}
                                    className="absolute -top-1 -right-1 bg-white border border-slate-200 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                                >
                                    <Settings size={12} className="text-slate-500" />
                                </button>
                            </div>
                        ))}
                        {/* Add New */}
                        <button onClick={() => setIsAddingMember(true)} className="flex flex-col items-center min-w-[80px] group pt-1 cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-auchan-red shadow-md shadow-red-500/30 flex items-center justify-center mb-2 group-hover:scale-105 active:scale-95 transition-all">
                                <Plus size={24} className="text-white" />
                            </div>
                            <p className="text-sm font-bold text-auchan-red mt-1">Add</p>
                        </button>
                    </div>
                </div>

                {/* Section 1: Kids Activity Recommendations */}
                <div className="mt-4 border-t border-slate-100 pt-6">
                    <div className="px-4 flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold">Kids Activity Recommendations</h3>
                        <button onClick={() => navigate('/lifestyle')} className="text-auchan-red text-sm font-semibold hover:underline">See all in Hub</button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-4">
                        {(!activeFamilyMember || activeFamilyMember === 'leo') && (
                        <div className="min-w-[240px] bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            <div 
                                className="h-32 bg-cover bg-center" 
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60')" }}
                            />
                            <div className="p-3">
                                <h4 className="font-bold text-sm">Kids Painting Workshop</h4>
                                <p className="text-xs text-slate-500 mt-1">Creative arts & crafts</p>
                                <button onClick={() => navigate('/booking/kids-workshop')} className="mt-3 w-full py-2 bg-red-50 text-auchan-red hover:bg-red-100 text-xs font-bold rounded-lg transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        )}
                        {(!activeFamilyMember || activeFamilyMember === 'mila') && (
                        <div className="min-w-[240px] bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            <div 
                                className="h-32 bg-cover bg-center" 
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551464885-21348ccc7b67?w=800&auto=format&fit=crop&q=60')" }}
                            />
                            <div className="p-3">
                                <h4 className="font-bold text-sm">Roller Skating Rink</h4>
                                <p className="text-xs text-slate-500 mt-1">Every Sat 10:00 AM</p>
                                <button onClick={() => navigate('/booking/skating')} className="mt-3 w-full py-2 bg-red-50 text-auchan-red hover:bg-red-100 text-xs font-bold rounded-lg transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>

                {/* Section 2: Family Grocery Bundles */}
                <div className="mt-4 px-4 pb-8">
                    <h3 className="text-base font-bold mb-4">Family Grocery Bundles</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Product Card 1 */}
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col">
                            <div className="aspect-square bg-slate-50 rounded-lg mb-2 relative flex items-center justify-center p-2">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn4daARpzhl8ewCuRqEPI05tSKguPQtuwrD7PTorjPDkEi9PDIjS7FevOiq3ES92gVfnS_iQOcZBmcxfsYJbk6-v_ehrnuhmAJ_3tjCc1FJIeeyZeFCU7qAFtzq8FF5elhG4pVt9xhle0BO_YaBVh9KwV2xSma9KXXawNoUNZ1o0IfMii0lCkJyIj9lmiTdHLXmxogBmDaLjvENFeSkXXYQ8HCYiteD8P1xxUaD_pCfKAjcj9QLdr3nA6TtE7bLXuMLSva-M8vbLM" alt="Family Pasta Kit" className="w-full h-full object-contain" />
                                <span className="absolute top-2 left-2 bg-auchan-red text-white text-[10px] font-bold px-2 py-0.5 rounded">SAVE 20%</span>
                            </div>
                            <p className="text-xs font-bold leading-tight line-clamp-2">Family Pasta Kit</p>
                            <p className="text-xs text-slate-500 mt-1">Serves 4-6 people</p>
                            <div className="mt-auto pt-3 flex items-center justify-between">
                                <p className="text-sm font-bold text-auchan-red">5,000 HUF</p>
                                <button 
                                    onClick={() => {
                                        addToCart({ id: 'pasta-bundle', name: 'Family Pasta Kit', price: '5,000 HUF', quantity: 1 });
                                        triggerToast('Added to Cart');
                                    }} 
                                    className="w-8 h-8 rounded-full bg-auchan-red hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors active:scale-95"
                                >
                                    <ShoppingCart size={14} />
                                </button>
                            </div>
                        </div>
                        {/* Product Card 2 */}
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col">
                            <div className="aspect-square bg-slate-50 rounded-lg mb-2 relative flex items-center justify-center p-2">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO4G5wdDaRM4LNdzxkfA82bS_wpBN_4m56moSNEnzsRA2hqlacGFaiCJ6SIneABW_AbxxpXJI4GJ34zOM5olRuBRyx8oyzGb0DAJT7WQt3D-_7inQXKqEMubocc6AFc6YRYXu354Mp8-3IswEYsRLq_qpF7Jhx52D9CmdKAACR_ZtVelpfebh7z4EVJcHcBTExY3yboOb_JN6k9LCGlc2h4i5r0sdrTZrtWa9sc51blz04utDVGW4Co8cG3jj539qhirvok1U8AJs" alt="Breakfast Bundle" className="w-full h-full object-contain" />
                                <span className="absolute top-2 left-2 bg-auchan-red text-white text-[10px] font-bold px-2 py-0.5 rounded">OFFER</span>
                            </div>
                            <p className="text-xs font-bold leading-tight line-clamp-2">Breakfast Bundle</p>
                            <p className="text-xs text-slate-500 mt-1">Perfect for mornings</p>
                            <div className="mt-auto pt-3 flex items-center justify-between">
                                <p className="text-sm font-bold text-auchan-red">3,500 HUF</p>
                                <button 
                                    onClick={() => {
                                        addToCart({ id: 'breakfast-bundle', name: 'Breakfast Bundle', price: '3,500 HUF', quantity: 1 });
                                        triggerToast('Added to Cart');
                                    }} 
                                    className="w-8 h-8 rounded-full bg-auchan-red hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors active:scale-95"
                                >
                                    <ShoppingCart size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Edit Profile Modal Overlay */}
            {editingMember && (
                <div className="absolute inset-0 z-[60] flex items-end justify-center animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setEditingMember(null)} />
                    <div className="bg-white w-full rounded-t-[32px] p-6 pb-12 relative animate-in slide-in-from-bottom-12 duration-300">
                        <button onClick={() => setEditingMember(null)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-900">
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-6 mt-2">Edit Profile</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    value={editingMember.name} 
                                    onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-auchan-red focus:bg-white" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Age</label>
                                <input 
                                    type="number" 
                                    value={editingMember.age} 
                                    onChange={(e) => setEditingMember({...editingMember, age: parseInt(e.target.value) || 0})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-auchan-red focus:bg-white" 
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button 
                                onClick={saveEdit}
                                className="w-full py-4 rounded-xl bg-auchan-red text-white font-bold shadow-lg shadow-red-500/30 active:scale-[0.98] transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Add Member Modal */}
            {isAddingMember && (
                <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="font-bold text-lg">Add Family Member</h3>
                            <button onClick={() => setIsAddingMember(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-auchan-red outline-none transition-all font-medium"
                                        placeholder="Enter member's name"
                                        value={newMemberName}
                                        onChange={(e) => setNewMemberName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Age</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-auchan-red outline-none transition-all font-medium"
                                        placeholder="e.g. 8"
                                        value={newMemberAge}
                                        onChange={(e) => setNewMemberAge(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleAddMemberSubmit}
                                disabled={!newMemberName || !newMemberAge}
                                className="w-full bg-auchan-red text-white font-bold py-4 rounded-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 active:scale-95"
                            >
                                Save Member
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
