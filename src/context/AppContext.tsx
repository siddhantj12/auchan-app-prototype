import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface AppContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  activeFamilyMember: string | null;
  setActiveFamilyMember: (name: string | null) => void;

  savedEvents: string[];
  toggleSavedEvent: (eventId: string) => void;

  selectedStore: string;
  setSelectedStore: (store: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeFamilyMember, setActiveFamilyMember] = useState<string | null>(null);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('Soroksár');

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const toggleSavedEvent = (eventId: string) => {
    setSavedEvents(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <AppContext.Provider value={{
      cartItems, addToCart, removeFromCart, clearCart,
      activeFamilyMember, setActiveFamilyMember,
      savedEvents, toggleSavedEvent,
      selectedStore, setSelectedStore
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
