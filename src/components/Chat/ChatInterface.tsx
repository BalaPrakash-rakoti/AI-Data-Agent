import { useState, useEffect, useRef } from 'react';
import { Message } from '../../types';
import { ChatMessage } from './ChatMessage';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateId } from '../../lib/utils';
import { processUserQuery } from '../../services/queryProcessor';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function ChatInterface({ messages, setMessages, isLoading, setIsLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await processUserQuery(input.trim());
      
      const assistantMessage: Message = {
        id: generateId(),
        type: 'assistant',
        content: response.naturalLanguageResponse,
        timestamp: new Date(),
        query: response.query,
        results: response.results,
        visualizations: response.visualizations
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error while processing your query. Please try rephrasing your question or check if the database is accessible.',
        timestamp: new Date()
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-4"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          <Input
            placeholder="Ask me anything about your data... (e.g., 'Show me sales trends by region' or 'Which products are underperforming?')"
            value={input}
            onChange={setInput}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Show me revenue trends over time",
            "Which customers have the highest lifetime value?",
            "Analyze product performance by category",
            "Find anomalies in user behavior",
            "Compare regional sales performance"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200 disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}