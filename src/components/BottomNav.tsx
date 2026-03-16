
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, Map, User } from 'lucide-react';

export const BottomNav = () => {
    const navItems = [
        { name: 'Lifestyle', icon: Home, path: '/lifestyle', isPrimary: true },
        { name: 'Map', icon: Map, path: '/map' },
        { name: 'Search', icon: Search, path: '/search' },
        { name: 'Loyalty', icon: Heart, path: '/loyalty' },
        { name: 'Family', icon: User, path: '/family' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-[100]">
            <div className="flex justify-between items-center max-w-md mx-auto overflow-x-auto hide-scrollbar snap-x pb-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `
              flex flex-col items-center justify-center min-w-[64px] h-12 snap-center
              ${isActive ? 'text-auchan-red' : 'text-gray-400'}
              ${item.isPrimary && isActive ? 'font-bold' : ''}
              transition-colors duration-200
            `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={22} strokeWidth={isActive || item.isPrimary ? 2.5 : 2} />
                                <span className="text-[9px] mt-1 font-medium">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
