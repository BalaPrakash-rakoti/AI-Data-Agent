import { Database, Table, Columns2 as Columns, Key, Link } from 'lucide-react';
import { motion } from 'framer-motion';

const mockSchema = {
  tables: [
    {
      name: 'sales_data_2023',
      description: 'Quarterly sales data with regional breakdown',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, description: 'Primary key' },
        { name: 'region', type: 'VARCHAR(50)', nullable: false, description: 'Geographic region' },
        { name: 'product_cat', type: 'VARCHAR(100)', nullable: true, description: 'Product category (messy data)' },
        { name: 'revenue', type: 'DECIMAL(10,2)', nullable: false, description: 'Revenue amount' },
        { name: 'quarter', type: 'VARCHAR(10)', nullable: false, description: 'Quarterly period' }
      ],
      rowCount: 9,
      issues: ['Inconsistent category naming', 'Some NULL values in product_cat']
    },
    {
      name: 'customer_metrics',
      description: 'Customer lifetime value and status tracking',
      columns: [
        { name: 'cust_id', type: 'INTEGER', nullable: false, description: 'Customer identifier' },
        { name: 'lifetime_val', type: 'DECIMAL(8,2)', nullable: true, description: 'Lifetime value calculation' },
        { name: 'acquisition_date', type: 'DATE', nullable: false, description: 'Customer acquisition date' },
        { name: 'status', type: 'VARCHAR(20)', nullable: false, description: 'Current customer status' }
      ],
      rowCount: 5,
      issues: ['Unnamed foreign key relationships', 'Status values not standardized']
    }
  ]
};

export function SchemaViewer() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Database Schema</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyzing complex schema with potential data quality issues
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Database className="w-4 h-4" />
          <span>{mockSchema.tables.length} tables discovered</span>
        </div>
      </div>

      <div className="grid gap-6">
        {mockSchema.tables.map((table, index) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Table className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {table.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {table.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {table.rowCount} rows
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {table.columns.length} columns
                  </div>
                </div>
              </div>

              {table.issues.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    Data Quality Issues Detected:
                  </h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    {table.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Columns className="w-4 h-4" />
                        <span>Column</span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nullable
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {table.columns.map((column, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {column.name === 'id' || column.name === 'cust_id' ? (
                            <Key className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <div className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {column.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                          {column.type}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          column.nullable 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {column.nullable ? 'Nullable' : 'Not Null'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {column.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          AI Schema Analysis Capabilities
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Handles Complex Scenarios:</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Unnamed or poorly named columns</li>
              <li>• Inconsistent data types</li>
              <li>• Missing foreign key definitions</li>
              <li>• Dirty or incomplete data</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Smart Query Generation:</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Infers relationships from data patterns</li>
              <li>• Handles NULL values gracefully</li>
              <li>• Suggests data cleaning approaches</li>
              <li>• Optimizes queries for performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}