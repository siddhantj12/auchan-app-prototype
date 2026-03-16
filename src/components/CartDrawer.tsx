import { X, ShoppingCart, Minus, Plus, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cartItems, removeFromCart, addToCart } = useApp();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const total = cartItems.reduce((acc, item) => {
        const priceString = item.price.replace(/,/g, '').replace(' HUF', '').replace('€', '').trim();
        const price = parseFloat(priceString) || 0;
        return acc + (price * item.quantity);
    }, 0);

    return (
        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-auto">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 animate-in fade-in duration-300" 
                onClick={onClose}
            />
            
            {/* Drawer */}
            <div className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300`}>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-auchan-red">
                        <ShoppingCart size={20} />
                        <h2 className="font-bold text-lg text-slate-900">Your Cart</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 pb-20">
                            <ShoppingCart size={48} className="text-slate-300" />
                            <p className="text-slate-500 font-medium">Your cart is empty.</p>
                            <button 
                                onClick={() => { onClose(); navigate('/lifestyle'); }}
                                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-full font-semibold text-sm hover:bg-slate-200 transition-colors"
                            >
                                Browse Experiences
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm text-slate-900 leading-tight">{item.name}</h3>
                                    <p className="text-sm font-bold text-auchan-red mt-1">{item.price}</p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs text-slate-400 font-medium hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                    <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100 mt-2">
                                        <button 
                                            // Optional: decrement logic could go here, for now it just removes if 1
                                            onClick={() => item.quantity > 1 ? addToCart({...item, quantity: -1}) : removeFromCart(item.id)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-auchan-red active:scale-95"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => addToCart({...item, quantity: 1})}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-auchan-red active:scale-95"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-slate-100 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-slate-500">Total</span>
                            <span className="text-xl font-black text-slate-900">{total.toLocaleString()} HUF</span>
                        </div>
                        <button 
                            className="w-full flex items-center justify-center gap-2 py-4 bg-auchan-red text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-700 active:scale-[0.98] transition-all"
                            onClick={() => {
                                // Dummy checkout
                                onClose();
                                navigate('/confirmation', { state: { title: 'Checkout Successful' }})
                            }}
                        >
                            Checkout <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
