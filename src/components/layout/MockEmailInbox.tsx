import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Check, Eye, Trash2, ArrowUpRight } from 'lucide-react';
import { subscribeToEmails, EmailData } from '../../lib/emailService';

export const MockEmailInbox = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToEmails((newEmail) => {
      setEmails((prev) => [newEmail, ...prev]);
      setHasUnread(true);
      // Automatically open the inbox when first email arrives so the user can easily witness the sent email!
      setIsOpen(true);
    });
    return unsubscribe;
  }, []);

  const handleOpenInbox = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const handleCloseInbox = () => {
    setIsOpen(false);
    setSelectedEmail(null);
  };

  const handleClear = () => {
    setEmails([]);
    setSelectedEmail(null);
  };

  return (
    <>
      {/* Floating Mail Badge Action Icon in Bottom Right */}
      <div className="fixed right-6 bottom-6 z-45">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenInbox}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border transition-all cursor-pointer ${
            hasUnread 
              ? 'bg-[#06b6d4] text-black border-[#22d3ee] animate-pulse ring-4 ring-[#06b6d4]/20' 
              : 'bg-zinc-900 text-white border-zinc-850 hover:bg-black'
          }`}
          title="Simulated Support Email Client"
        >
          <Mail className="w-5.5 h-5.5" />
          {emails.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow">
              {emails.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Slide-out simulated Email inbox panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-black/40 backdrop-blur-xs">
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={handleCloseInbox} />

            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.98 }}
              className="relative bg-white w-full max-w-lg h-[80vh] rounded-3xl shadow-2xl flex flex-col border border-zinc-100 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 bg-zinc-950 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 block animate-ping" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400">LEDZone Mail Sandbox</span>
                </div>
                <div className="flex items-center gap-2">
                  {emails.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="text-[9px] font-black text-zinc-400 hover:text-red-400 uppercase tracking-widest bg-transparent border-none cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={handleCloseInbox}
                    className="w-7 h-7 bg-zinc-800 hover:bg-red-500 text-zinc-300 hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Workspace split */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedEmail ? (
                  /* Single Email View rendering real dynamic transaction structure */
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center shrink-0">
                      <div>
                        <button
                          onClick={() => setSelectedEmail(null)}
                          className="text-[9px] font-bold text-[#06b6d4] hover:underline uppercase tracking-wider block bg-transparent border-none cursor-pointer"
                        >
                          ← Back to Inbox
                        </button>
                        <h4 className="text-xs font-black uppercase text-zinc-900 mt-1 truncate max-w-sm">
                          {selectedEmail.subject}
                        </h4>
                      </div>
                      <span className="text-[8px] font-mono bg-zinc-200 px-2 py-0.5 rounded text-zinc-650 font-bold uppercase shrink-0">
                        SMTP Delivered
                      </span>
                    </div>

                    {/* Styled Mirrored HTML receipt loaded safely inside sandbox iframe */}
                    <div className="flex-1 bg-zinc-100 p-2 overflow-auto">
                      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/50 p-1 h-full min-h-[450px]">
                        <iframe
                          title="Simulated Email Preview"
                          srcDoc={selectedEmail.html}
                          className="w-full h-full border-0 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-4 bg-zinc-50 border-b border-zinc-100 flex items-center gap-2 shrink-0">
                      <Mail className="w-4 h-4 text-[#06b6d4]" />
                      <span className="text-xs font-black uppercase text-zinc-700 tracking-tight">Simulated Recieved Logs</span>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-zinc-150">
                      {emails.length === 0 ? (
                        <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-3">
                          <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-[10px] font-black uppercase tracking-wider text-zinc-700">Sandbox Inbox Empty</h5>
                            <p className="text-[10px] text-zinc-400 max-w-xs leading-relaxed font-semibold">
                              Please complete a display checkout order or click "Simulate Status → Success" in My Bookings tracker to log incoming receipts here!
                            </p>
                          </div>
                        </div>
                      ) : (
                        emails.map((email, i) => (
                          <div
                            key={i}
                            onClick={() => setSelectedEmail(email)}
                            className="p-4 hover:bg-cyan-50/15 cursor-pointer flex gap-3 items-start transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-[#06b6d4] shrink-0 border border-cyan-100/30 group-hover:scale-105 transition-transform">
                              <span className="text-[9px] font-black uppercase">{email.customerName.slice(0, 2)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="text-[11px] font-black uppercase text-zinc-800 block truncate">
                                  {email.customerName}
                                </span>
                                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                                  ₹{email.amount.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <p className="text-[10px] font-bold text-zinc-900 truncate uppercase tracking-tight mt-0.5">
                                {email.subject}
                              </p>
                              <p className="text-[9.5px] text-zinc-400 mt-1 truncate">
                                Item: {email.productName} ({email.type})
                              </p>
                              <div className="mt-2 flex items-center gap-1.5 text-[#06b6d4]">
                                <Eye className="w-3.5 h-3.5" />
                                <span className="text-[8px] font-black uppercase tracking-widest line-none">Inspect Mirrored HTML</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
