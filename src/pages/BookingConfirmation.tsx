import { useState } from 'react';
import { ChevronLeft, CheckCircle2, QrCode, Wallet } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { triggerToast } from '../components/Toast';

export const BookingConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    
    const state = location.state as { eventTitle?: string; eventId?: string; eventImage?: string; eventDate?: string } | null;
    const eventTitle = state?.eventTitle ?? 'Italian Pasta Masterclass';
    const eventSubtitle = state?.eventId === 'pasta' ? 'Auchan Soroksár Studio' : state?.eventId === 'wine-tasting' ? 'Wine Cellar' : 'Auchan Experience';
    const eventImage = state?.eventImage ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCp5fNVCgBjMdAC7VFMUZYbCsrvB8HWhSr9cGk07fJnTdF0Hvhaz1KgyKj-XeuozIvAUoyuvu-keXl1EdzQ_EVdN4zllKu95aMdnF0OFBDrDHeIsAD-9lD95S6PrwGrw5PrL1CefZ9z0PPloGBX_BFhiw7K7XleZxLVUSmeFlLeZxrht7PLyqa8E5hxkQScx91ZMD7_d8tkxp3MrSEH-_Vj-GnWLJtjdUTsnnawCwph92hP0u00OD1TXlpPNZi_uuGLq0VJsHRgao';
    const eventDateFull = state?.eventDate ?? 'Oct 14, 2026 • 10:00 AM';

    const [datePart, timePart] = eventDateFull.includes(' • ') ? eventDateFull.split(' • ') : [eventDateFull, ''];
    
    const priceText = state?.eventId === 'wine-tasting' ? 'Free' : '16,000 HUF';

    return (
        <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-slate-50 overflow-x-hidden animate-in zoom-in-95 duration-300 pb-20">
            {/* Header */}
            <div className="flex items-center bg-white p-4 border-b border-slate-100 z-10 sticky top-0">
                <button onClick={() => navigate('/lifestyle')} className="text-slate-900 flex size-10 items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full transition-colors">
                    <ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <h2 className="text-slate-900 text-lg font-bold leading-tight flex-1 text-center pr-10">E-Ticket</h2>
            </div>
            
            {/* Status Message */}
            <div className="flex flex-col items-center pt-8 pb-4 px-4 text-center">
                <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4 shadow-sm">
                    <CheckCircle2 size={48} className="fill-green-600 text-white" />
                </div>
                <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Booking Confirmed!</h1>
                <p className="text-slate-500 mt-2 font-medium">Your spot is secured for {eventTitle}.</p>
            </div>
            
            {/* Ticket Card */}
            <div className="p-4 px-6 w-full relative z-10">
                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col relative">
                    <div 
                        className="h-40 w-full bg-cover bg-center" 
                        style={{ backgroundImage: `url("${eventImage}")` }}
                    />
                    
                    <div className="p-6 pt-8 relative bg-white">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-slate-900 text-2xl font-bold mb-1 leading-tight">{eventTitle}</h2>
                            <p className="text-[#E3001B] font-bold text-sm mb-8 uppercase tracking-widest">{eventSubtitle}</p>
                            
                            <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-inner border border-slate-100 flex items-center justify-center mb-5 relative group">
                                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <QrCode size={160} strokeWidth={1} className="text-slate-800" />
                            </div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Scan at entrance for entry</p>
                        </div>
                        
                        {/* Perforated divider */}
                        <div className="relative flex items-center mb-8 -mx-6">
                            <div className="absolute -left-4 h-8 w-8 rounded-full bg-slate-50 border-r border-slate-200 shadow-inner"></div>
                            <div className="w-full border-t-[3px] border-dashed border-slate-200"></div>
                            <div className="absolute -right-4 h-8 w-8 rounded-full bg-slate-50 border-l border-slate-200 shadow-inner"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Date</p>
                                <p className="text-slate-900 font-bold text-sm">{datePart}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Time</p>
                                <p className="text-slate-900 font-bold text-sm">{timePart}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Tickets</p>
                                <p className="text-slate-900 font-bold text-sm">2 Adults</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Order #</p>
                                <p className="text-slate-900 font-bold text-sm text-auchan-red">AUC-88912</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Actions */}
            <div className="px-6 py-4 flex flex-col gap-3 relative z-10">
                <button onClick={() => triggerToast('Added to Apple Wallet')} className="flex w-full items-center justify-center gap-2 rounded-2xl h-[60px] bg-black text-white font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl shadow-black/20 active:scale-95">
                    <Wallet size={24} />
                    Add to Apple Wallet
                </button>
                <button onClick={() => setIsReceiptOpen(true)} className="flex w-full items-center justify-center rounded-2xl h-[60px] bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 transition-colors active:scale-95 cursor-pointer">
                    View Receipt
                </button>
            </div>
            {/* Mock Receipt Modal */}
            {isReceiptOpen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 flex items-center justify-center overflow-y-auto pt-24 pb-10 px-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[320px] rounded-sm shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 font-mono text-xs">
                        {/* Zigzag Top */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-50 border-t border-slate-200 before:bg-white before:absolute before:inset-0 before:-top-1 before:h-2" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%, 100% 100%, 0% 100%)', backgroundColor: 'white', marginTop: '-8px' }}></div>
                        
                        <div className="p-6 pt-8 pb-4 border-b-2 border-dashed border-slate-300">
                            <img src="/auchanlogo.png" alt="Auchan Logo" className="h-6 mx-auto mb-2 object-contain" />
                            <p className="text-center text-slate-500 mb-6">Soroksár Hypermarket<br/>1239 Budapest</p>
                            
                            <div className="mb-4">
                                <p>Date: {datePart}</p>
                                <p>Time: {timePart}</p>
                                <p>Order: AUC-88912</p>
                                <p>Card: **** **** **** 1092</p>
                            </div>
                            
                            <table className="w-full mb-6 text-left">
                                <thead>
                                    <tr className="border-b border-black">
                                        <th className="py-1 font-normal uppercase">Item</th>
                                        <th className="py-1 font-normal text-right uppercase">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 pr-2">{eventTitle}</td>
                                        <td className="py-2 text-right">{priceText}</td>
                                    </tr>
                                    <tr className="text-slate-500">
                                        <td className="pb-2 text-xs">Ticket • Qty 2 Adults</td>
                                        <td className="pb-2 text-right"></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <div className="flex justify-between font-bold text-sm mb-1 mt-4 border-t border-black pt-2">
                                <span>TOTAL</span>
                                <span>{priceText}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 mb-6 font-normal">
                                <span>TAX INCLUDED</span>
                                <span>0.00 HUF</span>
                            </div>
                            
                            <div className="text-center mt-8">
                                <QrCode size={40} strokeWidth={1.5} className="mx-auto mb-2 text-slate-800" />
                                <p className="text-slate-500 tracking-widest text-[8px] uppercase">Thank you for your visit</p>
                            </div>
                        </div>

                        {/* Zigzag Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-2" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%, 100% 0%, 0% 0%)', backgroundColor: 'white', marginBottom: '-8px' }}></div>
                        
                        <div className="p-4 bg-slate-100 flex justify-center mt-2 rounded-b flex-col">
                            <button onClick={() => setIsReceiptOpen(false)} className="w-full py-3 bg-black text-white rounded font-sans font-bold test-sm hover:bg-slate-800 transition-colors uppercase cursor-pointer">
                                Close Receipt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
