import { Message } from '../../types';
import { User, Bot, Clock, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { DataVisualization } from '../DataVisualization/DataVisualization';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
          : 'bg-gradient-to-r from-green-500 to-teal-600'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block p-4 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        }`}>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        
        {message.query && (
          <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Database className="w-4 h-4" />
              <span>Executed Query</span>
            </div>
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {message.query}
            </code>
          </div>
        )}
        
        {message.results && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Results ({message.results.rowCount} rows, {message.results.executionTime}ms)</span>
              </div>
            </div>
          </div>
        )}
        
        {message.visualizations && message.visualizations.length > 0 && (
          <div className="mt-4 space-y-4">
            {message.visualizations.map((viz, index) => (
              <DataVisualization key={index} visualization={viz} />
            ))}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          {format(message.timestamp, 'HH:mm')}
        </div>
      </div>
    </motion.div>
  );
}