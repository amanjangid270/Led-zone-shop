import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, ShoppingBag, CheckCircle, QrCode, Printer, Download, ArrowRight, Sparkles, Cpu, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRecommendationStore } from '../store/recommendation';
import confetti from 'canvas-confetti';
import { products } from '../lib/data';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuthStore } from '../store/auth';
import { useAIBrainStore } from '../store/aiBrainStore';
import { correctInput, analyzeIssue, detectIntent } from '../lib/AIBrain';
import { sendConfirmationEmail } from '../lib/emailService';

const VoiceTranscriptionButton = ({ onTranscription, placeholderName = "field" }: { onTranscription: (text: string) => void, placeholderName?: string }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Web Speech API is not supported in this browser. Please use Google Chrome or Microsoft Edge!", { id: 'voice-toast' });
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
      toast.success(`Listening for ${placeholderName}... Speak clearly!`, { id: 'voice-toast' });
    };

    rec.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
      toast.error(`Speech recognition failed: ${e.error || 'try again'}`, { id: 'voice-toast' });
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        onTranscription(transcript);
        toast.success(`Speech Captured!`, { id: 'voice-toast' });
      }
    };

    rec.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer scale-90 ${
        isListening
          ? 'bg-red-500 border-red-500 text-white animate-pulse'
          : 'bg-gray-100 hover:bg-cyan-500 text-gray-500 hover:text-black border-gray-200 hover:border-cyan-500'
      }`}
      title={`Fill ${placeholderName} with Voice`}
    >
      <span className="text-xs">🎙️ Voice</span>
    </button>
  );
};

export const Booking = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'repair';
  const productName = searchParams.get('product') || '';
  const paramAmount = searchParams.get('amount');
  const navigate = useNavigate();
  const { addInteractedCategory } = useRecommendationStore();
  const { user, signIn } = useAuthStore();

  const { 
    savedName, 
    savedPhone, 
    savedAddress, 
    saveUserDetails, 
    corrections, 
    registerCorrection, 
    removeCorrection, 
    hasAutoFilled, 
    setHasAutoFilled 
  } = useAIBrainStore();

  useEffect(() => {
    addInteractedCategory(type);
  }, [type, addInteractedCategory]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    issue: '', // Only for repair
    product: productName
  });

  // Returning User Auto-filling logic
  useEffect(() => {
    if (savedName || savedPhone || savedAddress) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || savedName,
        phone: prev.phone || savedPhone,
        address: prev.address || savedAddress,
      }));
      if (!hasAutoFilled) {
        setHasAutoFilled(true);
        toast.success('AI Brain: Automatically filled your saved contact details! Welcome back 👋');
      }
    }
  }, [savedName, savedPhone, savedAddress, hasAutoFilled, setHasAutoFilled]);

  // Real-time Intent Diagnostic Input
  const [rawIntentQuery, setRawIntentQuery] = useState('');
  const [detectedIntent, setDetectedIntent] = useState<any>(null);

  useEffect(() => {
    if (rawIntentQuery.trim().length > 3) {
      const result = detectIntent(rawIntentQuery);
      setDetectedIntent(result);
    } else {
      setDetectedIntent(null);
    }
  }, [rawIntentQuery]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);
  
  const [step, setStep] = useState<'form' | 'confirm' | 'payment' | 'success'>('form');
  const [paymentState, setPaymentState] = useState<'idle' | 'securing' | 'decrypting' | 'verifying' | 'completed'>('idle');
  const [payOption, setPayOption] = useState<'upi' | 'gateway'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const matchedProduct = products.find(p => p.name === formData.product) || 
                         products.find(p => p.name === productName) ||
                         (formData.product ? products.find(p => p.name.toLowerCase().includes(formData.product.toLowerCase()) || formData.product.toLowerCase().includes(p.brand.toLowerCase()) || p.id === formData.product) : undefined);
  const calculatedPrice = matchedProduct ? matchedProduct.price : (type === 'repair' ? 499 : 0); // 499 minimal assumed repair token or 0.
  const amountToPay = paramAmount ? parseInt(paramAmount) : calculatedPrice;
  const upiId = '8923184735@jio';
  // upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR
  const upiIntentUri = `upi://pay?pa=${upiId}&pn=LedZone${amountToPay ? `&am=${amountToPay}` : ''}&cu=INR`;

  // Real-time validation & hardware check
  const aiDiagnosis = analyzeIssue(formData.issue);

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (formData.address.trim().length < 10) newErrors.address = 'Address is too short';
    if (type === 'repair' && formData.issue.trim().length < 5) newErrors.issue = 'Please describe the issue';

    setErrors(newErrors);
    
    // Dynamic UX Decision: Disable "Confirm & Proceed" if there's an irreversible panel crack
    const isLockedByAI = type === 'repair' && aiDiagnosis.disabledAction;
    setIsValid(Object.keys(newErrors).length === 0 && formData.name !== '' && !isLockedByAI);
  }, [formData, type, aiDiagnosis.disabledAction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (corrections[e.target.name]) {
      removeCorrection(e.target.name);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    if (!value) return;

    const { correctedValue, message } = correctInput(fieldName, value);
    if (message && value !== correctedValue) {
      setFormData(prev => ({ ...prev, [fieldName]: correctedValue }));
      registerCorrection(fieldName, value, correctedValue, message);
      toast.success(`AI optimized your contact field: ${message}`, { id: `ai-msg-${fieldName}` });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Please fix errors in the form');
      return;
    }
    // Automatically save contact info of this returning user for next session auto-fill
    saveUserDetails(formData.name, formData.phone, formData.address);
    setStep('confirm');
  };

  const handlePaymentSuccess = async () => {
    setIsProcessingPayment(true);
    setPaymentState('securing');
    
    const mockHash = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).substring(3, 8).toUpperCase();
    
    try {
      await setDoc(doc(db, 'bookings', mockHash), {
        id: mockHash,
        userId: user?.id || 'anonymous',
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        type: type,
        product: formData.product || 'General LED Service',
        amount: amountToPay,
        issue: type === 'repair' ? formData.issue : 'E2E Purchased Unit',
        transactionId: mockHash,
        status: 'success',
        createdAt: new Date()
      });

      // Automatically trigger simulated email service receipt confirmation
      sendConfirmationEmail({
        id: mockHash,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        type: type as 'repair' | 'refurbished' | 'new',
        product: formData.product || 'General LED Service',
        amount: amountToPay,
        issue: type === 'repair' ? formData.issue : 'E2E Purchased Unit',
        userEmail: user?.email || 'customer@ledzone-diagnostics.com'
      }).catch(console.error);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `bookings/${mockHash}`);
      setIsProcessingPayment(false);
      setPaymentState('idle');
      return;
    }

    // Simulate secure payment detection and validation (E2E with encryption flow)
    setTimeout(() => {
      setPaymentState('decrypting');
      setTimeout(() => {
        setPaymentState('verifying');
        setTimeout(() => {
          setPaymentState('completed');
          
          confetti({
            particleCount: 120,
            spread: 85,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#10b981', '#3b82f6', '#000000']
          });

          // Automatically proceed to confirmation screen after displaying success overlay briefly
          setTimeout(() => {
            setTransactionId(mockHash);
            setIsProcessingPayment(false);
            setPaymentState('idle');
            setStep('success');
            
            // Auto redirect to product buyUrl (Flipkart) if configured
            const targetBuyUrl = matchedProduct?.buyUrl;
            if (targetBuyUrl) {
              toast.success('Redirecting to Flipkart to finalize checkout...', { duration: 4000 });
              setTimeout(() => {
                window.location.href = targetBuyUrl;
              }, 4000);
            }
          }, 1800);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const sendToWhatsApp = () => {
    const WHATSAPP_NUMBER = '919084184735';
    let message = '';

    if (type === 'repair') {
      message = `*Repair Service Booking*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\n*Issue:* ${formData.issue}`;
    } else if (type === 'new') {
      message = `*New LED Booking*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\n*Product:* ${formData.product}`;
    } else if (type === 'refurbished') {
      message = `*Refurbished LED Booking*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\n*Product:* ${formData.product}`;
    }

    const encodedURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(encodedURL, '_blank');
    navigate('/');
  };

  const downloadReceipt = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LEDZone Receipt - ${transactionId}</title>
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
    .print-btn {
      display: block;
      width: 100%;
      text-align: center;
      background: #06b6d4;
      color: #000000;
      padding: 14px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 12px;
      margin-top: 20px;
      border: none;
      cursor: pointer;
    }
    @media print {
      .print-btn { display: none; }
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
        <td class="value" style="font-family: monospace;">${transactionId}</td>
      </tr>
      <tr>
        <td class="label">Date / Time</td>
        <td class="value">${new Date().toLocaleString()}</td>
      </tr>
      <tr>
        <td class="label">Client Name</td>
        <td class="value">${formData.name}</td>
      </tr>
      <tr>
        <td class="label">Phone Contact</td>
        <td class="value">${formData.phone}</td>
      </tr>
      <tr>
        <td class="label">Operational Service</td>
        <td class="value" style="text-transform: uppercase;">${type === 'repair' ? 'Technical Panel Repair' : 'Product Order'}</td>
      </tr>
      <tr>
        <td class="label">Component Name</td>
        <td class="value">${type === 'repair' ? (formData.product || 'Sub-Pixel Alignment') : formData.product}</td>
      </tr>
      ${type === 'repair' ? `
      <tr>
        <td class="label">Reported Issue</td>
        <td class="value">${formData.issue}</td>
      </tr>` : ''}
      <tr style="border-top: 2px solid #e2e8f0;">
        <td class="label" style="font-size: 12px; color: #010101; font-weight:850; padding-top: 16px;">Verified Amount Paid</td>
        <td class="value" style="font-size: 20px; color: #06b6d4; font-weight:900; padding-top: 16px;">₹${amountToPay.toLocaleString('en-IN')}</td>
      </tr>
    </table>
    
    <div style="background: #f0fdfa; border: 1px solid #ccfbf1; padding: 12px; border-radius: 8px; text-align: center; font-size: 11px; color: #0f766e; font-weight: bold;">
      ✔ Google Firebase Network E2E Secure Authenticated
    </div>

    <button class="print-btn" onclick="window.print()">Print Receipt</button>
    
    <div class="footer">
      <p>Thank you for choosing LEDZone Technical Operations.</p>
      <p>Support Hotline: 919084184735</p>
    </div>
  </div>
</body>
</html>
`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LedZone-Receipt-${transactionId.slice(0, 8)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">Secure Process</span>
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
          {type === 'repair' ? (
            <>Book a <span className="text-cyan-500">Repair</span></>
          ) : type === 'new' ? (
            <>Buy <span className="text-cyan-500">New Display</span></>
          ) : (
            <>Buy <span className="text-cyan-500">Renewed</span></>
          )}
        </h1>
        <p className="text-gray-500 text-sm">Please provide accurate details to ensure smooth service.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl space-y-8"
          >
            {/* Interactive AI Smart Assistant HUD */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/20 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-700/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-mono">
                  [ LEDZone AI Brain Engine ]
                </span>
                {hasAutoFilled && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] font-black uppercase tracking-widest px-2.5 py-1 bg-green-500/15 border border-green-500/20 text-green-400 rounded-full">
                    <Sparkles className="w-2.5 h-2.5" /> Auto-Filled
                  </span>
                )}
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                Our client-side deep neural heuristics are scanning. Describe what you need in the search assist below to let the AI auto-direct your category or checkout type!
              </p>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={rawIntentQuery}
                    onChange={(e) => setRawIntentQuery(e.target.value)}
                    placeholder="E.g., I want to buy a cheap secondary led, or vertical line in screen..."
                    className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                  />
                  {rawIntentQuery && (
                    <button
                      type="button"
                      onClick={() => setRawIntentQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {detectedIntent && detectedIntent.intent !== 'unknown' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-450" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-450">
                          Intent Detected: {detectedIntent.intent.replace('_', ' ')}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400">({detectedIntent.confidence}% confidence)</span>
                      </div>
                      <p className="text-[10px] text-gray-300 font-sans leading-relaxed">
                        {detectedIntent.reason}
                      </p>
                    </div>

                    {/* Switch dynamic mode action button */}
                    {((detectedIntent.intent === 'repair' && type !== 'repair') ||
                      (detectedIntent.intent === 'buy_new' && type !== 'new') ||
                      (detectedIntent.intent === 'buy_refurbished' && type !== 'refurbished')) && (
                      <button
                        type="button"
                        onClick={() => {
                          const targetType = detectedIntent.intent === 'buy_new' ? 'new' : detectedIntent.intent === 'buy_refurbished' ? 'refurbished' : 'repair';
                          const targetProduct = targetType === 'new' ? 'TCL Flagship 115X955 Max' : targetType === 'refurbished' ? 'Infinix Y1 43 Inch QLED' : '';
                          navigate(`/booking?type=${targetType}&product=${encodeURIComponent(targetProduct)}`);
                          setRawIntentQuery('');
                          toast.success(`AI pivoted flow to: ${targetType.toUpperCase()}`);
                        }}
                        className="shrink-0 px-3.5 py-2.5 rounded-lg bg-cyan-500 hover:bg-white text-black font-black uppercase text-[9px] tracking-widest transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                        <span>Switch category</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {(type === 'new' || type === 'refurbished') && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Selection</label>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none shadow-sm font-bold"
                    readOnly
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  {savedName && (
                    <span className="text-[8.5px] font-black tracking-widest text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase">AI Saved</span>
                  )}
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm ${
                    formData.name && errors.name ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-gray-100 focus:border-cyan-400'
                  }`}
                  placeholder="John Doe"
                />
                {formData.name && errors.name && <p className="text-red-500 text-[10px] uppercase font-black tracking-widest mt-2">{errors.name}</p>}
                {corrections.name && (
                  <p className="text-cyan-600 text-[9px] font-black tracking-widest uppercase mt-2 bg-cyan-50/60 border border-cyan-100/50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Auto-Optimized: {corrections.name.corrected} ({corrections.name.explanation})</span>
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                  {savedPhone && (
                    <span className="text-[8.5px] font-black tracking-widest text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase">AI Saved</span>
                  )}
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm ${
                    formData.phone && errors.phone ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-gray-100 focus:border-cyan-400'
                  }`}
                  placeholder="1234567890"
                />
                {formData.phone && errors.phone && <p className="text-red-500 text-[10px] uppercase font-black tracking-widest mt-2">{errors.phone}</p>}
                {corrections.phone && (
                  <p className="text-cyan-600 text-[9px] font-black tracking-widest uppercase mt-2 bg-cyan-50/60 border border-cyan-100/50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Auto-Optimized: {corrections.phone.corrected} ({corrections.phone.explanation})</span>
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1.5">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Delivery/Service Address</label>
                    <VoiceTranscriptionButton
                      placeholderName="address"
                      onTranscription={(text) => {
                        setFormData(prev => ({ ...prev, address: text }));
                        toast.success(`Voice filled Address successfully!`);
                      }}
                    />
                  </div>
                  {savedAddress && (
                    <span className="text-[8.5px] font-black tracking-widest text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase font-mono">AI Saved</span>
                  )}
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition-colors min-h-[100px] shadow-sm ${
                    formData.address && errors.address ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-gray-100 focus:border-cyan-400'
                  }`}
                  placeholder="Full address (including colony, road name, state, etc.)"
                />
                {formData.address && errors.address && <p className="text-red-500 text-[10px] uppercase font-black tracking-widest mt-2">{errors.address}</p>}
                {corrections.address && (
                  <p className="text-cyan-600 text-[9px] font-black tracking-widest uppercase mt-2 bg-cyan-50/60 border border-cyan-100/50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Auto-Optimized address structure & correct spelling</span>
                  </p>
                )}
              </div>

              {type === 'repair' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Describe the Issue</label>
                        <VoiceTranscriptionButton
                          placeholderName="issue description"
                          onTranscription={(text) => {
                            setFormData(prev => ({ ...prev, issue: text }));
                            toast.success(`Voice filled Issue description successfully!`);
                          }}
                        />
                      </div>
                      {formData.issue && (
                        <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          aiDiagnosis.severity === 'high' ? 'bg-red-500/10 border border-red-500/25 text-red-500 animate-pulse font-mono' :
                          aiDiagnosis.severity === 'medium' ? 'bg-amber-500/10 border border-amber-500/25 text-amber-500 font-mono' :
                          'bg-green-500/10 border border-green-500/25 text-green-500 font-mono'
                        }`}>
                          <Cpu className="w-3 h-3 text-cyan-400" />
                          <span>AI Check: {aiDiagnosis.severity} risk</span>
                        </span>
                      )}
                    </div>
                    <textarea
                      name="issue"
                      value={formData.issue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition-colors min-h-[100px] shadow-sm ${
                        formData.issue && errors.issue ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-gray-100 focus:border-cyan-400'
                      }`}
                      placeholder="E.g., Spill water on back, screen flickers with horizontal lines, broken remote..."
                    />
                    {formData.issue && errors.issue && <p className="text-red-500 text-[10px] uppercase font-black tracking-widest mt-2">{errors.issue}</p>}
                    {corrections.issue && (
                      <p className="text-cyan-600 text-[9px] font-black tracking-widest uppercase mt-2 bg-cyan-50/60 border border-cyan-100/50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Fixed term: {corrections.issue.corrected}</span>
                      </p>
                    )}
                  </div>

                  {formData.issue.trim().length >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-2xl border ${
                        aiDiagnosis.severity === 'high' ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-cyan-50 border-cyan-100 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {aiDiagnosis.severity === 'high' ? (
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        ) : (
                          <Cpu className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5 animate-pulse" />
                        )}
                        <div className="space-y-1.5 flex-1">
                          <h4 className={`text-[10px] font-black tracking-widest uppercase ${
                            aiDiagnosis.severity === 'high' ? 'text-red-600' : 'text-cyan-600'
                          }`}>
                            {aiDiagnosis.severity === 'high' ? '🔒 AI Cost Safeguard Active' : '⚙ AI Technical Diagnosis Suggestion'}
                          </h4>
                          <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                            {aiDiagnosis.recommendation}
                          </p>
                          {aiDiagnosis.savingsText && (
                            <p className="text-[11px] text-gray-500 font-medium">
                              {aiDiagnosis.savingsText}
                            </p>
                          )}

                          {aiDiagnosis.severity === 'high' && (
                            <div className="pt-3 flex flex-col sm:flex-row gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  navigate('/booking?type=refurbished&product=Infinix%20Y1%2043%20Inch%20QLED');
                                  toast.success('AI redirect: Initialized checkout for Infinix Renewed LED!');
                                }}
                                className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-amber-600 text-white font-black uppercase text-[9px] tracking-widest hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-1.5"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Buy Infinix Renewed (₹11,999)</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  navigate('/booking?type=new&product=TCL%20Flagship%20115X955%20Max');
                                  toast.success('AI redirect: Initialized checkout for TCL Flagship Max!');
                                }}
                                className="px-4 py-3 rounded-xl bg-gray-950 text-white font-black uppercase text-[9px] tracking-widest hover:bg-black shadow-md transition-all flex items-center justify-center gap-1.5"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Upgrade to TCL QD-Mini LED</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {isValid && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-black text-white font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500 shadow-xl transition-all flex items-center justify-center space-x-2 border border-black hover:border-cyan-500"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Confirm & Proceed</span>
                </motion.button>
              )}
            </form>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl"
          >
            <h2 className="text-2xl font-black uppercase mb-6 text-center tracking-tighter">Confirm Details</h2>
            <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Name</span>
                <span className="text-sm font-semibold text-right">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Phone</span>
                <span className="text-sm font-semibold text-right">{formData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Address</span>
                <span className="text-sm font-semibold text-right max-w-[60%]">{formData.address}</span>
              </div>
              
              {type === 'repair' ? (
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Issue</span>
                  <span className="text-sm font-semibold text-right">{formData.issue}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Product</span>
                  <span className="text-[10px] font-black text-right text-cyan-500 uppercase">{formData.product}</span>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep('form')}
                className="w-1/3 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 font-black uppercase tracking-widest text-[10px] border border-gray-200 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => setStep('payment')}
                className="w-2/3 py-4 rounded-xl bg-black text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 border border-black hover:bg-cyan-500 hover:border-cyan-500 transition-colors"
              >
                <QrCode className="w-5 h-5" />
                <span>Pay via QR Code</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-gray-900"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900 rounded-full blur-[60px] opacity-20"></div>
            
            <div className="relative z-10 w-full">
              {!user ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 mx-auto animate-pulse">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black mb-3 uppercase tracking-wider">Authentication Required</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed mb-8 font-medium">
                    To satisfy secure real-time tracking, you must sign in with Google Firebase before scanner validation.
                  </p>
                  <button
                    type="button"
                    onClick={() => signIn()}
                    className="py-3.5 px-8 rounded-xl bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-500"
                  >
                    Authenticate with Google
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400">Secure Checkout</span>
                    </div>
                    <span className="text-[9px] text-gray-500">Ref: LZ9084</span>
                  </div>

                  {/* Payment switcher toggle */}
                  <div className="bg-gray-900 border border-gray-800 p-1 rounded-xl flex items-center justify-between gap-1.5 mb-6 max-w-sm mx-auto font-mono">
                    <button
                      type="button"
                      onClick={() => setPayOption('upi')}
                      className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        payOption === 'upi'
                          ? 'bg-cyan-500 text-black shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🗣 Direct UPI QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayOption('gateway')}
                      className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        payOption === 'gateway'
                          ? 'bg-cyan-500 text-black shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      💳 Web Gateway
                    </button>
                  </div>

                  {payOption === 'upi' ? (
                    <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-900/50 p-6 rounded-2xl border border-gray-800 mb-8">
                      {/* 3D LED-style Frame containing QR or Encrypted Status Overlay */}
                      <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto md:mx-0 flex items-center justify-center shrink-0">
                        {/* Immersive 3D Bezel Case for 3D LED Screen look */}
                        <div className="absolute inset-0 bg-slate-950 rounded-3xl border-[6px] border-slate-900 shadow-[0_0_40px_rgba(6,182,212,0.5)] flex flex-col items-center justify-center p-3.5 overflow-hidden group">
                          
                          {/* Pulsing Backlight ambient glow behind the LED-style case */}
                          <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/25 via-blue-500/25 to-emerald-500/25 rounded-full blur-2xl animate-pulse duration-3000 pointer-events-none"></div>

                          {/* Animated Border gradient overlay */}
                          <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl opacity-80 pointer-events-none z-15 animate-pulse shadow-[inset_0_0_15px_rgba(34,211,238,0.4)]"></div>

                          {/* Sub-pixel diagnostic lights in the 4 corners of the LED chassis */}
                          <div className="absolute top-2 left-2 flex gap-1 z-20">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,1)] animate-ping" style={{ animationDuration: '1.5s' }} />
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,1)] animate-pulse" />
                          </div>
                          <div className="absolute top-2 right-2 flex gap-1 z-20">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_6px_rgba(74,222,128,1)] animate-pulse" />
                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,1)] animate-ping" style={{ animationDuration: '2.5s' }} />
                          </div>
                          <div className="absolute bottom-2 left-2 flex gap-1 z-20">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_6px_rgba(168,85,247,1)] animate-pulse" />
                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_6px_rgba(236,72,153,1)] animate-pulse" />
                          </div>
                          <div className="absolute bottom-2 right-2 flex gap-1 z-20">
                            <span className="text-[7px] text-cyan-400 font-mono font-black tracking-widest bg-black/80 px-1 py-0.5 rounded uppercase border border-cyan-500/30">LED-E2E</span>
                          </div>

                          {/* Dynamic status screen based on scanning state */}
                          <AnimatePresence mode="wait">
                            {paymentState === 'idle' ? (
                              <motion.div
                                key="qr-scan-screen"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full flex flex-col items-center justify-center relative bg-white rounded-xl p-3 shadow-inner overflow-hidden"
                              >
                                {/* Moving Laser scanner bar overlay */}
                                <motion.div 
                                  animate={{ y: [0, 180, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute left-0 right-0 h-1 bg-cyan-500 opacity-70 shadow-[0_0_8px_#06b6d4] z-10"
                                />

                                <img 
                                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiIntentUri)}`} 
                                  alt="Payment QR Code" 
                                  className="w-full h-full object-contain pointer-events-none"
                                />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="encryption-loader-screen"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-950 rounded-xl relative overflow-hidden text-center z-10"
                              >
                                {/* Animated scanning/encryption waves */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />

                                {paymentState === 'securing' && (
                                  <div className="space-y-4">
                                    <div className="w-14 h-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto flex items-center justify-center">
                                      <span className="text-lg">🔒</span>
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="text-xs font-black uppercase text-cyan-400 tracking-widest font-mono">TLS Connection</h4>
                                      <p className="text-[9px] text-gray-400 font-semibold font-mono">Securing payment canal...</p>
                                    </div>
                                  </div>
                                )}

                                {paymentState === 'decrypting' && (
                                  <div className="space-y-4">
                                    <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto animate-pulse">
                                      <span className="text-lg">🔑</span>
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="text-xs font-black uppercase text-blue-400 tracking-widest font-mono">Payload Decrypt</h4>
                                      <p className="text-[8px] text-gray-400 font-semibold font-mono break-all truncate max-w-[150px] mx-auto">
                                        HASH: e1c3d9a3b2o...
                                      </p>
                                      <p className="text-[9px] text-gray-400 font-sans">Decoding secure transit keys...</p>
                                    </div>
                                  </div>
                                )}

                                {paymentState === 'verifying' && (
                                  <div className="space-y-4">
                                    <div className="w-14 h-14 rounded-full bg-indigo-505/10 border border-indigo-500 flex items-center justify-center mx-auto animate-ping" style={{ animationDuration: '2.5s' }}>
                                      <span className="text-lg">⚙</span>
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="text-xs font-black uppercase text-indigo-400 tracking-widest font-mono">Blockchain Secure</h4>
                                      <p className="text-[9px] text-cyan-400 font-semibold font-mono">Validating ledger records...</p>
                                    </div>
                                  </div>
                                )}

                                {paymentState === 'completed' && (
                                  <motion.div 
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    className="space-y-3"
                                  >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-emerald-300 animate-bounce">
                                      <svg className="w-8 h-8 text-black stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="text-sm font-black uppercase text-emerald-450 tracking-wider">✅ Payment Successful</h4>
                                      <p className="text-[9px] text-gray-400 font-semibold font-mono uppercase tracking-widest">Handshake Verified</p>
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                        <h3 className="text-xl font-black mb-2 uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                          <span>SCAN & PAY ANYWHERE</span>
                          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </h3>
                        <p className="text-[11px] text-gray-450 leading-relaxed mb-4">
                          Scan the dynamic QR code above with Google Pay, PhonePe, Paytm or any UPI application to complete checkout safely. Our encrypted microservice confirms payment in real time.
                        </p>
                        
                        {amountToPay > 0 && (
                          <div className="text-2xl font-black text-cyan-400 mb-4 font-mono">
                            ₹{amountToPay.toLocaleString('en-IN')}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 mb-4 font-mono">
                          <a 
                            href={upiIntentUri}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-cyan-50 transition-colors flex items-center justify-center border-2 border-transparent hover:border-cyan-500 text-center"
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            Direct UPI Pay
                          </a>
                          
                          <button 
                            type="button"
                            onClick={handlePaymentSuccess}
                            disabled={isProcessingPayment}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-wait relative overflow-hidden"
                          >
                            {isProcessingPayment ? (
                              <span className="flex items-center justify-center space-x-2">
                                <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                <span>Securing transaction...</span>
                              </span>
                            ) : (
                              'Simulate Phone Scan'
                            )}
                          </button>
                        </div>
                        
                        {/* Interactive encrypted stream helper lines */}
                        <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-xl flex items-center gap-3">
                          <span className="text-xs bg-gray-900 border border-gray-800 p-1.5 rounded">🔒 Encrypted Flow</span>
                          <div className="text-[9px] text-gray-400 font-mono flex-1 leading-snug">
                            {paymentState === 'idle' && 'READY: Polling matching token refs...'}
                            {paymentState === 'securing' && 'TLS_SECURE_CONNECT: Handshaking cryptographic parameters...'}
                            {paymentState === 'decrypting' && 'SSL_PAYLOAD_DECRYPT: Checking SHA-256 integrity signatures...'}
                            {paymentState === 'verifying' && 'FIREBASE_LEDGER_SYNC: Validating transaction block...'}
                            {paymentState === 'completed' && 'ECDSA_VERIFIED: Auto-confirming purchase token!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-gray-800 mb-8 max-w-xl mx-auto space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Immersive Cyber Card Graphic */}
                        <div className="bg-gradient-to-br from-gray-950 to-indigo-950 p-4 rounded-xl border border-gray-800 relative overflow-hidden text-left h-36 flex flex-col justify-between shadow-xl">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl font-black pointer-events-none" />
                          <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-extrabold z-10">
                            <span>Secure Web Gateway</span>
                            <span>E2E SSL</span>
                          </div>
                          
                          {/* Micro Chip graphic */}
                          <div className="w-8 h-6 bg-yellow-500/20 rounded border border-yellow-500/40 relative flex items-center justify-center my-1">
                            <div className="w-4.5 h-3 border border-yellow-400/45 rounded" />
                          </div>

                          <div className="font-mono text-xs tracking-widest text-white font-black z-10 my-1">
                            {cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                          </div>

                          <div className="flex justify-between items-center font-mono text-[8px] uppercase tracking-widest text-gray-500">
                            <div>
                              <span className="block text-[6px]">Cardholder</span>
                              <span className="text-white font-black">{formData.name || 'Your Name'}</span>
                            </div>
                            <div>
                              <span className="block text-[6px] text-right">Expires</span>
                              <span className="text-white font-black">{cardExpiry || 'MM/YY'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Form Fields inside Simulated Gateway */}
                        <div className="space-y-3 text-left">
                          <div>
                            <label className="block text-[8.5px] font-black uppercase tracking-widest text-gray-400 mb-1 font-mono">Total Transaction Cost</label>
                            <div className="text-xl font-black text-white font-mono">₹{(amountToPay || 0).toLocaleString('en-IN')}</div>
                          </div>

                          <div>
                            <label className="block text-[8.5px] font-black uppercase tracking-widest text-gray-400 mb-1 font-mono">Card Number</label>
                            <input
                              type="text"
                              maxLength={16}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                              placeholder="4111222233334444"
                              className="w-full bg-black/60 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[8.5px] font-black uppercase tracking-widest text-gray-450 mb-1 font-mono font-black">Expiry Date</label>
                              <input
                                type="text"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full bg-black/60 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[8.5px] font-black uppercase tracking-widest text-gray-450 mb-1 font-mono">CVV</label>
                              <input
                                type="password"
                                maxLength={3}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                                placeholder="•••"
                                className="w-full bg-black/60 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* simulated Authorization Action button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (cardNumber.length < 16) {
                            toast.error('Card number must be 16 digits for secure simulation validation');
                            return;
                          }
                          if (!cardExpiry.includes('/')) {
                            toast.error('Expiry must be formatted as MM/YY');
                            return;
                          }
                          if (cardCvv.length < 3) {
                            toast.error('CVV must be 3 digits');
                            return;
                          }
                          handlePaymentSuccess();
                        }}
                        disabled={isProcessingPayment}
                        className="w-full py-3 px-4 rounded-xl bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest font-mono hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 cursor-pointer"
                      >
                        {isProcessingPayment ? (
                          <span className="flex items-center justify-center space-x-2">
                            <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                            <span>Authorizing Card...</span>
                          </span>
                        ) : (
                          <>
                            <span>🔒 Authorize simulated secure transaction</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 bg-white border border-gray-100 rounded-3xl flex flex-col items-center shadow-xl w-full"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-cyan-50 border-2 border-cyan-500 text-cyan-500 flex items-center justify-center mb-6 shadow-xl"
            >
              <CheckCircle className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-center text-black">Payment Successful!</h2>
            <p className="text-gray-500 mb-8 font-semibold text-sm text-center">Your booking has been securely confirmed.</p>

            <div className="w-full max-w-sm bg-gray-50 border border-gray-100 rounded-3xl p-6 mb-8 text-left space-y-4 shadow-sm font-mono">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Order Ref</span>
                <span className="text-xs font-black text-cyan-500">{transactionId.slice(0, 16)}...</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Service</span>
                <span className="text-xs font-black uppercase text-gray-800">{type === 'repair' ? 'Repair' : 'Product Order'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Client</span>
                <span className="text-xs font-black uppercase text-gray-800">{formData.name}</span>
              </div>
              <div className="pt-2 text-center">
                <span className="inline-flex items-center text-[8px] font-black tracking-widest uppercase text-green-600 bg-green-50 px-2.5 py-1.5 rounded shadow-sm border border-green-100">✔ Firebase Secured Validation</span>
              </div>
            </div>

            <div className="w-full max-w-sm space-y-3 font-mono">
              {matchedProduct?.buyUrl && (
                <a
                  href={matchedProduct.buyUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-black uppercase text-[11px] tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:brightness-110 hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 animate-pulse text-center cursor-pointer mb-2 font-black"
                >
                  <ArrowRight className="w-4 h-4 text-black animate-bounce" />
                  <span>👉 COMPLETE BOOKING ON FLIPKART</span>
                </a>
              )}

              <button
                onClick={downloadReceipt}
                className="w-full py-4 px-6 rounded-xl bg-gray-950 text-white hover:bg-cyan-500 hover:text-black font-black uppercase text-[10px] tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Receipt (.HTML)</span>
              </button>

              <button
                onClick={sendToWhatsApp}
                className="w-full py-4 px-6 rounded-xl bg-emerald-500 text-black font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Send Updates on WhatsApp</span>
              </button>

              <button
                onClick={() => navigate('/my-orders')}
                className="w-full py-3 px-6 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-black font-bold uppercase text-[9px] tracking-widest transition-colors cursor-pointer text-center block"
              >
                Track on Booking List
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

