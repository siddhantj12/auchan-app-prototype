import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, ListFilter, ChevronDown, Bookmark, Star, Calendar } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { triggerToast } from '../components/Toast';
import { type EventId } from '../constants/events';

type Category = 'cooking' | 'wine' | 'kids' | 'sports' | 'workshops';

const ACTIVITIES: Array<{
  id: EventId;
  title: string;
  price: string;
  priceNum: number;
  category: Category;
  weekend: boolean;
  image: string;
  stars: number;
  location: string;
  dateStr: string;
}> = [
  { id: 'pasta', title: 'Weekend Pasta Masterclass', price: '16,000 HUF', priceNum: 16000, category: 'cooking', weekend: true, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80', stars: 4.8, location: 'Auchan Soroksár', dateStr: 'Sat, 14 Oct • 10:00 AM' },
  { id: 'wine-tasting', title: 'Organic Wine Tasting', price: 'Free', priceNum: 0, category: 'wine', weekend: false, image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80', stars: 4.7, location: 'Wine Cellar', dateStr: 'Fri, 20 Oct • 5:00 PM' },
  { id: 'kids-workshop', title: 'Kids Painting Workshop', price: 'Free', priceNum: 0, category: 'kids', weekend: false, image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60', stars: 4.9, location: 'Kids Zone', dateStr: 'Sun, 22 Oct • 10:00 AM' },
  { id: 'skating', title: 'Indoor Roller Skating Rink', price: '3,500 HUF', priceNum: 3500, category: 'sports', weekend: true, image: 'https://images.unsplash.com/photo-1766524871451-15160b84d0e4?w=800&auto=format&fit=crop&q=80', stars: 4.6, location: 'Outdoor Plaza', dateStr: 'Sat, 21 Oct • 10:00 AM' },
  { id: 'stage-performance', title: 'Live Influencer Stage Performance', price: 'Free', priceNum: 0, category: 'sports', weekend: true, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', stars: 4.9, location: 'Central Stage', dateStr: 'Sat, 14 Oct • 2:00 PM' },
  { id: 'wine-basics', title: 'Wine Tasting Basics', price: 'Free', priceNum: 0, category: 'workshops', weekend: false, image: 'https://images.unsplash.com/photo-1558670460-cad0c19b1840?w=800&auto=format&fit=crop&q=80', stars: 4.8, location: 'Wine Cellar', dateStr: 'Thu, 19 Oct • 6:00 PM' },
  { id: 'apartment-makeover', title: 'Apartment Makeover 101', price: 'Free', priceNum: 0, category: 'workshops', weekend: true, image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80', stars: 4.9, location: 'Home Dept', dateStr: 'Sat, 14 Oct • 11:00 AM' },
  { id: 'mini-garden', title: 'Build Your Own Mini Garden', price: 'Free', priceNum: 0, category: 'workshops', weekend: true, image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&auto=format&fit=crop&q=80', stars: 4.7, location: 'Garden Center', dateStr: 'Sun, 15 Oct • 2:00 PM' },
  { id: 'eco-life', title: 'Leading Life with Green', price: 'Free', priceNum: 0, category: 'workshops', weekend: false, image: 'https://images.unsplash.com/photo-1650964336599-a6b32f916378?w=800&auto=format&fit=crop&q=80', stars: 4.8, location: 'Eco Zone', dateStr: 'Wed, 18 Oct • 5:00 PM' },
  { id: 'seasonal-crafts', title: 'Seasonal Crafting & Decorating', price: 'Free', priceNum: 0, category: 'workshops', weekend: true, image: 'https://images.unsplash.com/photo-1698615777972-cd34fa2dcc4b?w=800&auto=format&fit=crop&q=80', stars: 4.9, location: 'Craft Area', dateStr: 'Sat, 21 Oct • 3:00 PM' },
  { id: 'mini-einsteins', title: 'Mini Einsteins Science Event', price: 'Free', priceNum: 0, category: 'workshops', weekend: true, image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=800&auto=format&fit=crop&q=80', stars: 4.9, location: 'Kids Zone', dateStr: 'Sun, 22 Oct • 10:00 AM' },
  { id: 'vision-board', title: 'Vision Board Designing', price: 'Free', priceNum: 0, category: 'workshops', weekend: false, image: 'https://images.unsplash.com/photo-1593672715438-d88a70629abe?w=800&auto=format&fit=crop&q=80', stars: 4.7, location: 'Creative Space', dateStr: 'Tue, 17 Oct • 4:00 PM' },
  { id: 'paint-by-numbers', title: 'Paint-by-Numbers Workshop', price: 'Free', priceNum: 0, category: 'workshops', weekend: true, image: 'https://images.unsplash.com/photo-1595396892017-8bd1611c8b51?w=800&auto=format&fit=crop&q=80', stars: 4.8, location: 'Art Center', dateStr: 'Sat, 28 Oct • 1:00 PM' },
  { id: 'bead-jewelry', title: 'Bead Making & DIY Jewelry', price: 'Free', priceNum: 0, category: 'workshops', weekend: true, image: 'https://images.unsplash.com/photo-1624585179018-25699030cb8f?w=800&auto=format&fit=crop&q=80', stars: 4.7, location: 'Craft Area', dateStr: 'Sun, 29 Oct • 11:00 AM' },
  { id: 'pottery-workshop', title: 'Hands-on Pottery Workshop', price: 'Free', priceNum: 0, category: 'workshops', weekend: false, image: 'https://images.unsplash.com/photo-1631125915732-b98f8774f675?w=800&auto=format&fit=crop&q=80', stars: 4.9, location: 'Atrium', dateStr: 'Thu, 26 Oct • 5:00 PM' }
];

export const SearchFilter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 5000 | 10000 | 20000>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'weekend'>('all');
  const [activeDropdown, setActiveDropdown] = useState<'category' | 'price' | 'date' | null>(null);

  useEffect(() => {
    const defaultCategory = searchParams.get('category');
    if (defaultCategory && ['cooking', 'wine', 'kids', 'sports', 'workshops'].includes(defaultCategory)) {
        setCategoryFilter(defaultCategory as Category);
    }
  }, [searchParams]);

  const filteredActivities = useMemo(() => {
    let list = [...ACTIVITIES];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    }
    if (dateFilter === 'weekend') list = list.filter((a) => a.weekend);
    if (priceFilter !== 'all') list = list.filter((a) => a.priceNum <= priceFilter);
    if (categoryFilter !== 'all') list = list.filter((a) => a.category === categoryFilter);
    return list;
  }, [searchQuery, dateFilter, priceFilter, categoryFilter]);

  const activeFilterCount = [dateFilter !== 'all', priceFilter !== 'all', categoryFilter !== 'all'].filter(Boolean).length;

  const clearFilters = () => {
    setCategoryFilter('all');
    setPriceFilter('all');
    setDateFilter('all');
    setSearchQuery('');
    setActiveDropdown(null);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden animate-in fade-in duration-300 pb-20">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => navigate(-1)} className="text-slate-900 flex size-10 items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-2">Activities</h2>
          <div className="w-10" />
        </div>
        <div className="px-4 pb-3">
          <div className="flex w-full items-stretch rounded-xl bg-slate-100 h-12 relative overflow-hidden">
            <div className="text-slate-500 flex items-center justify-center pl-4 absolute inset-y-0 left-0 pointer-events-none">
              <Search size={20} />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex w-full border-none bg-transparent focus:outline-none focus:ring-0 h-full placeholder:text-slate-500 pl-11 pr-4 text-base font-normal"
              placeholder="Search cooking classes, events..."
            />
          </div>
        </div>
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto hide-scrollbar relative">
          <button
            onClick={clearFilters}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${activeFilterCount > 0 ? 'bg-auchan-red text-white hover:bg-red-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <ListFilter size={16} />
            <span className="text-sm font-semibold">Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-auchan-red rounded-full px-1.5 py-0.5 text-[10px] font-bold">{activeFilterCount}</span>
            )}
          </button>
          
          {/* Date Filter */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${dateFilter !== 'all' || activeDropdown === 'date' ? 'bg-auchan-red text-white hover:bg-red-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <span className="text-sm font-medium">{dateFilter === 'all' ? 'Any Date' : 'Weekend'}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'date' ? 'rotate-180' : ''}`} />
          </button>

          {/* Price Filter */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${priceFilter !== 'all' || activeDropdown === 'price' ? 'bg-auchan-red text-white hover:bg-red-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <span className="text-sm font-medium">{priceFilter === 'all' ? 'Any Price' : `Under ${priceFilter.toLocaleString()} HUF`}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
          </button>

          {/* Category Filter */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${categoryFilter !== 'all' || activeDropdown === 'category' ? 'bg-auchan-red text-white hover:bg-red-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <span className="text-sm font-medium capitalize">{categoryFilter === 'all' ? 'Category' : categoryFilter}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'category' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Popover Menus */}
      {activeDropdown && (
          <div className="absolute top-[132px] left-0 w-full z-30 px-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
                {activeDropdown === 'date' && (
                    <div className="flex flex-col">
                        <button onClick={() => { setDateFilter('all'); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors ${dateFilter === 'all' ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>Any Date</button>
                        <button onClick={() => { setDateFilter('weekend'); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors border-t border-slate-50 ${dateFilter === 'weekend' ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>This Weekend</button>
                    </div>
                )}
                {activeDropdown === 'price' && (
                    <div className="flex flex-col">
                        <button onClick={() => { setPriceFilter('all'); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors ${priceFilter === 'all' ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>Any Price</button>
                        <button onClick={() => { setPriceFilter(5000); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors border-t border-slate-50 ${priceFilter === 5000 ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>Under 5,000 HUF</button>
                        <button onClick={() => { setPriceFilter(10000); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors border-t border-slate-50 ${priceFilter === 10000 ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>Under 10,000 HUF</button>
                        <button onClick={() => { setPriceFilter(20000); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors border-t border-slate-50 ${priceFilter === 20000 ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>Under 20,000 HUF</button>
                    </div>
                )}
                {activeDropdown === 'category' && (
                    <div className="flex flex-col">
                        <button onClick={() => { setCategoryFilter('all'); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors capitalize ${categoryFilter === 'all' ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>All Categories</button>
                        {['cooking', 'wine', 'kids', 'sports', 'workshops'].map((cat) => (
                             <button key={cat} onClick={() => { setCategoryFilter(cat as Category); setActiveDropdown(null); }} className={`p-4 text-left font-medium text-sm hover:bg-slate-50 transition-colors border-t border-slate-50 capitalize ${categoryFilter === cat ? 'text-auchan-red bg-red-50' : 'text-slate-700'}`}>{cat}</button>
                        ))}
                    </div>
                )}
            </div>
            {/* Invisible backdrop to dismiss click outside */}
            <div className="fixed inset-0 top-[132px] -z-10 bg-black/5" onClick={() => setActiveDropdown(null)} />
          </div>
      )}

      {/* Results List */}
      <div className="flex-1 p-4 space-y-6">
        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 animate-in fade-in duration-300">
            <Search size={48} className="text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No results found</h3>
            <p className="text-sm">Try adjusting your filters or search to see more events.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-auchan-red font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer animate-in fade-in duration-300"
              onClick={() => navigate(`/booking/${activity.id}`)}
            >
              <div className="relative w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url("${activity.image}")` }}>
                <button
                  onClick={(e) => { e.stopPropagation(); triggerToast('Saved to Bookmarks'); }}
                  className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/90 shadow-md text-slate-900 hover:bg-white transition-colors"
                >
                  <Bookmark size={20} />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold leading-tight text-slate-900 pr-4">{activity.title}</h3>
                  <p className="text-auchan-red font-bold text-lg shrink-0">{activity.price}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <p className="text-sm font-medium">{activity.stars} stars</p>
                  <span className="mx-1">•</span>
                  <p className="text-sm">{activity.location}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 text-slate-600">
                  <Calendar size={16} />
                  <p className="text-sm">{activity.dateStr}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
