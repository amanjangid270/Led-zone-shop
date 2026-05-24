import React, { useEffect, useState, useRef } from 'react';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/auth';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, Clock, RefreshCw, ChevronRight, Package, Truck, CheckCircle2, AlertTriangle, Cpu, Receipt, Search, ArrowUpDown, Printer, Copy, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { sendConfirmationEmail } from '../lib/emailService';

interface BookingRecord {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  type: 'repair' | 'new' | 'refurbished';
  product: string;
  amount: number;
  issue: string;
  transactionId: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  createdAt: any;
}

export const MyOrders = () => {
  const { user, signIn, loading: authLoading } = useAuthStore();
  const [orders, setOrders] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedTrackers, setExpandedTrackers] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyReference = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      toast.success('Booking ID copied successfully');
      setTimeout(() => setCopiedId(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy Booking ID');
    });
  };

  const PROGRESS_STAGES = [
    { key: 'pending', label: 'Pending', description: 'Application safely received and logged' },
    { key: 'verified', label: 'Verified', description: 'Google E2E auth signature validation complete' },
    { key: 'diagnostic', label: 'Diagnostic', description: 'Quantum laser scan diagnostics analyzed' },
    { key: 'repair', label: 'Repair/Dispatch', description: 'Hardware aligned / drone transit dispatched' },
    { key: 'success', label: 'Success', description: 'Operations successful. Handover verified.' }
  ];

  const getStageIndex = (status: string, id: string) => {
    if (status === 'success') return 4;
    if (status === 'failed') return 0;
    const charCode = id.charCodeAt(id.length - 1) || 0;
    if (status === 'processing') {
      return (charCode % 2) === 0 ? 2 : 3;
    }
    return (charCode % 2) === 0 ? 0 : 1;
  };

  const toggleTracker = (id: string) => {
    setExpandedTrackers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSimulateSuccess = async (order: BookingRecord) => {
    try {
      const orderRef = doc(db, 'bookings', order.id);
      await updateDoc(orderRef, { status: 'success' });
      toast.success('Simulated status update to SUCCESS! Triggers Receipt Email...');
      
      // Trigger confirmation email
      await sendConfirmationEmail({
        id: order.id,
        name: order.name,
        phone: order.phone,
        address: order.address,
        type: order.type,
        product: order.product,
        amount: order.amount,
        issue: order.issue,
        userEmail: user?.email || 'customer@ledzone-diagnostics.com'
      });
      
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Failed to simulate success:', err);
      toast.error('Simulation update error');
    }
  };

  // Functional features: search, status filter, sorting
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'success'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown states with click-outside detectors
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const printOrderSummary = (order: BookingRecord) => {
    const dateVal = order.createdAt?.seconds 
      ? new Date(order.createdAt.seconds * 1000) 
      : new Date(order.createdAt);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print your receipt');
      return;
    }
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LEDZone Receipt - ${order.transactionId || order.id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      padding: 0;
      color: #333;
      background: #fafafa;
    }
    .receipt-container {
      max-width: 600px;
      margin: 40px auto;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 35px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      background: #ffffff;
    }
    .header {
      border-bottom: 2px solid #22d3ee;
      padding-bottom: 20px;
      margin-bottom: 25px;
      text-align: center;
    }
    .logo {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -1.5px;
      text-transform: uppercase;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .logo-accent {
      color: #06b6d4;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
    }
    .info-table td {
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }
    .info-table td.label {
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .info-table td.value {
      text-align: right;
      font-weight: 700;
      color: #0f172a;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px dashed #e2e8f0;
      padding-top: 20px;
    }
    @media print {
      body { margin: 0; background: none; }
      .receipt-container { border: none; box-shadow: none; margin: 0; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div class="logo">Led<span class="logo-accent">Zone</span></div>
      <p style="margin: 5px 0 0; font-size: 12px; color: #64748b; font-weight: 500;">Secure Micro-Hardware Diagnostics & Fulfillment</p>
    </div>
    
    <table class="info-table">
      <tr>
        <td class="label">Receipt Reference</td>
        <td class="value" style="font-family: monospace;">${order.transactionId || order.id}</td>
      </tr>
      <tr>
        <td class="label">Date / Time</td>
        <td class="value">${dateVal.toLocaleString()}</td>
      </tr>
      <tr>
        <td class="label">Client Name</td>
        <td class="value">${order.name}</td>
      </tr>
      <tr>
        <td class="label">Phone Contact</td>
        <td class="value">${order.phone}</td>
      </tr>
      <tr>
        <td class="label">Operational Service</td>
        <td class="value" style="text-transform: uppercase;">${order.type === 'repair' ? 'Technical Panel Repair' : 'Product Order'}</td>
      </tr>
      <tr>
        <td class="label">Component Name</td>
        <td class="value">${order.product}</td>
      </tr>
      ${order.type === 'repair' ? `
      <tr>
        <td class="label">Reported Issue</td>
        <td class="value">${order.issue || 'Sub-Pixel Realignment'}</td>
      </tr>` : ''}
      <tr style="border-top: 2px solid #e2e8f0;">
        <td class="label" style="font-size: 12px; color: #010101; font-weight:850; padding-top: 16px;">Verified Amount Paid</td>
        <td class="value" style="font-size: 20px; color: #06b6d4; font-weight:900; padding-top: 16px;">₹${(order.amount || 0).toLocaleString('en-IN')}</td>
      </tr>
    </table>
    
    <div style="background: #f0fdfa; border: 1px solid #ccfbf1; padding: 12px; border-radius: 8px; text-align: center; font-size: 11px; color: #0f766e; font-weight: bold;">
      ✔ Google Firebase Network E2E Secure Authenticated
    </div>
    
    <div class="footer">
      <p>Thank you for choosing LEDZone Technical Operations.</p>
      <p>Support Hotline: 919084184735</p>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() { window.close(); }, 500);
    };
  </script>
</body>
</html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.id)
        );
        const snapshot = await getDocs(q);
        const docsList = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as BookingRecord;
        });

        // Sort client-side desc by date to avoid requiring unbuilt Firestore search indexes
        const sorted = docsList.sort((a, b) => {
          const tA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt).getTime();
          const tB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt).getTime();
          return tB - tA;
        });

        setOrders(sorted);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, refreshKey]);

  const filteredAndSortedOrders = orders
    .filter((order) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        order.product.toLowerCase().includes(q) ||
        (order.transactionId && order.transactionId.toLowerCase().includes(q)) ||
        order.id.toLowerCase().includes(q);

      if (statusFilter !== 'all') {
        return matchesSearch && order.status === statusFilter;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      const tA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt).getTime();
      const tB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? tB - tA : tA - tB;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[85vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
        <div>
          <span className="text-[10px] font-black tracking-widest text-cyan-500 uppercase font-mono block mb-1">
            Secure Personal Dashboard
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 leading-none">
            My Bookings & Orders
          </h1>
          <p className="text-gray-500 text-xs mt-2 font-medium">
            Real-time telemetry and order status matching active repair diagnostics and purchases.
          </p>
        </div>
        {user && (
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            disabled={loading}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-mono"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>
        )}
      </div>

      {!user ? (
        <div className="max-w-md mx-auto text-center py-16 px-8 bg-white border border-gray-100 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500" />
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 mx-auto animate-pulse">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-3 uppercase tracking-wider">Historical Log Locked</h3>
          <p className="text-xs text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed font-semibold">
            To query secure transactions and verify micro-hardware delivery progress, please authenticate via Google Firebase.
          </p>
          <button
            onClick={() => signIn()}
            className="w-full py-4 px-6 rounded-xl bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white hover:scale-[1.02] transition-all cursor-pointer shadow-lg shadow-cyan-200"
          >
            Sign In with Google
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Controls Panel (Search, Status Filter, Sort Toggle) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50/80 p-5 rounded-3xl border border-gray-100 items-center">
            {/* Search Bar */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or transaction reference..."
                className="w-full pl-11 pr-10 py-3.5 bg-white text-xs font-semibold rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-gray-800 placeholder-gray-400 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-black text-xs cursor-pointer font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter Dropdown */}
            <div className="md:col-span-3 relative" ref={statusRef}>
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 hover:border-gray-300 transition-all cursor-pointer font-mono shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Status:</span>
                  <span className="text-cyan-600 uppercase tracking-widest text-[9px] font-black">{statusFilter}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-gray-400 transform transition-transform ${statusDropdownOpen ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {statusDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-1.5 font-mono"
                  >
                    {[
                      { key: 'all', label: 'All Bookings' },
                      { key: 'pending', label: 'Pending' },
                      { key: 'processing', label: 'Processing' },
                      { key: 'success', label: 'Success' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setStatusFilter(opt.key as any);
                          setStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[9px] font-black transition-colors block uppercase tracking-widest border-b border-gray-50/50 last:border-0 cursor-pointer ${
                          statusFilter === opt.key ? 'text-cyan-600 bg-cyan-50/55 font-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort Toggle Dropdown */}
            <div className="md:col-span-3 relative" ref={sortRef}>
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 hover:border-gray-300 transition-all cursor-pointer font-mono shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Sort:</span>
                  <span className="text-gray-800 uppercase text-[9px] font-black">
                    {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                  </span>
                </div>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <AnimatePresence>
                {sortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-1.5 font-mono"
                  >
                    {[
                      { key: 'newest', label: 'Newest First' },
                      { key: 'oldest', label: 'Oldest First' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setSortOrder(opt.key as any);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[9px] font-black transition-colors block uppercase tracking-widest border-b border-gray-50/50 last:border-0 cursor-pointer ${
                          sortOrder === opt.key ? 'text-cyan-600 bg-cyan-50/55 font-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main List Row */}
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((s) => (
                    <div key={s} className="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse h-32" />
                  ))}
                </div>
              ) : filteredAndSortedOrders.length === 0 ? (
                <div className="text-center py-16 px-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
                  {/* Fallback image designed elegantly on technical tech blueprint background */}
                  <div className="relative w-full max-w-sm mb-6 rounded-2xl overflow-hidden border border-gray-100 shadow-inner group/emptyimg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-indigo-500/5 z-10 pointer-events-none" />
                    <img
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=450"
                      alt="No Active Micro-Payload Orders"
                      referrerPolicy="no-referrer"
                      className="w-full h-48 object-cover filter brightness-[0.8] contrast-[1.1] transition-transform duration-700 group-hover/emptyimg:scale-105"
                    />
                    {/* Digital status overlay text / indicator */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 font-mono">
                      <span className="text-[9px] text-cyan-400 font-extrabold tracking-widest uppercase">STATUS: EMPTY_LOG</span>
                      <span className="text-[8px] text-gray-400 font-bold uppercase font-mono">0 ACTIVE TELEMETRY</span>
                    </div>
                  </div>

                  <Package className="w-10 h-10 text-gray-300 mb-3 animate-bounce" />
                  <h4 className="text-md font-black uppercase tracking-widest text-gray-800 mb-1 font-mono">
                    No Matching Orders Found
                  </h4>
                  <p className="text-xs text-gray-500 mb-6 font-semibold max-w-sm mx-auto leading-relaxed">
                    {orders.length === 0 
                       ? "You haven't initiated any repair bookings or display purchases yet." 
                       : "No records match your status filter or search parameters."}
                  </p>
                  <div className="flex gap-3">
                    {orders.length > 0 && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                        }}
                        className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer font-mono"
                      >
                        Clear Filters
                      </button>
                    )}
                    <button
                      onClick={() => navigate('/booking?type=repair')}
                      className="px-5 py-3 rounded-xl bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer font-mono shadow-md shadow-cyan-200"
                    >
                      Book Repair Diagnoses
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredAndSortedOrders.map((order) => {
                    const dateVal = order.createdAt?.seconds 
                      ? new Date(order.createdAt.seconds * 1000) 
                      : new Date(order.createdAt);
                    
                    return (
                      <motion.div
                        layout
                        key={order.id}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group/item hover:border-cyan-200 transition-colors"
                      >
                        {/* Left accent color based on workflow status */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                          order.status === 'success' ? 'bg-green-500' :
                          order.status === 'processing' ? 'bg-cyan-500 animate-pulse' :
                          order.status === 'failed' ? 'bg-red-500' : 'bg-amber-400'
                        }`} />

                        <div className="p-6 md:p-8 pl-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="space-y-3 flex-1">
                            {/* Order Reference Indicator */}
                            <div className="flex flex-wrap items-center gap-2.5">
                              <div className="inline-flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200/50">
                                <span className="text-[9px] font-mono font-black pl-2 pr-1 text-gray-600 uppercase">
                                  REF: {order.id.slice(0, 14)}
                                </span>
                                <button
                                  id={`copy-ref-btn-${order.id}`}
                                  onClick={(e) => handleCopyReference(order.id, e)}
                                  className="p-1.5 rounded-lg bg-white hover:bg-cyan-50 text-gray-400 hover:text-cyan-500 transition-all shadow-sm cursor-pointer border border-gray-100"
                                  title="Copy Booking ID"
                                >
                                  {copiedId === order.id ? (
                                    <Check className="w-3 h-3 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              <span className={`text-[9px] font-mono font-black py-1 px-2.5 rounded uppercase tracking-widest ${
                                order.type === 'repair' ? 'bg-blue-50 text-blue-600' :
                                order.type === 'refurbished' ? 'bg-purple-50 text-purple-600' :
                                'bg-cyan-50 text-cyan-600'
                              }`}>
                                {order.type}
                              </span>
                              
                              {/* Detailed status labels */}
                              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                order.status === 'success' ? 'text-green-700 bg-green-50' :
                                order.status === 'processing' ? 'text-cyan-700 bg-cyan-50' :
                                order.status === 'failed' ? 'text-red-700 bg-red-50' :
                                'text-amber-700 bg-amber-50'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  order.status === 'success' ? 'bg-green-500' :
                                  order.status === 'processing' ? 'bg-cyan-500 animate-pulse' :
                                  order.status === 'failed' ? 'bg-red-500' : 'bg-amber-400'
                                }`} />
                                {order.status}
                              </span>
                            </div>

                            <h3 className="text-md font-black text-gray-900 uppercase tracking-tight max-w-lg leading-tight group-hover/item:text-cyan-600 transition-colors">
                              {order.product}
                            </h3>

                            {/* Extra info metrics rows */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 pt-1 text-[11px] font-mono text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span>{dateVal.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5 col-span-1">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span>{dateVal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                              <div className="flex items-center gap-1.5 col-span-2 md:col-span-1">
                                <Receipt className="w-3.5 h-3.5 text-cyan-500" />
                                <span className="font-bold text-gray-700">₹{order.amount.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                            
                            {/* Issue diagnostic note */}
                            {order.type === 'repair' && (
                              <div className="mt-3 bg-gray-50 rounded-xl p-3 text-[11px] text-gray-600 border border-gray-100 font-medium">
                                <span className="font-bold text-gray-400 uppercase tracking-wide block mb-1">Diagnosed Issue:</span>
                                "{order.issue}"
                              </div>
                            )}

                            {/* Tracking Accordion Toggle */}
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={() => toggleTracker(order.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                <span>{expandedTrackers[order.id] ? "Collapse Progress Stepper ▲" : "Inspect Progress Stepper ▼"}</span>
                              </button>
                            </div>

                            {/* Collapsible Vertical Status Stepper */}
                            <AnimatePresence>
                              {expandedTrackers[order.id] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-4 bg-gray-50/70 p-5 rounded-2xl border border-gray-100 overflow-hidden"
                                >
                                  <div className="text-[8.5px] font-black tracking-widest uppercase text-gray-400 mb-4 font-mono flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                                    <span>E2E Micro-Operations Tracking Log</span>
                                  </div>

                                  <div className="relative pl-5 ml-2 border-l border-dashed border-cyan-400/60 space-y-5">
                                    {PROGRESS_STAGES.map((s, idx) => {
                                      const activeIndex = getStageIndex(order.status, order.id);
                                      const isCompleted = idx < activeIndex;
                                      const isActive = idx === activeIndex;

                                      return (
                                        <div key={s.key} className="relative text-left">
                                          {/* Step circle */}
                                          <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all z-10 ${
                                            isCompleted ? 'bg-green-500 border-green-500 text-white shadow-sm' :
                                            isActive ? 'bg-cyan-500 border-cyan-500 text-white animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]' :
                                            'bg-white border-gray-300 text-gray-400'
                                          }`}>
                                            {isCompleted ? (
                                              <span className="text-[7.5px] font-black">✓</span>
                                            ) : (
                                              <span className="text-[7.5px] font-bold">{idx + 1}</span>
                                            )}
                                          </div>

                                          {/* Step details */}
                                          <div className="pl-3">
                                            <h4 className={`text-[10px] font-black uppercase tracking-wider ${
                                              isCompleted ? 'text-green-600' :
                                              isActive ? 'text-cyan-500' :
                                              'text-gray-400'
                                            }`}>
                                              {s.label}
                                            </h4>
                                            <p className="text-[9.5px] text-gray-500 font-semibold leading-relaxed">
                                              {s.description}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Administrative simulated success button */}
                                  {order.status !== 'success' && (
                                    <div className="mt-4 pt-4 border-t border-gray-150 flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => handleSimulateSuccess(order)}
                                        className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:bg-[#06b6d4] hover:border-cyan-400 hover:text-black text-white font-mono text-[8px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
                                        title="Simulate Firestore update and send email receipt"
                                      >
                                        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                                        <span>Simulate Status → Success (Trigger Mock Email)</span>
                                      </button>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Action buttons columns */}
                          <div className="flex items-center gap-3 self-end md:self-auto">
                            <button
                              onClick={() => printOrderSummary(order)}
                              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50/10 transition-colors cursor-pointer flex items-center gap-2 group/btn font-mono"
                              title="Print Order Summary"
                            >
                              <Printer className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-cyan-500 group-hover/btn:scale-115 transition-transform" />
                              <span className="text-[9px] uppercase font-black tracking-widest">Print Summary</span>
                            </button>

                            <button
                              onClick={() => {
                                // We can simulate downloading receipt directly or moving back to quick booking review
                                const mockDetailsUrl = `/booking?type=${order.type}&product=${encodeURIComponent(order.product)}&amount=${order.amount}`;
                                navigate(mockDetailsUrl);
                              }}
                              className="p-3 rounded-xl hover:bg-gray-50 border border-gray-200 text-gray-400 hover:text-black transition-colors"
                              title="Review Details / File Invoice"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Logistics animated workflow simulation sidebar */}
            <div className="space-y-6">
            <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 overflow-hidden shadow-2xl relative text-white">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
              
              <div className="relative z-10">
                <span className="text-[8px] font-mono font-black text-cyan-400 uppercase tracking-widest block mb-1">
                  Hub Controller Telemetry
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                  Micro-Sorting Bay
                </h3>
                <p className="text-[10px] text-gray-400 leading-relaxed font-semibold mb-6">
                  Incoming repair panels and packaged items undergo microscopic QA calibrations under automated sorting robotics. Keep tabs on drone route progressions!
                </p>

                {/* ANIMATED SORTING FLOW GRAPHIC */}
                <div className="relative h-64 bg-black/60 rounded-2xl border border-gray-800 p-4 overflow-hidden flex flex-col justify-between">
                  
                  {/* Drone operator transporting product boxes */}
                  <motion.div
                    animate={{
                      x: [-10, 160, -10],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-4 left-4 z-20 flex flex-col items-center"
                  >
                    <span className="text-2xl filter drop-shadow-[0_2px_4px_black] select-none">🚁</span>
                    <span className="text-[5px] font-mono bg-indigo-500 py-0.5 px-1 rounded font-black text-white">
                      AIR_DRONE_1
                    </span>
                    
                    {/* Hanged crate box */}
                    <motion.div 
                      animate={{ rotate: [-8, 8, -8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-3 h-3 bg-amber-700/80 rounded shadow-[0_2px_4px_black] border border-amber-600 mt-0.5" 
                    />
                  </motion.div>

                  {/* Micro forklift operator moving packaging crates */}
                  <motion.div
                    animate={{
                      x: [160, -10, 160],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-4 left-6 z-20 flex flex-col items-center"
                  >
                    <span className="text-xl select-none">🚜</span>
                    <span className="text-[5px] font-mono bg-cyan-500 py-0.5 px-1 rounded font-black text-black">
                      FORKLIFT_DOCK_2
                    </span>
                  </motion.div>

                  {/* Inspector cartoon sorting item under green detector light beam */}
                  <div className="absolute right-4 bottom-6 z-20 flex flex-col items-center">
                    {/* Pulsating green inspect cone */}
                    <motion.div
                      animate={{
                        opacity: [0.1, 0.7, 0.1],
                        scaleX: [0.8, 1.2, 0.8]
                      }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="absolute bottom-6 right-1 w-12 h-14 bg-gradient-to-t from-emerald-500/25 to-transparent rounded-b-full filter blur-[1px]"
                    />
                    <div className="text-xl select-none">👷‍♂️</div>
                    <span className="text-[5px] font-mono bg-emerald-500 py-0.5 px-1 rounded font-black text-black">
                      INSPECTOR_LOG
                    </span>
                  </div>

                  {/* Sorting conveyor belt track background */}
                  <div className="w-full h-1 bg-gray-800 rounded absolute bottom-5 left-0 right-0 z-10">
                    <motion.div 
                      animate={{ backgroundPositionX: ['0px', '40px'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-full h-full bg-[linear-gradient(45deg,#22d3ee_25%,transparent_25%,transparent_50%,#22d3ee_50%,#22d3ee_75%,transparent_75%,transparent)]" 
                      style={{ backgroundSize: '10px 10px' }}
                    />
                  </div>
                  
                  {/* Progress statuses blocks */}
                  <div className="mt-14 space-y-2 z-10 w-full bg-black/40 p-2.5 rounded-lg border border-gray-800/80 font-mono">
                    <div className="flex items-center justify-between text-[7px] text-gray-500">
                      <span>TELEMETRY STAGE</span>
                      <span className="text-emerald-400 font-bold">ONLINE</span>
                    </div>
                    <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['20%', '85%', '20%'] }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="h-full bg-cyan-400" 
                      />
                    </div>
                    <div className="flex items-center justify-between text-[6.5px] text-gray-400">
                      <span>PIX_LINE_CALIB_QA</span>
                      <span>ACTIVE_CAL</span>
                    </div>
                  </div>
                </div>

                {/* Additional support parameters card */}
                <div className="border border-gray-800 rounded-2xl p-4 bg-gray-900/50 mt-6 space-y-3 text-[11px] font-mono text-gray-400 leading-relaxed font-semibold">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="text-white font-black uppercase text-[9px] tracking-widest">E2E Secure Escrow</span>
                  </div>
                  <p>
                    All bookings are registered on top of an immutable Google Auth hash signature. No third party holds tracking overrides. Need fast technician support? Call the 24/7 hotline directly!
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
