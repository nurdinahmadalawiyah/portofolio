"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const TypewriterMarkdown = ({ content, onUpdate }: { content: string, onUpdate?: () => void }) => {
  const [displayed, setDisplayed] = useState('');

  // Remove "[cite: ...]" tags from the content
  const cleanContent = content.replace(/\[cite:\s*[0-9,\s]*\]/gi, '');
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(cleanContent.slice(0, i));
      i += 2; // Type slightly faster by doing 2 chars at a time
      if (onUpdateRef.current) onUpdateRef.current();
      if (i > cleanContent.length) {
        setDisplayed(cleanContent); // ensure it ends perfectly
        clearInterval(timer);
      }
    }, 15); 
    
    return () => clearInterval(timer);
  }, [cleanContent]); // only depend on content, never restart unless content changes

  return <ReactMarkdown>{displayed}</ReactMarkdown>;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Halo! Ada yang ingin ditanyakan seputar pengalaman dan keahlian Nurdin?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden', 'important');
    } else {
      document.body.style.removeProperty('overflow');
    }
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error('API response was not ok');
      }

      const json = await res.json();
      
      if (json.status === 'success' && json.data && json.data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: json.data.reply },
        ]);
      } else {
         setMessages((prev) => [
          ...prev,
          { role: 'bot', content: 'Maaf, format respons dari server tidak sesuai.' },
        ]);
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Maaf, gagal terhubung ke server. Silakan coba lagi.' },
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

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleChat}
        aria-hidden="true"
      />

      {/* Sliding Sidebar Chat */}
      <div
        className={clsx(
          "fixed top-4 bottom-4 right-4 w-[calc(100%-2rem)] sm:w-[40vw] sm:max-w-[40%] z-[1000] flex flex-col bg-background text-foreground border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-background">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles size={20} className="text-turquoise" />
            Ask Nurdin AI
          </h3>
          <button
            onClick={toggleChat}
            className="p-2 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close chat"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain"
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
                  "max-w-[85%] px-4 py-3 rounded-2xl text-sm",
                  msg.role === 'user'
                    ? "bg-turquoise text-white dark:text-black rounded-br-sm font-medium"
                    : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-sm"
                )}
              >
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-800 prose-a:text-turquoise prose-strong:text-foreground">
                    <TypewriterMarkdown content={msg.content} onUpdate={scrollToBottom} />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-background">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Nurdin's experience..."
              disabled={isLoading}
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-foreground placeholder-zinc-500 border-none outline-none focus:ring-2 focus:ring-turquoise rounded-2xl px-5 py-3 text-sm disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-2xl bg-turquoise text-white dark:text-black disabled:opacity-50 hover:opacity-90 transition-opacity"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <div
        className={clsx(
          "fixed bottom-6 right-6 z-40 transition-all duration-300",
          isOpen ? "translate-x-32 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        )}
      >
        <button
          onClick={toggleChat}
          className="flex items-center justify-center gap-2 px-5 h-14 bg-turquoise text-white dark:text-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-semibold"
          aria-label="Open chat"
        >
          <Sparkles size={20} className="text-white fill-white dark:text-black dark:fill-black" />
          <span>Ask Nurdin AI</span>
        </button>
      </div>
    </>
  );
}
