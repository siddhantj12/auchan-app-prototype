import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { LifestyleHub } from './pages/LifestyleHub';
import { BookingDetails } from './pages/BookingDetails';
import { LoyaltyDashboard } from './pages/LoyaltyDashboard';
import { Onboarding } from './pages/Onboarding';
import { FamilyProfile } from './pages/FamilyProfile';
import { StoreMap } from './pages/StoreMap';
import { SearchFilter } from './pages/SearchFilter';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { ToastContainer } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { useApp } from './context/AppContext';
import { ShoppingCart } from 'lucide-react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useApp();

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black font-sans w-full md:max-w-md mx-auto shadow-2xl relative overflow-hidden">
        {/* Mobile Status Bar Simulation */}
        <div className="bg-white sticky top-0 z-50 px-6 py-2 flex justify-between items-center text-sm font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-black" />
            <span className="w-4 h-4 bg-black rounded-sm" />
            <span className="w-6 h-3 bg-black rounded-sm" />
          </div>
        </div>

        <ToastContainer />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <div className="relative z-0 h-[calc(100vh-80px)] overflow-y-auto bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/lifestyle" element={<LifestyleHub />} />
            <Route path="/booking" element={<BookingDetails />} />
            <Route path="/booking/:id" element={<BookingDetails />} />
            <Route path="/loyalty" element={<LoyaltyDashboard />} />
            <Route path="/family" element={<FamilyProfile />} />
            <Route path="/map" element={<StoreMap />} />
            <Route path="/garden" element={<Navigate to="/lifestyle" replace />} />
            <Route path="/search" element={<SearchFilter />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
          </Routes>
        </div>

        {/* Global Floating Cart Button */}
        {cartItemCount > 0 && (
          <button 
            onClick={() => setIsCartOpen(true)}
            className="absolute bottom-24 right-4 z-40 w-14 h-14 bg-auchan-red text-white rounded-full shadow-lg shadow-red-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all animate-in zoom-in"
          >
            <ShoppingCart size={24} />
            <div className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartItemCount}
            </div>
          </button>
        )}

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
