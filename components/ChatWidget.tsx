"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, X, ArrowUp, RotateCcw, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTop } from './scrollToTop';
import { useLocale, useT } from '@/i18n/context';
import type { Locale } from '@/i18n/config';
import { useHoldAboveFooter, useHideWhileScrollingDown } from '@/components/hooks/useHoldAboveFooter';

type Message = {
  role: 'user' | 'bot';
  content: string;
  isTyped?: boolean;
};

const createInitialMessages = (greeting: string): Message[] => [
  {
    role: 'bot',
    content: greeting,
    isTyped: true,
  }
];

// Conversations are kept in sessionStorage, keyed per locale: the active locale is
// applied after hydration, so a single shared key would let the initial default-locale
// render overwrite the stored conversation before the real locale takes over.
const CHAT_STORAGE_PREFIX = 'chat_history_v1:';
const MAX_STORED_MESSAGES = 50;

type StoredChat = {
  version: 1;
  messages: Message[];
};

const loadStoredChat = (locale: Locale): Message[] | null => {
  try {
    const raw = window.sessionStorage.getItem(CHAT_STORAGE_PREFIX + locale);
    if (!raw) return null;

    const stored = JSON.parse(raw) as StoredChat;
    if (stored.version !== 1 || !Array.isArray(stored.messages)) {
      window.sessionStorage.removeItem(CHAT_STORAGE_PREFIX + locale);
      return null;
    }

    const valid = stored.messages.filter(
      (m) => m && (m.role === 'user' || m.role === 'bot') && typeof m.content === 'string'
    );
    if (valid.length === 0) return null;

    // Restored messages never replay the typewriter animation.
    return valid.map((m) => ({ role: m.role, content: m.content, isTyped: true }));
  } catch {
    return null;
  }
};

const saveStoredChat = (locale: Locale, messages: Message[]) => {
  try {
    const key = CHAT_STORAGE_PREFIX + locale;
    if (messages.length <= 1) {
      // Only the greeting is left: nothing worth keeping around.
      window.sessionStorage.removeItem(key);
      return;
    }

    const payload: StoredChat = {
      version: 1,
      messages: messages.slice(-MAX_STORED_MESSAGES),
    };
    window.sessionStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // sessionStorage can be unavailable (private mode, quota) — the chat works without it.
  }
};

const TypewriterMarkdown = ({ 
  content, 
  animate = true, 
  onUpdate, 
  onComplete 
}: { 
  content: string; 
  animate?: boolean; 
  onUpdate?: () => void; 
  onComplete?: () => void; 
}) => {
  // URL polos di luar markdown link ikut jadi link.
  // Regex hanya match di awal teks/setelah whitespace supaya
  // URL target `](https://...)` dari markdown asli tidak di-link ganda.
  const cleanContent = content
    .replace(/\[cite:\s*[0-9,\s]*\]/gi, '')
    .replace(/(^|\s)(https?:\/\/[^\s)\]]+)/g, '$1[$2]($2)');
  const [displayed, setDisplayed] = useState(animate ? '' : cleanContent);
  const onUpdateRef = useRef(onUpdate);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!animate) {
      setDisplayed(cleanContent);
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(cleanContent.slice(0, i));
      i += 2;
      if (onUpdateRef.current) onUpdateRef.current();
      if (i > cleanContent.length) {
        setDisplayed(cleanContent);
        clearInterval(timer);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 15); 
    
    return () => clearInterval(timer);
  }, [cleanContent, animate]);

  return (
    <ReactMarkdown
      components={{
        // Render anchor eksplisit: tidak bergantung pada class `prose-a:*`,
        // dan selalu buka tab baru (jangan membawa user keluar dari chat panel).
        a: ({ href = '', children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-turquoise underline underline-offset-2 decoration-turquoise/50 hover:decoration-turquoise transition-colors"
          >
            {children}
          </a>
        ),
      }}
    >
      {displayed}
    </ReactMarkdown>
  );
};

export default function ChatWidget() {
  const t = useT();
  const { locale } = useLocale();
  const holdPx = useHoldAboveFooter();
  const scrollingAway = useHideWhileScrollingDown();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => createInitialMessages(t.chat.greeting));
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAtBottomRef = useRef(true);
  // The locale the current `messages` belong to, so a locale switch doesn't save the
  // previous locale's conversation under the new locale's key.
  const messagesLocaleRef = useRef(locale);

  // Check if user is near the bottom (threshold 60px)
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isAtBottomRef.current = distanceToBottom < 60;
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (force || isAtBottomRef.current) {
      const el = scrollContainerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleResetChat = () => {
    setMessages(createInitialMessages(t.chat.greeting));
    setInputValue('');
  };

  // A locale switch starts a fresh conversation so replies match the new language.
  // Restoring here (not in the useState initializer) keeps the first client render
  // identical to the server-rendered markup. Each locale keeps its own history, so
  // switching back to a language restores that conversation instead of wiping it.
  useEffect(() => {
    messagesLocaleRef.current = locale;
    setMessages(loadStoredChat(locale) ?? createInitialMessages(t.chat.greeting));
  }, [locale, t.chat.greeting]);

  // Mirror the conversation into sessionStorage so a refresh doesn't lose it.
  useEffect(() => {
    if (messagesLocaleRef.current !== locale) return;
    saveStoredChat(locale, messages);
  }, [locale, messages]);

  useEffect(() => {
    if (isOpen) {
      // Signals globals.css to push the page aside (lg and up) to make room for the pane.
      document.documentElement.setAttribute('data-chat-open', '');
      // Lock the page only while the pane covers the whole viewport; on lg and up the
      // pushed page stays readable and scrollable behind it.
      const paneViewport = window.matchMedia('(min-width: 64rem)');
      const syncLock = () => {
        if (paneViewport.matches) {
          document.body.style.removeProperty('overflow');
        } else {
          document.body.style.setProperty('overflow', 'hidden');
        }
      };
      syncLock();
      paneViewport.addEventListener('change', syncLock);

      const timer = setTimeout(() => {
        inputRef.current?.focus();
        // A restored conversation opens mid-history; jump to the latest message.
        scrollToBottom(true);
      }, 120);
      return () => {
        document.documentElement.removeAttribute('data-chat-open');
        clearTimeout(timer);
        paneViewport.removeEventListener('change', syncLock);
        document.body.style.removeProperty('overflow');
      };
    } else {
      document.documentElement.removeAttribute('data-chat-open');
      document.body.style.removeProperty('overflow');
      // Mark all existing messages as typed when widget closes so they never replay
      setMessages((prev) => prev.map((m) => ({ ...m, isTyped: true })));
    }
  }, [isOpen, scrollToBottom]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = (messageText ?? inputValue).trim();
    if (!textToSend || isLoading) return;

    if (!messageText) {
      setInputValue('');
    }
    isAtBottomRef.current = true;
    setMessages((prev) => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);
    setTimeout(() => scrollToBottom(true), 10);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        let detail = '';
        try {
          detail = (await res.json())?.message ?? '';
        } catch {
          /* response bukan JSON */
        }
        throw new Error(
          `API response was not ok (${res.status})${detail ? `: ${detail}` : ''}`
        );
      }

      const json = await res.json();
      
      if (json.status === 'success' && json.data && json.data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: json.data.reply, isTyped: false },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: t.chat.errorUnexpected, isTyped: false },
        ]);
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: t.chat.errorOffline, isTyped: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const hasInput = inputValue.trim().length > 0;
  const showSendButton = hasInput || isLoading;

  return (
    <>
      {/* Chat pane: fullscreen below lg; floats on the right and pushes the page aside on lg+ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed inset-0 h-[100dvh] z-50 flex flex-col bg-background text-foreground overflow-hidden lg:top-6 lg:right-6 lg:bottom-6 lg:left-auto lg:h-auto lg:w-[400px] lg:rounded-2xl lg:border lg:border-black/10 dark:lg:border-white/10 lg:shadow-2xl"
          >
            {/* Header (Frosted blur blending into body) */}
            <div className="absolute top-0 inset-x-0 z-20 px-4 pt-4 sm:pt-3.5 pb-2.5 bg-background/80 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-turquoise/15 text-turquoise flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-none">{t.chat.title}</h3>
                    <span className="text-[11px] text-default-400">{t.chat.subtitle}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    title={t.chat.reset}
                    className="p-1.5 rounded-lg text-default-400 hover:text-foreground hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label={t.chat.reset}
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="p-1.5 rounded-lg text-default-400 hover:text-foreground hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label={t.chat.close}
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
              <div className="absolute inset-x-0 -bottom-4 h-4 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 pt-16 pb-20 sm:pb-16 space-y-3.5 overscroll-contain text-sm"
              data-lenis-prevent="true"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "flex w-full",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={clsx(
                      "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-turquoise text-white dark:text-black font-medium rounded-br-xs"
                        : "bg-default-100 dark:bg-zinc-800 text-foreground border border-black/5 dark:border-white/5 rounded-bl-xs"
                    )}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-800 prose-a:text-turquoise prose-strong:text-foreground">
                        <TypewriterMarkdown 
                          content={msg.content} 
                          animate={!msg.isTyped} 
                          onUpdate={scrollToBottom}
                          onComplete={() => {
                            setMessages((prev) => 
                              prev.map((m, i) => i === idx ? { ...m, isTyped: true } : m)
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggestions: only on initial state */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-1.5">
                  <p className="text-[11px] text-default-400">{t.chat.suggestionsLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.chat.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(suggestion)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 bg-default-50/50 hover:bg-default-100 dark:hover:bg-zinc-800 text-default-600 dark:text-default-300 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-3 py-1.5 rounded-xl bg-default-100 dark:bg-zinc-800 border border-black/5 dark:border-white/5 text-xs text-default-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse" />
                    <span>{t.chat.thinking}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Frosted blur blending into body) */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-3 pb-6 sm:pb-3 pt-2 bg-background/80 backdrop-blur-md">
              <div className="absolute inset-x-0 -top-4 h-4 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
              <div className="flex items-center gap-2">
                <motion.div
                  layout
                  transition={{
                    duration: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-11 flex-1 flex items-center bg-default-100 dark:bg-zinc-800/80 rounded-xl px-3 border border-black/5 dark:border-white/10 focus-within:border-turquoise/60 focus-within:ring-1 focus-within:ring-turquoise/30 transition-colors"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.chat.inputPlaceholder}
                    disabled={isLoading}
                    className="h-full w-full bg-transparent text-sm text-foreground placeholder:text-default-400 outline-none min-w-0"
                  />
                </motion.div>
                
                {/* Send Button: outside input, shows loading spinner when AI is answering */}
                <AnimatePresence>
                  {showSendButton && (
                    <motion.button
                      key="send-button"
                      layout
                      initial={{ opacity: 0, scale: 0.8, width: 0 }}
                      animate={{ opacity: 1, scale: 1, width: 44 }}
                      exit={{ opacity: 0, scale: 0.8, width: 0 }}
                      transition={{
                        duration: 0.22,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => sendMessage()}
                      disabled={isLoading}
                      className={clsx(
                        "h-11 rounded-xl bg-turquoise text-white dark:text-black flex items-center justify-center shrink-0 overflow-hidden shadow-sm transition-all",
                        isLoading ? "opacity-80 cursor-not-allowed" : "hover:opacity-90 active:scale-95 cursor-pointer"
                      )}
                      aria-label={isLoading ? t.chat.generating : t.chat.send}
                      title={isLoading ? t.chat.generating : t.chat.send}
                    >
                      <div className="w-11 h-11 flex items-center justify-center shrink-0">
                        {isLoading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <ArrowUp size={18} strokeWidth={2.4} />
                        )}
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons — auto-hide saat scroll aktif + menyeret ke atas
          saat footer masuk viewport, maksimal berhenti di garis atas footer */}
      <div
        style={{ bottom: 24 + holdPx }}
        className={clsx(
          "fixed right-6 z-40 flex items-center gap-3 transition-all duration-300",
          isOpen && "hidden lg:flex lg:right-[448px]",
          !isOpen && scrollingAway && "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        <ScrollToTop />

        <button
          onClick={toggleChat}
          className="bg-turquoise/20 hover:bg-turquoise/30 backdrop-blur-md border border-turquoise/30 text-turquoise h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:-translate-y-1 active:scale-95 shrink-0"
          title={isOpen ? t.chat.close : t.chat.open}
          aria-label={isOpen ? t.chat.close : t.chat.open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Sparkles size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
