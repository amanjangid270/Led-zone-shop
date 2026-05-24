import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, Landmark, Smartphone, Zap, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const PaymentGuideModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const upiId = '8923184735@jio';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const STEPS = [
    {
      num: "01",
      title: "Scan Official QR",
      description: "Open any UPI apps (PhonePe, Google Pay, Paytm, BHIM) and scan our authentic secure operational merchant QR code display.",
      icon: <QrCode className="w-5 h-5 text-cyan-500" />
    },
    {
      num: "02",
      title: "Enter Exact Amount",
      description: "Key in the exact price matching your diagnosed repair quote or selected LED display unit cost to ensure immediate processing node clearances.",
      icon: <Landmark className="w-5 h-5 text-cyan-500" />
    },
    {
      num: "03",
      title: "Input Transaction Ref ID",
      description: "Submit the generated UPI Transaction ID in our checkout form. Our automated systems securely index it with Firebase within 60 seconds.",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100"
        >
          {/* Top Banner Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 animate-shimmer" />

          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-zinc-50/50 mt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-sm border border-cyan-100/30">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 leading-none">QR Payment Guide</h2>
                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Unified UPI E2E Ledger Systems</p>
              </div>
            </div>

            <button
              id="close-payment-guide-btn"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200/80 rounded-full hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <X className="w-4.5 h-4.5 text-zinc-650" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-8 max-h-[calc(90vh-140px)]">
            
            {/* Visual Vector QR representation & How it works */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-zinc-950 p-6 rounded-2xl text-white shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-indigo-500/5 pointer-events-none" />
              
              {/* Left Column: Smart Instruction */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-cyan-400">INSTANT ENCRYPTED PAYMENTS</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">How our QR Gateway operates</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  To eliminate transactional overhead, LEDZone uses direct secure decentralized merchant UPI routing. This allows us to process instant diagnostics and shipping confirmations without handling fee premiums.
                </p>
                <div className="space-y-2 text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span><strong>100% Secure:</strong> Logged within safe Firestore records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span><strong>Zero Fees:</strong> Standard direct bank-to-bank ledger settlement</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Real UPI QR Code & Copy Interface */}
              <div className="md:col-span-12 lg:col-span-5 flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="text-center mb-3">
                  <span className="text-[9px] font-mono font-black text-black bg-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider">OFFICIAL MERCHANT QR</span>
                </div>
                
                <div className="relative w-44 h-44 flex items-center justify-center border-2 border-cyan-500 rounded-xl bg-white p-2.5 shadow-md">
                  {/* Outer laser line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#06b6d4] animate-bounce opacity-60" />
                  
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('upi://pay?pa=8923184735@jio&pn=LEDZone&cu=INR')}`} 
                    alt="Official LEDZone UPI QR Code" 
                    className="w-full h-full object-contain pointer-events-none rounded"
                  />
                </div>

                <div className="mt-4 w-full text-center space-y-2">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">UPI Address ID</div>
                  <div className="flex items-center justify-between gap-2 bg-zinc-50 border border-zinc-200/80 rounded-xl p-2.5 max-w-xs mx-auto">
                    <span className="text-xs font-mono font-black text-zinc-950 select-all">{upiId}</span>
                    <button
                      id="copy-upi-btn"
                      onClick={handleCopy}
                      className="p-1 px-2.5 bg-zinc-900 text-white hover:bg-[#06b6d4] hover:text-black rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Steps */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#06b6d4]">Standard Workflow Journey</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {STEPS.map((step) => (
                  <div key={step.num} className="bg-zinc-50/75 hover:bg-zinc-50 p-5 rounded-2xl border border-gray-100 hover:border-cyan-100 transition-all flex flex-col justify-between space-y-4 relative group">
                    <div className="absolute top-4 right-4 text-xs font-mono font-black text-gray-200 group-hover:text-cyan-200 transition-colors">
                      {step.num}
                    </div>
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-100/80 flex items-center justify-center shadow-xs mb-3">
                        {step.icon}
                      </div>
                      <h5 className="text-xs font-black text-zinc-900 uppercase tracking-tight mb-1">{step.title}</h5>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Modes (How it works section) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              {/* Marketplace Mode */}
              <div className="space-y-3 bg-cyan-50/15 p-5 rounded-2xl border border-cyan-500/10">
                <div className="inline-flex items-center gap-1.5 text-cyan-600">
                  <Smartphone className="w-4.5 h-4.5" />
                  <span className="text-xs font-black uppercase tracking-wider">01. For Marketplace Displays</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                  Select your desired flagship smart display under <strong>New LED Collection</strong>. Submit your delivery details, scan the QR code to clear the listed wholesale price, paste the receipt ref hash, and your tracking code registers instantly.
                </p>
              </div>

              {/* Repair Diagnostics Mode */}
              <div className="space-y-3 bg-indigo-50/15 p-5 rounded-2xl border border-indigo-500/10">
                <div className="inline-flex items-center gap-1.5 text-indigo-600">
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span className="text-xs font-black uppercase tracking-wider">02. For Diagnostic Repair Bookings</span>
                </div>
                <p className="text-[11px] text-zinc-650 leading-relaxed font-medium">
                  Log your panel problem and select your specific device brand. A core ₹499 base booking diagnostic token is processed. Scan the UPI QR, declare the txn reference, and your active status moves to <strong>pending</strong> awaiting panel service.
                </p>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100 mt-2">
              <HelpCircle className="w-5 h-5 text-zinc-400 shrink-0" />
              <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                Need immediate manual confirmation? Send your generated Transaction ID or screenshot directly to our active support WhatsApp at <strong>+91 90841 84735</strong> for priority processing clearances.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
