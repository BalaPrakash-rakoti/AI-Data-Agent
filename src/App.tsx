import { useState } from 'react';
import { Message } from './types';
import { ChatInterface } from './components/Chat/ChatInterface';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SchemaViewer } from './components/DatabaseSchema/SchemaViewer';
import { motion } from 'framer-motion';
import { generateId } from './lib/utils';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      type: 'assistant',
      content: `Welcome to **AI Data Agent**! 🚀 

I'm your intelligent analytics assistant, designed to handle complex business questions from SQL databases with challenging schemas and dirty data.

**What I can help you with:**
- **Revenue & Sales Analysis** - Trend analysis, forecasting, performance metrics
- **Customer Insights** - Lifetime value, churn analysis, segmentation  
- **Product Performance** - Category analysis, profitability, inventory insights
- **Regional Comparisons** - Geographic performance, market analysis
- **Complex Analytical Queries** - Multi-table joins, advanced aggregations

**I excel at handling:**
✅ Messy schemas with unnamed columns  
✅ Dirty data with inconsistencies  
✅ Complex multi-table relationships  
✅ Vague business questions requiring clarification  

Just ask me anything about your data in natural language, and I'll generate the appropriate SQL queries, analyze results, and create visualizations to help you make data-driven decisions.

Try asking: *"Show me revenue trends by region"* or *"Which customers have the highest lifetime value?"*`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <ChatInterface
            messages={messages}
            setMessages={setMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case 'schema':
        return <SchemaViewer />;
      case 'analytics':
        return (
          <div className="p-6 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h2>
              <p>Advanced analytics features coming soon...</p>
              <p className="mt-2 text-sm">Use the AI chat to generate insights and visualizations for now.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
              <p>Configuration options coming soon...</p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Documentation</h2>
            
            <div className="grid gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Sample Questions to Try
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Revenue Analysis:</strong> "Show me sales trends over time" | "Compare revenue by region"</p>
                  <p><strong>Customer Insights:</strong> "Which customers have highest lifetime value?" | "Analyze customer churn patterns"</p>
                  <p><strong>Product Performance:</strong> "How are different categories performing?" | "Find underperforming products"</p>
                  <p><strong>Complex Queries:</strong> "Show quarterly growth by region and category" | "Identify revenue anomalies"</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Technical Capabilities
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Handling:</h4>
                    <ul className="space-y-1">
                      <li>• Complex schema interpretation</li>
                      <li>• Dirty data cleaning suggestions</li>
                      <li>• Unnamed column inference</li>
                      <li>• Relationship discovery</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Query Features:</h4>
                    <ul className="space-y-1">
                      <li>• Multi-table joins</li>
                      <li>• Advanced aggregations</li>
                      <li>• Window functions</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {activeTab === 'chat' && 'AI Assistant'}
                {activeTab === 'schema' && 'Database Schema'}
                {activeTab === 'analytics' && 'Analytics Dashboard'}
                {activeTab === 'settings' && 'Settings'}
                {activeTab === 'help' && 'Help & Documentation'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activeTab === 'chat' && 'Ask complex analytical questions in natural language'}
                {activeTab === 'schema' && 'Explore your database structure and data quality'}
                {activeTab === 'analytics' && 'View comprehensive analytics and reports'}
                {activeTab === 'settings' && 'Configure your AI Data Agent'}
                {activeTab === 'help' && 'Learn how to get the most from your AI assistant'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Database Connected</span>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="flex-1 overflow-hidden"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}

export default App;