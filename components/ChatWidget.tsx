"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, X, ArrowUp, RotateCcw, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTop } from './scrollToTop';

type Message = {
  role: 'user' | 'bot';
  content: string;
  isTyped?: boolean;
};

const SUGGESTIONS = [
  "Core tech stack",
  "Work experience",
  "Featured projects",
  "Contact & socials",
];

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'bot',
    content: "Hi there! Feel free to ask anything about Nurdin's skills, experience, or projects.",
    isTyped: true,
  }
];

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
  const cleanContent = content.replace(/\[cite:\s*[0-9,\s]*\]/gi, '');
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

  return <ReactMarkdown>{displayed}</ReactMarkdown>;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputValue('');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden');
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
      return () => {
        clearTimeout(timer);
        document.body.style.removeProperty('overflow');
      };
    } else {
      document.body.style.removeProperty('overflow');
      // Mark all existing messages as typed when widget closes so they never replay
      setMessages((prev) => prev.map((m) => ({ ...m, isTyped: true })));
    }
  }, [isOpen]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = (messageText ?? inputValue).trim();
    if (!textToSend || isLoading) return;

    if (!messageText) {
      setInputValue('');
    }
    setMessages((prev) => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        throw new Error('API response was not ok');
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
          { role: 'bot', content: 'Unexpected response format from server.', isTyped: false },
        ]);
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Unable to connect to the server. Please try again.', isTyped: false },
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
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[390px] h-[100dvh] sm:h-[520px] sm:max-h-[calc(100dvh-7.5rem)] z-50 flex flex-col bg-background text-foreground sm:border sm:border-black/10 dark:sm:border-white/10 sm:rounded-2xl sm:shadow-2xl overflow-hidden"
          >
            {/* Header (Frosted blur blending into body) */}
            <div className="absolute top-0 inset-x-0 z-20 px-4 pt-4 sm:pt-3.5 pb-2.5 bg-background/80 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-turquoise/15 text-turquoise flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-none">Portfolio Assistant</h3>
                    <span className="text-[11px] text-default-400">Ask about Nurdin's work</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    title="Reset conversation"
                    className="p-1.5 rounded-lg text-default-400 hover:text-foreground hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="p-1.5 rounded-lg text-default-400 hover:text-foreground hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
              <div className="absolute inset-x-0 -bottom-4 h-4 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
            </div>

            {/* Messages Area */}
            <div 
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
                  <p className="text-[11px] text-default-400">Suggested topics:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((suggestion, i) => (
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
                    <span>Thinking...</span>
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
                    placeholder="Ask a question..."
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
                      aria-label={isLoading ? "Generating response..." : "Send message"}
                      title={isLoading ? "Generating response..." : "Send message"}
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

      {/* Floating Action Buttons */}
      <div className={clsx("fixed bottom-6 right-6 z-40 flex items-center gap-3", isOpen && "hidden sm:flex")}>
        <ScrollToTop />

        <button
          onClick={toggleChat}
          className="bg-turquoise/20 hover:bg-turquoise/30 backdrop-blur-md border border-turquoise/30 text-turquoise h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:-translate-y-1 active:scale-95 shrink-0"
          title={isOpen ? "Close chat" : "Ask AI Assistant"}
          aria-label={isOpen ? "Close chat" : "Ask AI Assistant"}
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
