
import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Claude 3.7 Sonnet, your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response: string;
      
      // Simple responses based on input keywords
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! It's nice to chat with you. How can I assist you today?";
      } else if (lowerInput.includes('how are you')) {
        response = "I'm functioning well, thank you for asking! I'm here to help with any questions or tasks you might have.";
      } else if (lowerInput.includes('weather')) {
        response = "I don't have real-time access to weather data, but I can help you find a weather service or website if you'd like.";
      } else if (lowerInput.includes('game') || lowerInput.includes('play')) {
        response = "Sunrise has a great selection of games! You can check them out by clicking on the Games section from the navigation menu.";
      } else if (lowerInput.includes('theme') || lowerInput.includes('color')) {
        response = "You can change the theme of Sunrise using the theme selector in the top right corner. There are several beautiful themes to choose from!";
      } else {
        response = "That's an interesting question. While I'm just a simple simulation for now, in a real implementation I would connect to Claude 3.7 Sonnet to provide you with helpful, accurate responses to your queries.";
      }
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay to simulate thinking
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    
    // Focus the input when opening
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl z-50 flex items-center space-x-2"
          onClick={toggleChat}
        >
          <span className="hidden sm:inline font-semibold">Ask Claude</span>
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src="https://www.anthropic.com/images/claude_full_color-bkgd_transparent-w52.png" alt="Claude AI" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              height: isMinimized ? '60px' : '500px',
              width: isMinimized ? '300px' : '380px'
            }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col z-50 border border-slate-200 dark:border-slate-700"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage src="https://www.anthropic.com/images/claude_full_color-bkgd_transparent-w52.png" alt="Claude AI" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">Claude 3.7 Sonnet</h3>
                  {!isMinimized && <p className="text-xs opacity-80">Anthropic's AI Assistant</p>}
                </div>
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages area - hidden when minimized */}
            {!isMinimized && (
              <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] ${message.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'} rounded-lg p-3 shadow`}>
                      <div className="flex items-center mb-1">
                        {message.role === 'assistant' && (
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src="https://www.anthropic.com/images/claude_full_color-bkgd_transparent-w52.png" alt="Claude AI" />
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-3 shadow border border-slate-200 dark:border-slate-700 max-w-[75%]">
                      <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input area - hidden when minimized */}
            {!isMinimized && (
              <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-end space-x-2">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Claude something..."
                  className="flex-grow resize-none min-h-[60px] max-h-[120px] p-2 text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
