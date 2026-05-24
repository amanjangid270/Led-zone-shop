import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ShieldCheck, PenTool, Star, Zap, QrCode, CheckCircle, ChevronLeft, ChevronRight, Cpu, HelpCircle, Volume2, Layers, Tv, Activity, Award, Sparkles, Monitor, ArrowRight, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../lib/data';
import { useShopStore } from '../store/shop';
import { useRecommendationStore } from '../store/recommendation';
import { RecommendationEngine } from '../components/recommendations/RecommendationEngine';
import { toast } from 'react-hot-toast';
import { ProductImage } from '../components/products/ProductImage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuthStore } from '../store/auth';

export const ProductDetails = () => {
  const { id } = useParams();
  const { wishlist, toggleWishlist, addToCart } = useShopStore();
  const { addViewedProduct, addInteractedCategory } = useRecommendationStore();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const { user, signIn } = useAuthStore();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState(0);
  const [alertEmail, setAlertEmail] = useState('');
  const [isSavingAlert, setIsSavingAlert] = useState(false);
  
  const product = products.find(p => p.id === id);
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  useEffect(() => {
    if (product) {
      addViewedProduct(product.id);
      addInteractedCategory(product.isRefurbished ? 'refurbished' : 'new');
      setAlertTargetPrice(Math.round(product.price * 0.9));
    }
  }, [product, addViewedProduct, addInteractedCategory]);

  useEffect(() => {
    if (user?.email) {
      setAlertEmail(user.email);
    }
  }, [user]);

  const handleCreatePriceDropAlert = async () => {
    if (!product) return;
    if (!user) {
      toast.error('Please log in with Google to configure price drop alerts!', { id: 'alert-login-toast' });
      signIn();
      return;
    }

    if (!alertEmail.trim() || !alertEmail.includes('@')) {
      toast.error('Please enter a valid notification email.');
      return;
    }

    if (Number(alertTargetPrice) >= product.price) {
      toast.error('Target alert price must be strictly lower than the current listing price.');
      return;
    }

    if (Number(alertTargetPrice) < 1) {
      toast.error('Target alert price must be a valid positive amount.');
      return;
    }

    setIsSavingAlert(true);
    const alertId = 'alert-' + Math.random().toString(36).substring(2, 11).toUpperCase();

    try {
      await setDoc(doc(db, 'price_drop_alerts', alertId), {
        id: alertId,
        userId: user.id,
        productId: product.id,
        productName: product.name,
        currentPrice: Number(product.price),
        targetPrice: Number(alertTargetPrice),
        email: alertEmail.trim(),
        createdAt: serverTimestamp()
      });

      toast.success(`Secure Price Drop trigger is active! We'll alert you at ${alertEmail} when it drops to ₹${Number(alertTargetPrice).toLocaleString('en-IN')}.`, { id: 'alert-success-toast' });
      setIsAlertModalOpen(false);
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.CREATE, `price_drop_alerts/${alertId}`);
    } finally {
      setIsSavingAlert(false);
    }
  };

  if (!product) {
    return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-gray-500">Product not found</div>;
  }

  // Ensure every display has multiple rich product screenshots for sliding
  const imagesToUse = product.images && product.images.length > 1
    ? product.images
    : [
        product.image,
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1000&bg=f5f5f7',
        'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&q=80&w=1000&bg=f5f5f7',
        'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=1000&bg=f5f5f7'
      ];

  // Keyboard navigation for carousel slider (arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside form inputs
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        setActiveImgIndex((prev) => (prev - 1 + imagesToUse.length) % imagesToUse.length);
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex((prev) => (prev + 1) % imagesToUse.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imagesToUse.length]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swiped Left -> Next image
      setActiveImgIndex((prev) => (prev + 1) % imagesToUse.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swiped Right -> Prev image
      setActiveImgIndex((prev) => (prev - 1 + imagesToUse.length) % imagesToUse.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Live Multi-Image Premium Carriage Slider */}
        <div className="space-y-6">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`aspect-video rounded-3xl overflow-hidden relative border border-gray-100 flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing group/carousel ${
                imagesToUse[activeImgIndex].startsWith('custom-') ? 'p-0 bg-transparent' : 'p-8 bg-gray-50/80'
              }`}
            >
              {/* Backlight visual ambience glow matching active color */}
              <div className="absolute -inset-10 bg-gradient-to-r from-cyan-400/5 via-violet-500/5 to-cyan-400/5 rounded-full blur-[80px]" />

              {/* Counter Indicator Tag in top-left */}
              <div className="absolute top-4 left-4 z-20 bg-black/75 px-3 py-1.5 rounded-xl border border-white/10 text-white font-mono text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-md mb-2">
                View {activeImgIndex + 1} / {imagesToUse.length}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeImgIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="w-full h-full select-none pointer-events-none relative z-10"
                >
                  <ProductImage 
                    src={imagesToUse[activeImgIndex]} 
                    alt={`${product.name} View ${activeImgIndex + 1}`}
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hand-Gesture Guidance Hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-md opacity-45 group-hover/carousel:opacity-100 transition-opacity flex items-center gap-1.5 select-none z-20 pointer-events-none">
                <span className="text-[8px] font-black tracking-widest text-white uppercase font-mono">← Swipe / ← → Arrows to Cycle →</span>
              </div>

              {/* Carousel Arrows */}
              <button
                type="button"
                onClick={() => setActiveImgIndex((prev) => (prev - 1 + imagesToUse.length) % imagesToUse.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-black hover:text-white border border-gray-100/60 flex items-center justify-center shadow-lg transition-all active:scale-95 z-20 cursor-pointer text-black"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImgIndex((prev) => (prev + 1) % imagesToUse.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-black hover:text-white border border-gray-100/60 flex items-center justify-center shadow-lg transition-all active:scale-95 z-20 cursor-pointer text-black"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast.success(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist');
                }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/95 border border-gray-100 flex items-center justify-center hover:bg-white hover:scale-105 transition-all z-20 shadow-sm"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-cyan-500 text-cyan-500' : 'text-gray-400'}`} />
              </button>
            </motion.div>
          </div>

          {/* Filmstrip Smart sliding previews accommodating dynamic number of thumbnails */}
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 snap-x">
            {imagesToUse.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImgIndex(i)}
                className={`aspect-video w-24 sm:w-28 flex-shrink-0 rounded-2xl overflow-hidden border-2 flex items-center justify-center cursor-pointer transition-all snap-start ${
                  activeImgIndex === i
                    ? 'border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.35)] bg-white scale-[1.03] opacity-100'
                    : 'border-transparent hover:border-gray-200 bg-gray-50/50 opacity-70 hover:opacity-100'
                } ${img.startsWith('custom-') ? 'p-0' : 'p-2'}`}
              >
                <ProductImage src={img} alt="" className="w-full h-full object-contain rounded-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          {product.isRefurbished && (
            <div className="inline-flex items-center space-x-2 text-cyan-600 bg-cyan-50 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest w-max mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Refurbished - {product.condition}</span>
            </div>
          )}
          
          <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2 font-mono">{product.brand}</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter leading-none">{product.name}</h1>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-black text-gray-800">{product.rating}</span>
              </div>
              <span className="text-sm font-semibold text-gray-400 underline cursor-pointer hover:text-gray-800 transition-colors">
                {product.reviews} reviews
              </span>
            </div>

            <div className="h-4 w-px bg-gray-200"></div>

            <label 
              className="text-xs flex items-center gap-2 font-bold text-gray-500 hover:text-black cursor-pointer uppercase tracking-widest font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              <input 
                type="checkbox" 
                className="rounded text-cyan-500 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                checked={useShopStore(state => state.compareList.includes(product.id))}
                onChange={() => {
                  const state = useShopStore.getState();
                  if (!state.compareList.includes(product.id) && state.compareList.length >= 4) {
                    toast.error('You can only compare up to 4 products');
                    return;
                  }
                  state.toggleCompare(product.id);
                }}
              />
              Compare
            </label>
          </div>
          
          <div className="flex flex-col mb-8">
            <div className="flex items-end space-x-4 mb-3">
              <span className="text-4xl font-black">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through mb-1 font-semibold">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.originalPrice && (
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-md uppercase tracking-widest font-mono font-black mb-2">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-1.5 text-[10px] text-green-700 bg-green-50 px-2.5 py-1.5 rounded-full font-bold uppercase tracking-widest border border-green-100 font-mono">
                 <QrCode className="w-3.5 h-3.5" />
                 <span>UPI / QR Enabled</span>
              </div>
              <div className={`inline-flex items-center space-x-1 text-[10px] px-2.5 py-1.5 rounded-full font-bold uppercase tracking-widest border font-mono ${product.price > 15000 ? 'text-amber-700 bg-amber-50 border-amber-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>
                 <CheckCircle className="w-3.5 h-3.5" />
                 <span>{product.price > 15000 ? 'Limited Stock' : 'In Stock'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 font-mono">
            <button
              onClick={() => {
                addToCart(product.id);
                toast.success('Added to Cart');
              }}
              className="flex items-center justify-center space-x-2 py-4 rounded-xl bg-gray-50 border border-gray-200 text-black font-black text-[10px] uppercase tracking-widest hover:border-cyan-500 hover:text-cyan-600 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <a
              href={product.buyUrl || 'https://fktr.in/W7Pvy9z'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-4 rounded-xl bg-cyan-500 text-black font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white shadow-xl hover:shadow-cyan-200 transition-all border border-transparent cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Quick Buy</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-10 font-mono">
            <Link
              to={`/booking?type=repair&product=${encodeURIComponent(product.name)}`}
              className="flex items-center justify-center space-x-2 py-4 rounded-xl w-full bg-gray-100 border border-gray-200 text-gray-700 font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              <PenTool className="w-4 h-4" />
              <span>Book Repair Instead</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsAlertModalOpen(true)}
              className="flex items-center justify-center space-x-2 py-4 rounded-xl w-full bg-amber-550/10 bg-amber-50 border border-amber-200 text-amber-800 font-black text-[10px] uppercase tracking-widest hover:bg-amber-100/80 transition-all cursor-pointer shadow-sm"
            >
              <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>Notify Me on Price Drop</span>
            </button>
          </div>

          {/* Interactive Price Drop alert configurator Modal Overlay */}
          <AnimatePresence>
            {isAlertModalOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-left"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 font-mono block mb-1">🎯 E2E Smart Alerts</span>
                      <h3 className="text-xl font-black uppercase tracking-tight text-gray-950">Configure Price Trigger</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAlertModalOpen(false)}
                      className="text-gray-400 hover:text-black font-black text-sm cursor-pointer block p-1 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-6 font-semibold">
                    We will dispatch a secure automated alert check to your mailbox the second active market listing drops below your threshold. Keep your tabs active!
                  </p>

                  <div className="space-y-5">
                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400 font-mono block mb-1.5">Selected Display Component</span>
                      <div className="text-xs font-black text-gray-800 uppercase bg-gray-50 border border-gray-100 p-3 rounded-xl font-mono leading-tight">
                        {product.name}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-150/60 font-mono">
                      <div>
                        <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-widest block mb-0.5">Current Price</span>
                        <span className="text-base font-black text-gray-800">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-extrabold text-amber-600 uppercase tracking-widest block mb-0.5">Target Notify Cost</span>
                        <span className="text-base font-black text-amber-600">₹{Number(alertTargetPrice).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Quick Discount Percent Picker */}
                    <div className="space-y-2">
                      <span className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400 font-mono block">Preset Target Level</span>
                      <div className="grid grid-cols-3 gap-2 font-mono">
                        {[
                          { pct: 5, label: '5% Off (-₹' + Math.round(product.price * 0.05).toLocaleString('en-IN') + ')' },
                          { pct: 10, label: '10% Off (-₹' + Math.round(product.price * 0.10).toLocaleString('en-IN') + ')' },
                          { pct: 15, label: '15% Off (-₹' + Math.round(product.price * 0.15).toLocaleString('en-IN') + ')' }
                        ].map((disc) => (
                          <button
                            key={disc.pct}
                            type="button"
                            onClick={() => setAlertTargetPrice(Math.round(product.price * (1 - disc.pct / 100)))}
                            className={`py-2 px-1 text-[8px] font-black uppercase text-center rounded-lg border transition-all cursor-pointer ${
                              alertTargetPrice === Math.round(product.price * (1 - disc.pct / 100))
                                ? 'bg-amber-500 border-amber-500 text-black shadow-sm'
                                : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          >
                            {disc.pct}% Level
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Range Cost Selector slider */}
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between text-[9.5px] font-bold uppercase tracking-widest text-gray-450">
                        <span>Define Custom Cost</span>
                        <span className="text-amber-600 font-black">₹{Number(alertTargetPrice).toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={Math.round(product.price * 0.5)}
                        max={product.price - 100}
                        step={100}
                        value={alertTargetPrice}
                        onChange={(e) => setAlertTargetPrice(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <div className="flex justify-between text-[8px] text-gray-400 font-semibold font-mono">
                        <span>50% Price Range (₹{Math.round(product.price * 0.5).toLocaleString()})</span>
                        <span>Max Threshhold (₹{(product.price - 100).toLocaleString()})</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-widest text-gray-400 font-mono mb-1.5">Notify to Email Address</label>
                      <input
                        type="email"
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        placeholder="e.g. technician@ledzone.com"
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl px-4 py-3 text-xs font-semibold text-black placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-6 font-mono">
                    <button
                      type="button"
                      onClick={handleCreatePriceDropAlert}
                      disabled={isSavingAlert}
                      className="w-full py-4 rounded-xl bg-gray-950 hover:bg-amber-500 text-white hover:text-black font-black uppercase text-[10px] tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSavingAlert ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Activating Secure Rule...</span>
                        </span>
                      ) : (
                        <>
                          <span>🔔 Activate Price Drop Alarm</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Specs */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex-grow shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 font-mono">Technical Specifications</h3>
            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex border-b border-gray-50 pb-3 last:border-0">
                  <span className="w-1/3 text-[10px] uppercase tracking-widest font-bold text-gray-400 font-mono">{key}</span>
                  <span className="w-2/3 text-sm font-semibold text-gray-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flagship Showroom Section only for TCL and Infinix models */}
      {(product.id === 'tcl-115-x955' || product.id === 'infinix-40-y1') && product.slides && (
        <div className="mb-20 mt-8 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Subtle background art elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-black uppercase text-cyan-600 tracking-widest font-mono bg-cyan-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span>FLAGSHIP EXPERIENCE: {product.slides.length} CINEMATIC DISCOVERIES</span>
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 leading-none">
              Interactive Media & Engineering System
            </h2>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-2xl mx-auto">
              Inspect each of the {product.slides.length} flagship marketing slides in extreme technical fidelity. Toggle the tabs below to dynamically load interactive layout simulations and blueprints of each master feature.
            </p>
          </div>

          {/* Core Interactive Layout (Tabs List and Live Simulation Screen side-by-side) */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-2">
            {/* Left Column: Interactive Navigation Tabs (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-start space-y-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 font-mono block pl-2">Select Tech Slide:</span>
              <div className="space-y-3">
                {product.slides.map((slide, sIdx) => {
                  const getSlideIcon = (index: number) => {
                    switch(index) {
                      case 0: return <Sparkles className="w-4 h-4" />;
                      case 1: return <Tv className="w-4 h-4" />;
                      case 2: return <Volume2 className="w-4 h-4" />;
                      case 3: return <Monitor className="w-4 h-4" />;
                      case 4: return <Layers className="w-4 h-4" />;
                      case 5: return <Award className="w-4 h-4" />;
                      default: return <Sparkles className="w-4 h-4" />;
                    }
                  };

                  const isActive = activeSlideIndex === sIdx;

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setActiveSlideIndex(sIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 relative group/tab ${
                        isActive
                          ? 'border-cyan-500 bg-cyan-50/20 text-cyan-900 shadow-md shadow-cyan-50/30'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/30 text-gray-600 hover:bg-gray-50/80 hover:text-black'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-cyan-500 rounded-l-full" />
                      )}
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        isActive ? 'bg-cyan-500 text-black' : 'bg-gray-100 text-gray-400 group-hover/tab:bg-gray-200 group-hover/tab:text-gray-900'
                      }`}>
                        {getSlideIcon(sIdx)}
                      </div>
                      <div className="flex-grow min-w-0 pr-4">
                        <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-gray-400 block mb-0.5">SLIDE 0{sIdx + 1}</div>
                        <div className="text-xs font-black uppercase tracking-tight group-hover/tab:text-cyan-600 transition-colors truncate">{slide.title}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-gray-300 transition-all ${
                        isActive ? 'translate-x-1 text-cyan-500' : 'group-hover/tab:translate-x-1 group-hover/tab:text-gray-900'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: High Fidelity Technical Screen Mockup & Feature Specs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-gray-950 text-white rounded-3xl border border-gray-900 p-6 md:p-8 relative overflow-hidden shadow-2xl min-h-[480px]">
              {/* Mesh grid design backing */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6 relative z-10 flex-grow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Status panel row inside console */}
                    <div className="flex items-center justify-between border-b border-gray-900 pb-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-extrabold">Active Simulation Core</span>
                      </div>
                      <span className="text-[8px] text-gray-500 uppercase font-bold">SLIDE_ID: {product.brand.toUpperCase()}_0{activeSlideIndex + 1}</span>
                    </div>

                    {/* Headline and Narrative */}
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">
                        {product.slides[activeSlideIndex].headline}
                      </h3>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                        {product.slides[activeSlideIndex].description}
                      </p>
                    </div>

                    {/* Live Virtual TV Monitor Mockup displaying interactive feature illustration */}
                    <div className="aspect-video w-full rounded-2xl bg-black border border-gray-800 p-4 relative overflow-hidden flex flex-col items-center justify-center shadow-inner group/internal-screen">
                      {/* Sub-ambient bezel backlight glow matching category color */}
                      <div className={`absolute -inset-10 opacity-30 blur-[45px] rounded-full pointer-events-none bg-radial ${
                        activeSlideIndex === 0 ? 'from-cyan-500/40 font-black' :
                        activeSlideIndex === 1 ? 'from-emerald-500/40 font-black' :
                        activeSlideIndex === 2 ? 'from-indigo-500/40 font-black' :
                        activeSlideIndex === 3 ? 'from-violet-500/40 font-black' :
                        activeSlideIndex === 4 ? 'from-blue-500/40 font-black' : 'from-yellow-500/40 font-black'
                      }`} />

                      {/* RENDERING RELEVANT VISUAL BASED ON SLIDE INDEX */}
                      {product.id === 'tcl-115-x955' ? (
                        <>
                          {/* Slide 0: Quantum Gold-Blue Flower Artwork */}
                          {activeSlideIndex === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="relative w-28 h-28 flex items-center justify-center"
                              >
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-transparent to-indigo-600 rounded-full blur-[2px] opacity-40 animate-pulse duration-3000" />
                                {/* SVG schematic representation of the iconic luxury gold-blue flower petals */}
                                <svg className="w-24 h-24 text-cyan-400 fill-none stroke-current" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="10" strokeWidth="2" className="text-yellow-400" />
                                  {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
                                    <g key={rot} transform={`rotate(${rot} 50 50)`}>
                                      <path d="M 50 40 C 40 25 35 15 50 5 C 65 15 60 25 50 40" strokeWidth="1.5" className="text-cyan-400/80" />
                                      <path d="M 50 45 C 44 32 40 22 50 15 C 60 22 56 32 50 45" strokeWidth="1" className="text-yellow-500/70" />
                                    </g>
                                  ))}
                                </svg>
                              </motion.div>
                              <span className="text-[7px] text-gray-500 font-mono font-black mt-2 absolute bottom-2 tracking-widest uppercase">DYNAMIC DEEP QLED MOCK</span>
                            </div>
                          )}

                          {/* Slide 1: Smart Google TV UI & voice waveform */}
                          {activeSlideIndex === 1 && (
                            <div className="absolute inset-0 p-4 flex flex-col justify-between items-stretch">
                              <div className="grid grid-cols-4 gap-2">
                                {['Google TV', 'Prime Video', 'YouTube', 'Disney+'].map((app, appIdx) => (
                                  <div key={app} className="p-1 px-1.5 rounded bg-gray-900 border border-gray-800 text-center flex flex-col justify-center items-center h-10">
                                    <span className={`text-[9px] font-black uppercase ${appIdx === 0 ? 'text-green-400' : 'text-gray-400'}`}>{app.split(' ')[0]}</span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Microphone animation */}
                              <div className="flex items-center justify-center gap-3 py-1">
                                <span className="text-xs">🎤</span>
                                <div className="flex gap-1">
                                  {[1.2, 0.4, 1.8, 0.8, 1.5, 0.5, 1.0].map((delay) => (
                                    <motion.div
                                      key={delay}
                                      animate={{ scaleY: [0.3, 1.3, 0.3] }}
                                      transition={{ duration: 0.8, repeat: Infinity, delay: delay * 0.3 }}
                                      className="w-1 h-4 bg-green-400 rounded-full origin-center"
                                    />
                                  ))}
                                </div>
                                <span className="text-[8px] font-mono font-black text-green-400 uppercase tracking-wider">"HEY GOOGLE, SCREEN MIRROR"</span>
                              </div>

                              <div className="flex items-center justify-between border-t border-gray-900 pt-1 text-[7px] font-mono text-gray-500 uppercase">
                                <span>Phone Mirror Link active</span>
                                <span className="text-green-500 font-black">MUTLI_VIEW_2.0 ONLINE</span>
                              </div>
                            </div>
                          )}

                          {/* Slide 2: ONKYO 6.2.2 physical sound projections */}
                          {activeSlideIndex === 2 && (
                            <div className="absolute inset-0 p-4 flex flex-col justify-between items-center bg-radial from-blue-950/20 to-transparent">
                              <div className="flex justify-between items-center w-full mt-1 px-4">
                                {/* Spatially radiating audio cones drawing */}
                                <div className="flex items-center gap-1 flex-col">
                                  <span className="text-xs animate-bounce">🔊</span>
                                  <span className="text-[6px] text-gray-550 font-mono">HEIGHT L</span>
                                </div>
                                <div className="text-center">
                                  <span className="text-[14px] font-black text-cyan-400 tracking-wider block">ONKYO 3D</span>
                                  <span className="text-[7px] text-gray-400 font-mono font-bold block uppercase tracking-widest">6.2.2 CH CHANNELS</span>
                                </div>
                                <div className="flex items-center gap-1 flex-col">
                                  <span className="text-xs animate-bounce">🔊</span>
                                  <span className="text-[6px] text-gray-550 font-mono">HEIGHT R</span>
                                </div>
                              </div>

                              {/* Decibels sound wave circle */}
                              <div className="relative w-16 h-16 flex items-center justify-center">
                                {[1, 2, 3].map((ring) => (
                                  <motion.div
                                    key={ring}
                                    animate={{ scale: [1, 2.3], opacity: [0.7, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: ring * 0.5 }}
                                    className="absolute inset-0 border border-indigo-400 rounded-full"
                                  />
                                ))}
                                <span className="text-[10px] font-mono font-black text-indigo-400">Atmos</span>
                              </div>

                              {/* Bass woofers indicator */}
                              <div className="flex justify-center gap-4 text-[7px] font-mono text-gray-555 border-t border-gray-900 pt-1.5 w-full uppercase">
                                <span className="text-cyan-400 font-bold">● L-SUB BASSOOST OUT</span>
                                <span className="text-cyan-400 font-bold">● R-SUB BASSBOOST OUT</span>
                              </div>
                            </div>
                          )}

                          {/* Slide 3: 144Hz Sports Car & IMAX glow */}
                          {activeSlideIndex === 3 && (
                            <div className="absolute inset-0 p-4 flex flex-col justify-between items-stretch">
                              <div className="text-center pt-1 border-b border-gray-950 pb-1 flex justify-between items-center">
                                <span className="text-[8px] bg-red-950 text-red-500 px-1.5 py-0.5 rounded font-bold font-mono tracking-widest uppercase">IMAX ENHANCED</span>
                                <span className="text-[9px] font-mono font-black text-yellow-400">FPS RECOVERY RATE: 144Hz</span>
                              </div>

                              {/* sports car schematic motion lines diagram */}
                              <div className="flex-grow flex items-center justify-center relative overflow-hidden my-1 pl-12">
                                <motion.div
                                  animate={{ x: [-8, 8, -8] }}
                                  transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
                                  className="text-3xl filter drop-shadow-[0_2px_4px_black] relative z-10"
                                >
                                  🏎️
                                </motion.div>
                                
                                {/* Horizontal motion grid streaks fading backward */}
                                <div className="absolute right-4 left-6 flex flex-col space-y-1.5 opacity-40">
                                  {[1, 2, 3].map((ml) => (
                                    <motion.div
                                      key={ml}
                                      animate={{ x: [100, -100] }}
                                      transition={{ duration: 0.8, repeat: Infinity, delay: ml * 0.25, ease: "linear" }}
                                      className="h-0.5 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center text-[7px] font-mono text-gray-500 uppercase border-t border-gray-900 pt-1">
                                <span>ZERO PANNING DISTORTION</span>
                                <span className="text-green-500">STABILIZER_V3 ONLINE</span>
                              </div>
                            </div>
                          )}

                          {/* Slide 4: 20,000+ Backlight Local Dimming Zones diagram */}
                          {activeSlideIndex === 4 && (
                            <div className="absolute inset-0 p-4 flex flex-col justify-between items-stretch bg-radial from-violet-950/20 to-transparent">
                              <div className="text-center pt-1 text-[8px] font-mono text-gray-400 uppercase tracking-widest border-b border-gray-900 pb-1">
                                Exploded Backlight Layer Array
                              </div>

                              {/* Exploded parallel panels schema */}
                              <div className="flex-grow flex items-center justify-center gap-6 py-2">
                                {/* Layer 1 */}
                                <div className="flex flex-col items-center">
                                  <div className="w-12 h-16 border border-gray-700 bg-gray-900/60 rounded flex items-center justify-center text-[5px] font-mono font-black uppercase text-center p-0.5">
                                    QD panel
                                  </div>
                                  <span className="text-[5px] text-gray-500 mt-1 uppercase">Film</span>
                                </div>
                                
                                <div className="text-gray-605 font-mono text-xs text-center animate-pulse">➔</div>

                                {/* Layer 2 */}
                                <div className="flex flex-col items-center">
                                  <div className="w-12 h-16 border border-gray-750 bg-gray-900/80 rounded flex items-center justify-center text-[5px] font-mono font-black uppercase text-center p-0.5">
                                    Optical LCD
                                  </div>
                                  <span className="text-[5px] text-gray-500 mt-1 uppercase">Liquid</span>
                                </div>

                                <div className="text-gray-655 font-mono text-xs text-center animate-pulse">➔</div>

                                {/* Layer 3: Mini LED grid */}
                                <div className="flex flex-col items-center">
                                  <div className="w-12 h-16 border border-violet-500/80 bg-violet-950/40 rounded p-1 grid grid-cols-3 gap-0.5 shadow-[0_0_12px_rgba(139,92,246,0.2)]">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                                      <motion.div
                                        key={dot}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.15 }}
                                        className="w-full h-full bg-violet-400 rounded-full"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[5px] text-violet-400 font-mono font-bold mt-1 uppercase">20k zones</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center text-[7px] font-mono text-gray-500 uppercase border-t border-gray-900 pt-1">
                                <span>CHASSIS DEPTH: 1.2CM ULTRA SLIM</span>
                                <span className="text-cyan-400">CORE CONFIG: STACK_MATRIX</span>
                              </div>
                            </div>
                          )}

                          {/* Slide 5: Flagship 2025 Model with 5000 nits meter */}
                          {activeSlideIndex === 5 && (
                            <div className="absolute inset-0 p-4 flex flex-col justify-between items-stretch">
                              <div className="flex justify-between items-center text-[8px] font-mono border-b border-gray-950 pb-1">
                                <span className="text-yellow-400 font-bold uppercase tracking-wider">🥇 Olympic Games Partner Cert</span>
                                <span className="text-gray-500 font-bold uppercase">MODEL: 2025_RELEASE</span>
                              </div>

                              {/* Radiance meter animation */}
                              <div className="flex-grow flex flex-col items-center justify-center gap-1.5 py-1">
                                <span className="text-[8px] text-gray-400 font-mono font-bold uppercase tracking-wider font-semibold">Peak Radiance Scale</span>
                                
                                <div className="w-48 bg-gray-900 h-3 rounded-full border border-gray-800 p-0.5 overflow-hidden relative">
                                  <motion.div
                                    animate={{ width: ['20%', '100%', '80%', '100%'] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-yellow-400 rounded-full shadow-[0_0_8px_yellow]"
                                  />
                                </div>

                                <div className="flex justify-between items-center w-48 text-[7px] font-mono text-gray-500">
                                  <span>0 NIT</span>
                                  <span className="text-yellow-400 font-extrabold animate-pulse">5000 NITS MAX PNL</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center text-[7px] font-mono text-gray-500 uppercase border-t border-gray-900 pt-1">
                                <span>T-SCREEN ULTRA GLARE ABSORPTION: 99.8%</span>
                                <span className="text-green-500">CALIBRATION: PASS_GRADE</span>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-1 flex items-center justify-center bg-black rounded-xl overflow-hidden">
                          <ProductImage src={product.slides[activeSlideIndex].image} alt={product.slides[activeSlideIndex].title} className="w-full h-full" />
                        </div>
                      )}

                      {/* Bezel frame borders */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gray-800" />
                      <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gray-800" />
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-800" />
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700" />
                    </div>

                    {/* Features checklist bullets */}
                    <div className="space-y-2 font-mono">
                      <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block pt-1">Spec Highlights:</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {product.slides[activeSlideIndex].features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-[10px] text-gray-300">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="font-semibold">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Immediate prompt action for the TV item */}
                  <div className="pt-4 border-t border-gray-905 flex flex-wrap items-center justify-between gap-4 font-mono">
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                      Led Zone Flagship Blueprint
                    </span>
                    <Link
                      to={`/booking?type=new&product=${encodeURIComponent(product.name)}&amount=${product.price}`}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Secure Booking</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* ADDITIONAL ANIMATION ZONE: HYPER-REALISTIC NANOQUANTUM PROCESSOR FABRICATION ASSEMBLY */}
      <div className="mb-20 bg-gray-950 p-8 rounded-3xl border border-gray-900 relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
        
        {/* Futuristic background status rail */}
        <div className="absolute top-4 right-6 flex items-center gap-2 text-[8px] font-mono font-black tracking-widest text-[#22d3ee]/40">
          <Cpu className="w-3 h-3 animate-spin duration-3000" />
          <span>MICRO-FAB STATE: CALIBRATING</span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase font-mono block mb-2">Cleanroom Precision Laboratory</span>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
            Integrated <span className="text-cyan-400">LED-Core X1</span> Pixel Engineering
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed font-semibold mb-8">
            Behind the high-fidelity crisp detail of every renewed and new panel, microscopic automated and human hands perform hyper-realistic adjustments. Witness the nano-welder units and AI drones aligning structural pixel logic inside the displays in real-time.
          </p>
        </div>

        <div className="relative h-64 bg-black/80 rounded-2xl border border-gray-800 p-6 overflow-hidden flex items-center justify-center">
          {/* Central Holographic CRT/LED Substrate */}
          <motion.div 
            animate={{ 
              rotateY: [-10, 10, -10],
              rotateX: [5, -5, 5]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-28 bg-cyan-950/20 border-2 border-cyan-500/40 rounded-xl relative flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)] z-10"
          >
            <div className="absolute inset-1.5 border border-cyan-400/10 rounded-lg" />
            <div className="text-[8px] font-mono font-black text-cyan-400 tracking-widest">SUBSTRATE NODE</div>
            <div className="text-[6px] font-mono text-gray-500 mt-1 uppercase">GRID: 3840 x 2160 ULTRA-HD</div>
            
            {/* Pulsing micro subpixel grids */}
            <div className="grid grid-cols-4 gap-1.5 mt-2.5">
              {[1, 2, 3, 4].map((gridN) => (
                <motion.div
                  key={gridN}
                  animate={{ 
                    bg: gridN % 2 === 0 ? ['#06b6d4', '#10b981', '#06b6d4'] : ['#ef4444', '#f59e0b', '#ef4444'],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: gridN * 0.2 }}
                  className="w-3.5 h-1.5 rounded-sm bg-cyan-500 shadow-[0_0_6px_#06b6d4]"
                />
              ))}
            </div>
          </motion.div>

          {/* Spark Welding Micro Worker 👷‍♂️ (Dynamic position, generating welding spark particles) */}
          <div className="absolute left-10 bottom-6 z-20 flex flex-col items-center">
            {/* Sparks creator */}
            <div className="relative">
              {[1, 2, 3, 4, 5].map((sIndex) => (
                <motion.div
                  key={sIndex}
                  animate={{
                    x: [0, (sIndex % 2 === 0 ? 1 : -1) * (15 + sIndex * 3)],
                    y: [0, -20 - sIndex * 5],
                    opacity: [1, 0],
                    scale: [1, 0.2]
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: sIndex * 0.15,
                    ease: "easeOut"
                  }}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_6px_yellow] z-30"
                />
              ))}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 0.15, repeat: Infinity }}
                className="absolute -top-3 left-4 w-2 h-2 bg-yellow-300 rounded-full filter blur-[1px]"
              />
            </div>
            
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl filter drop-shadow-[0_2px_4px_black] cursor-help select-none"
              title="Calibrator Micro Worker"
            >
              👷‍♂️
            </motion.div>
            <span className="text-[6px] text-yellow-400 font-mono font-black uppercase tracking-wider py-0.5 px-1 bg-black/60 rounded">PIX_ALIGN</span>
          </div>

          {/* Vacuum Deposition System Drone with active transport microchip 🤖 (Top Right) */}
          <motion.div
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-12 top-6 z-20 flex flex-col items-center"
          >
            <div className="text-2xl filter drop-shadow-[0_2px_4px_black] select-none">
              🤖
            </div>
            <span className="text-[6px] text-purple-400 font-mono font-black uppercase tracking-wider py-0.5 px-1 bg-black/60 rounded">SYS_PACK</span>
            
            {/* The micro logic element hanging from drone */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 bg-purple-600 border border-purple-400 rounded shadow-[0_0_8px_#8b5cf6] mt-1.5 flex items-center justify-center text-[5px] font-black text-white"
            >
              U1
            </motion.div>
          </motion.div>

          {/* Micro Inspector Checking with a green scan beam 🕵️‍♂️ (Bottom Right) */}
          <div className="absolute right-10 bottom-6 z-20 flex flex-col items-center">
            {/* Interactive scanning beam */}
            <motion.div 
              animate={{
                scaleX: [1, 1.4, 1],
                scaleY: [1, 1.2, 1],
                opacity: [0.15, 0.7, 0.15]
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute bottom-6 right-2 w-16 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
            />
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-2xl select-none"
            >
              🕵️‍♂️
            </motion.div>
            <span className="text-[6px] text-emerald-400 font-mono font-black uppercase tracking-wider py-0.5 px-1 bg-black/60 rounded">QA_INSPECT</span>
          </div>

          {/* Automated Gas Nozzle Sprayer (Top Left) */}
          <div className="absolute left-10 top-6 z-20 flex flex-col items-center">
            {/* Spray particle flow */}
            <div className="relative">
              {[1, 2, 3].map((gasN) => (
                <motion.div
                  key={gasN}
                  animate={{
                    x: [0, 40],
                    y: [0, 30],
                    opacity: [0.6, 0],
                    scale: [1, 3]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: gasN * 0.4
                  }}
                  className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full filter blur-[1px]"
                />
              ))}
            </div>
            <div className="text-2xl select-none">
              💨
            </div>
            <span className="text-[6px] text-cyan-400 font-mono font-black uppercase tracking-wider py-0.5 px-1 bg-black/60 rounded">VAPOR_DEP</span>
          </div>

          {/* Scanning alignment lines */}
          <div className="absolute inset-0 pointer-events-none border border-cyan-500/10" />
          <motion.div 
            animate={{ y: [-100, 150, -100] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-500/20 shadow-[0_0_8px_#06b6d4] pointer-events-none" 
          />
        </div>
      </div>

      <RecommendationEngine contextProductId={product.id} />
    </div>
  );
};
