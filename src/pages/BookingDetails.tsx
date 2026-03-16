import { ArrowLeft, Clock, MapPin, CheckCircle2, ShoppingBag, Search } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { triggerToast } from '../components/Toast';
import { isValidEventId } from '../constants/events';

const EVENT_DATA: Record<string, any> = {
    'pasta': {
        title: 'Italian Pasta Masterclass',
        tag: 'Cooking Studio',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        dateStr: 'Saturday, Oct 14 • 10:00 AM - 1:00 PM',
        locationStr: 'Auchan Soroksár, Hypermarket Kitchen',
        description: 'Learn the art of hand-crafting authentic Italian pasta from scratch. Led by our in-store artisan chefs using straight-from-the-shelf ingredients.',
        price: '16,000 HUF',
        matchText: 'Pasta, Tomatoes, and Olive oil',
        ingredients: [
            { name: 'Organic Tomatoes', owned: true },
            { name: 'Extra Virgin Olive Oil', owned: true },
            { name: 'Fresh Basil', owned: false },
            { name: 'Parmigiano Reggiano', owned: false }
        ]
    },
    'wine-tasting': {
        title: 'Organic Wine Tasting',
        tag: 'Wine Cellar',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        dateStr: 'Friday, Oct 20 • 5:00 PM - 6:30 PM',
        locationStr: 'Auchan Soroksár, Wine Cellar',
        description: 'Discover the rich flavors of organic wines from local vineyards. Our sommelier will guide you through a selection of 5 premium wines.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Artisanal Crackers and Brie Cheese',
        ingredients: [
            { name: 'Artisanal Crackers', owned: true },
            { name: 'Brie Cheese', owned: true },
            { name: 'Prosciutto', owned: false },
            { name: 'Grapes', owned: false }
        ]
    },
    'kids-workshop': {
        title: 'Kids Painting Workshop',
        tag: 'Kids Zone',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60',
        dateStr: 'Sunday, Oct 22 • 10:00 AM - 12:00 PM',
        locationStr: 'Auchan Kids Activity Center',
        description: 'A fun and creative painting workshop for kids aged 5-10. Let them explore their artistic side! All materials provided.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Colorful markers and Drawing paper',
        ingredients: [
            { name: 'Drawing paper', owned: true },
            { name: 'Colorful markers', owned: true },
            { name: 'Kids Apron', owned: false },
            { name: 'Watercolors kit', owned: false }
        ]
    },
    'skating': {
        title: 'Indoor Roller Skating Rink',
        tag: 'Sports Area',
        image: 'https://images.unsplash.com/photo-1766524871451-15160b84d0e4?w=800&auto=format&fit=crop&q=60',
        dateStr: 'Every Sat • 10:00 AM - 11:30 AM',
        locationStr: 'Auchan Outdoor Plaza',
        description: 'Enjoy our outdoor roller skating session. Perfect for a fun weekend activity with the family. Price includes skate rental.',
        price: '3,500 HUF',
        isTicketedOnly: true,
        matchText: 'Energy Bars and Bottled Water',
        ingredients: [
            { name: 'Energy Bars', owned: true },
            { name: 'Bottled Water', owned: true },
            { name: 'Safety Helmet', owned: false },
            { name: 'Knee Pads', owned: false }
        ]
    },
    'wine-basics': {
        title: 'Wine Tasting Basics',
        tag: 'Wine Cellar',
        image: 'https://images.unsplash.com/photo-1558670460-cad0c19b1840?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Thursday, Oct 19 • 6:00 PM - 7:30 PM',
        locationStr: 'Auchan Soroksár, Wine Cellar',
        description: 'Guided tasting introducing local wineries and tasting techniques. Learn how to identify aromas, understand pairing basics, and enjoy wine to the fullest.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Wine glasses and Tasting notes',
        ingredients: [
            { name: 'Wine glasses', owned: true },
            { name: 'Tasting notes notebook', owned: false },
            { name: 'Palate cleanser selection', owned: false }
        ]
    },
    'apartment-makeover': {
        title: 'Apartment Makeover 101',
        tag: 'Home Department',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Saturday, Oct 14 • 11:00 AM - 12:30 PM',
        locationStr: 'Auchan Design Center',
        description: 'Transform your living space with demonstrations of lighting, décor layering, and organization hacks from our interior specialists.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Organization storages',
        ingredients: [
            { name: 'Decorative Lighting', owned: false },
            { name: 'Décor accessories', owned: false },
            { name: 'Organization storages', owned: false }
        ]
    },
    'mini-garden': {
        title: 'Build Your Own Mini Garden',
        tag: 'Garden Center',
        image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Sunday, Oct 15 • 2:00 PM - 3:30 PM',
        locationStr: 'Auchan Garden Center',
        description: 'Teaching you the essentials needed to build and sustain a beautiful mini garden right at home. Great for balconies and indoor spaces.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Seeds and Pots',
        ingredients: [
            { name: 'Assorted Seeds', owned: false },
            { name: 'Ceramic pots', owned: false },
            { name: 'Potting soil', owned: false },
            { name: 'Basic gardening tools', owned: false }
        ]
    },
    'eco-life': {
        title: 'Leading Life with Green',
        tag: 'Eco Zone',
        image: 'https://images.unsplash.com/photo-1650964336599-a6b32f916378?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Wednesday, Oct 18 • 5:00 PM - 6:00 PM',
        locationStr: 'Auchan Community Hub',
        description: 'Discover eco-friendly alternative products and methods for sustainability leadership in your everyday household routines.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Eco cleaning products',
        ingredients: [
            { name: 'Eco cleaning products', owned: false },
            { name: 'Reusable goods', owned: false },
            { name: 'Glass containers', owned: false }
        ]
    },
    'seasonal-crafts': {
        title: 'Seasonal Crafting & Decorating',
        tag: 'Craft Area',
        image: 'https://images.unsplash.com/photo-1698615777972-cd34fa2dcc4b?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Saturday, Oct 21 • 3:00 PM - 5:00 PM',
        locationStr: 'Auchan Creative Corner',
        description: 'Join us for autumn pumpkin decorating and early Christmas ornament workshops. Perfect family bonding Activity.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Paint kits and Craft supplies',
        ingredients: [
            { name: 'Craft supplies', owned: false },
            { name: 'Paint kits', owned: true },
            { name: 'Seasonal Décor items', owned: false }
        ]
    },
    'mini-einsteins': {
        title: 'Mini Einsteins Science Event',
        tag: 'Kids Zone',
        image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Sunday, Oct 22 • 10:00 AM - 11:30 AM',
        locationStr: 'Auchan Kids Activity Center',
        description: 'A series of fun, safe, and wildly entertaining science experiments aimed for kids to ignite their love for discovery.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Experiment kits',
        ingredients: [
            { name: 'Experiment kits', owned: false },
            { name: 'Safety goggles', owned: true },
            { name: 'Craft supplies', owned: false }
        ]
    },
    'vision-board': {
        title: 'Vision Board Designing',
        tag: 'Creative Space',
        image: 'https://images.unsplash.com/photo-1593672715438-d88a70629abe?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Tuesday, Oct 17 • 4:00 PM - 5:30 PM',
        locationStr: 'Auchan Creative Corner',
        description: 'Set personal goals visually using recycled magazines, vibrant stationery, and creative materials guided by a life coach.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Journals and Planners',
        ingredients: [
            { name: 'Journals', owned: false },
            { name: 'Planners', owned: false },
            { name: 'Stationery & Markers', owned: true }
        ]
    },
    'paint-by-numbers': {
        title: 'Paint-by-Numbers Workshop',
        tag: 'Art Center',
        image: 'https://images.unsplash.com/photo-1595396892017-8bd1611c8b51?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Saturday, Oct 28 • 1:00 PM - 3:00 PM',
        locationStr: 'Auchan Art Studio',
        description: 'Relax and unwind. Participants will learn shading basics and complete beautiful small paint-by-number canvases.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Paint-by-number kits',
        ingredients: [
            { name: 'Paint-by-number kits', owned: false },
            { name: 'Acrylic paints', owned: true },
            { name: 'Brushes', owned: true },
            { name: 'Art supplies bag', owned: false }
        ]
    },
    'bead-jewelry': {
        title: 'Bead Making & DIY Jewelry',
        tag: 'Craft Area',
        image: 'https://images.unsplash.com/photo-1624585179018-25699030cb8f?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Sunday, Oct 29 • 11:00 AM - 1:00 PM',
        locationStr: 'Auchan Creative Corner',
        description: 'Learn the intricate craft of necklace and bracelet making. Design and take home your very own custom jewelry pieces.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Jewelry kits',
        ingredients: [
            { name: 'Assorted Beads', owned: false },
            { name: 'Jewelry kits', owned: false },
            { name: 'Crafting tools', owned: true }
        ]
    },
    'pottery-workshop': {
        title: 'Hands-on Pottery Workshop',
        tag: 'Atrium',
        image: 'https://images.unsplash.com/photo-1631125915732-b98f8774f675?w=800&auto=format&fit=crop&q=80',
        dateStr: 'Thursday, Oct 26 • 5:00 PM - 7:00 PM',
        locationStr: 'Auchan Central Atrium',
        description: 'A hands-on workshop teaching participants how to shape, score, and sculpt beautiful clay decorative objects for their homes.',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Clay kits and Sculpting tools',
        ingredients: [
            { name: 'Air-dry clay kits', owned: false },
            { name: 'Sculpting tools', owned: true },
            { name: 'Acrylic paints', owned: true }
        ]
    },
    'stage-performance': {
        title: 'Live Influencer Stage Performance',
        tag: 'Main Stage',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        dateStr: 'Saturday, Oct 14 • 2:00 PM - 4:00 PM',
        locationStr: 'Auchan Central Plaza Stage',
        description: 'Join local influencers for an exclusive live performance, product unboxings, and meet-and-greets!',
        price: 'Free',
        isTicketedOnly: true,
        matchText: 'Energy Drinks and Snacks',
        ingredients: [
            { name: 'Energy Drinks', owned: true },
            { name: 'Snacks', owned: true },
            { name: 'VIP Pass', owned: false },
            { name: 'Merch Bag', owned: false }
        ]
    }
};

export const BookingDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const eventId = id ?? '';
    const event = isValidEventId(eventId) ? EVENT_DATA[eventId] : null;

    if (!event) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 pb-24 animate-in fade-in duration-300">
                <div className="rounded-full bg-slate-100 p-6 mb-6">
                    <Search size={48} className="text-slate-400" />
                </div>
                <h1 className="text-xl font-bold text-slate-900 text-center mb-2">Event not found</h1>
                <p className="text-slate-500 text-sm text-center mb-6">This activity may have been removed or the link is outdated.</p>
                <button onClick={() => navigate('/search')} className="bg-auchan-red text-white font-bold py-3 px-6 rounded-xl mb-3 w-full max-w-xs">
                    Browse activities
                </button>
                <button onClick={() => navigate('/lifestyle')} className="text-slate-600 font-medium py-2">
                    Back to Lifestyle
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen bg-gray-50 pb-24 animate-in slide-in-from-right-8 duration-300 relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 w-11 h-11 rounded-full bg-slate-900/70 shadow-xl backdrop-blur-md flex items-center justify-center text-white hover:bg-slate-900 transition-colors z-[100]"
            >
                <ArrowLeft size={24} strokeWidth={2.5} />
            </button>

            {/* Hero Header */}
            <div className="relative h-72 w-full">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />
            </div>

            <div className="px-6 -mt-10 relative z-10">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="inline-block bg-red-50 text-auchan-red text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3">
                        {event.tag}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight leading-none mb-4">{event.title}</h1>

                    <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span>{event.dateStr}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-400" />
                            <span>{event.locationStr}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm mb-6">
                        {event.description}
                    </p>

                    <button
                        onClick={() => navigate('/confirmation', { state: { eventTitle: event.title, eventId: eventId, eventImage: event.image, eventDate: event.dateStr } })}
                        className="w-full bg-[#E3001B] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 active:scale-95 transition-transform flex justify-between items-center px-6"
                    >
                        <span>Purchase Ticket</span>
                        <span className="text-sm font-medium bg-red-700/50 px-2 py-1 rounded-lg">{event.price}</span>
                    </button>
                </div>
            </div>

            {/* Ingredient Suggestion Feature block */}
            {!event.isTicketedOnly && (
                <div className="px-6 mt-8">
                    <h3 className="font-bold text-lg mb-4">Ingredient Match</h3>
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-2xl -mr-10 -mt-10 opacity-60" />

                        <div className="relative z-10">
                            <p className="text-green-800 font-medium text-sm mb-4">
                                You recently bought <span className="font-bold">{event.matchText}</span>. Perfect for this event!
                            </p>

                            <div className="space-y-2 mb-5">
                                {event.ingredients.map((ing: any, i: number) => (
                                    ing.owned ? (
                                        <div key={i} className="flex items-center gap-2 text-sm text-green-700">
                                            <CheckCircle2 size={16} className="fill-green-600 text-white" />
                                            <span className="line-through opacity-70">{ing.name}</span>
                                        </div>
                                    ) : (
                                        <div 
                                            key={i}
                                            onClick={() => triggerToast(`Added ${ing.name} to Cart`)}
                                            className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer p-1 -ml-1 rounded-md hover:bg-green-100/50 transition-colors"
                                        >
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                            <span>{ing.name} (Missing)</span>
                                        </div>
                                    )
                                ))}
                            </div>

                            <button 
                                onClick={() => triggerToast('Ingredients added to Cart')}
                                className="w-full flex items-center justify-center gap-2 bg-white border border-green-200 text-green-700 font-bold py-3 rounded-xl shadow-sm hover:bg-green-50 active:scale-[0.98] transition-all"
                            >
                                <ShoppingBag size={18} />
                                Add remaining to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
