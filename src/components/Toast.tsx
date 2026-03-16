import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const triggerToast = (message: string) => {
    const event = new CustomEvent('show-toast', { detail: message });
    window.dispatchEvent(event);
};

export const ToastContainer = () => {
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

    useEffect(() => {
        const handleShowToast = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            setToast({ message: customEvent.detail, visible: true });
            
            setTimeout(() => {
                setToast(prev => ({ ...prev, visible: false }));
            }, 3000);
        };

        window.addEventListener('show-toast', handleShowToast);
        return () => window.removeEventListener('show-toast', handleShowToast);
    }, []);

    if (!toast.visible) return null;

    return (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium">
                <CheckCircle2 size={18} className="text-green-400" />
                {toast.message}
            </div>
        </div>
    );
};
