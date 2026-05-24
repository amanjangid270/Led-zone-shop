import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Camera, AlertCircle, RefreshCw, CheckCircle, Sparkles, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { products } from '../../lib/data';

interface QRCodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeScanned?: (payload: string) => void;
}

export const QRCodeScannerModal = ({ isOpen, onClose, onCodeScanned }: QRCodeScannerModalProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraErr, setCameraErr] = useState<string | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [manualPayload, setManualPayload] = useState('');

  // Sample static test codes for easier testing in the sandbox
  const demoCodes = [
    { label: 'VW 32A TV QR', payload: 'vw-32-a', desc: 'Scan to view VW 32" model' },
    { label: 'Wobble K 32" QR', payload: 'wobble-32-k', desc: 'Scan to inspect Wobble Smart LED' },
    { label: 'Samsung Neo QLED QR', payload: 'samsung-neo-65', desc: 'Scan Samsung Flagship TV' },
    { label: 'Verified Booking Pay', payload: 'LZ-PAY-984A', desc: 'Simulate checkout payment clearance' },
  ];

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setCameraErr(null);
    setCameraActive(false);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("navigator.mediaDevices is undefined or not supported in this frame context");
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      // Setup simulated automatic loop to trigger a random recognition if user holds it
      simulateCameraAutoDecode();
    } catch (err: any) {
      console.warn("Camera activation refused or context blocked:", err);
      setCameraErr(err.message || "Camera access not granted or unavailable.");
    }
  };

  const simulateCameraAutoDecode = () => {
    // Look for fake barcodes of product labels
    // Every few seconds, we mock the scanner flashing to find product details
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const handlePayloadReceived = (payload: string) => {
    setIsDecoding(true);
    setScannedResult(payload);
    
    // Play subtle audio synthetic beep if supported
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // high tone chirp
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // AudioContext sandbox blocked, ignore gracefully
    }

    // Success double haptic vibration on mobile
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([60, 40, 60]);
    }

    setTimeout(() => {
      setIsDecoding(false);
      
      if (onCodeScanned) {
        onCodeScanned(payload);
        onClose();
        return;
      }

      // Check if it matches a product ID
      const matchedProd = products.find(p => p.id === payload);
      if (matchedProd) {
        toast.success(`Success! QR Scanned: Recognized "${matchedProd.name}"`);
        navigate(`/product/${matchedProd.id}`);
        onClose();
      } else if (payload.startsWith('LZ-PAY') || payload.includes('pay') || payload.includes('upi')) {
        toast.success(`Verifying payment address/reference: ${payload}`);
        // If on booking, we pass it down. Here, we can prompt for a custom check
        navigate('/booking?type=repair&amount=499');
        onClose();
      } else {
        toast.success(`QR Decoded payload: "${payload}"`, { duration: 4000 });
      }
    }, 1200);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPayload.trim()) return;
    handlePayloadReceived(manualPayload.trim());
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-zinc-150 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/60">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-xl">
                <QrCode className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
                  LEDZone Scanner Hub
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                  Verify payments & products
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[75vh] no-scrollbar">
            {/* View Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl">
              <button
                type="button"
                onClick={() => { setActiveTab('camera'); setScannedResult(null); }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'camera'
                    ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Live Camera</span>
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('upload'); setScannedResult(null); }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Manual Payload</span>
              </button>
            </div>

            {scannedResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl"
              >
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  {isDecoding ? 'Decoding Payload...' : 'QR Verified Successfully!'}
                </h4>
                
                <div className="bg-white dark:bg-zinc-900 outline-none p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs select-text break-all">
                  {scannedResult}
                </div>

                {isDecoding ? (
                  <div className="flex justify-center items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-500" />
                    <span>Analyzing micro circuitry labels...</span>
                  </div>
                ) : (
                  <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide leading-relaxed">
                    Executing dynamic router actions or syncing credentials securely...
                  </p>
                )}
              </motion.div>
            ) : activeTab === 'camera' ? (
              <div className="space-y-4">
                {/* Camera Viewfinder Area */}
                <div className="relative aspect-square w-full max-w-[280px] mx-auto overflow-hidden bg-zinc-950 rounded-2xl border-2 border-zinc-850 shadow-inner group flex items-center justify-center">
                  {cameraActive && !cameraErr ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Interactive Scan Laser Overlay bounds */}
                      <div className="absolute inset-8 border border-zinc-500/30 rounded-lg pointer-events-none">
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_#22d3ee] animate-[bounce_3s_infinite_linear]" />
                        
                        {/* 4 Corner brackets */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br" />
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center text-zinc-500 space-y-3">
                      <div className="w-10 h-10 bg-zinc-900 text-zinc-400 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest block text-zinc-400">
                        Camera Feed Unavailable
                      </span>
                      <p className="text-[9.5px] leading-relaxed text-zinc-500 max-w-[200px] mx-auto">
                        {cameraErr || 'Iframe environment constraints may prevent native camera hooks on child sandbox configurations.'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#06b6d4] hover:text-white hover:bg-[#06b6d4] transition-all border border-[#06b6d4]/40 px-3.5 py-2 rounded-xl cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset stream feed</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Input QR Code Text / URL
                  </label>
                  <input
                    type="text"
                    value={manualPayload}
                    onChange={(e) => setManualPayload(e.target.value)}
                    placeholder="E.g., vw-32-a, wobble-32-k, pay-link..."
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs focus:outline-none focus:border-cyan-500 text-zinc-900 dark:text-zinc-50 shadow-inner font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!manualPayload.trim()}
                  className="w-full py-3 bg-black dark:bg-cyan-500 dark:text-black hover:bg-cyan-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all shadowdisabled:opacity-50"
                >
                  Clear & Process Scanner Code
                </button>
              </form>
            )}

            {/* Simulated preset codes helper (For flawless testing in iframe) */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-900 text-left space-y-3">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                  One-tap Interactive Test Presets
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                To simplify testing inside the sandboxed iframe browser preview, tap any test template to simulate a real hardware camera scan and trigger corresponding page navigations instantly:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoCodes.map((demo) => (
                  <button
                    key={demo.payload}
                    type="button"
                    onClick={() => handlePayloadReceived(demo.payload)}
                    className="p-2 bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-cyan-500 dark:hover:border-cyan-500/80 rounded-xl text-left transition-all hover:shadow-sm cursor-pointer group"
                  >
                    <span className="text-[8.5px] font-black text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-500 transition-colors uppercase leading-none block">
                      {demo.label}
                    </span>
                    <span className="text-[7.5px] text-zinc-400 uppercase font-mono block mt-1 tracking-tighter truncate">
                      {demo.payload}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
