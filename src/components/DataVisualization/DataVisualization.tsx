import { Visualization } from '../../types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Activity } from 'lucide-react';
import { formatNumber } from '../../lib/utils';

interface DataVisualizationProps {
  visualization: Visualization;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6B7280'];

export function DataVisualization({ visualization }: DataVisualizationProps) {
  if (visualization.type === 'metric') {
    return <MetricVisualization data={visualization.data} title={visualization.title} />;
  }

  if (visualization.type === 'table') {
    return <TableVisualization data={visualization.data} title={visualization.title} />;
  }

  if (visualization.type === 'chart') {
    return <ChartVisualization data={visualization.data} config={visualization.config} title={visualization.title} />;
  }

  return null;
}

function MetricVisualization({ data, title }: { data: any; title: string }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <DollarSign className="w-6 h-6" />;
      case 'users': return <Users className="w-6 h-6" />;
      case 'products': return <Package className="w-6 h-6" />;
      case 'growth': return data.change > 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics?.map((metric: any, index: number) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-600 dark:text-gray-400">
                {getIcon(metric.type)}
              </div>
              {metric.change !== undefined && (
                <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(metric.value)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableVisualization({ data, title }: { data: any; title: string }) {
  const { columns, rows } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {columns.map((column: string, index: number) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.slice(0, 10).map((row: any[], index: number) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {typeof cell === 'number' ? formatNumber(cell) : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 10 && (
          <div className="px-6 py-3 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            Showing 10 of {rows.length} rows
          </div>
        )}
      </div>
    </div>
  );
}

function ChartVisualization({ data, config, title }: { data: any; config: any; title: string }) {
  const renderChart = () => {
    switch (config?.type) {
      case 'line':
        return (
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={config.xKey} className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            {config.yKeys?.map((key: string, index: number) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={config.xKey} className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            {config.yKeys?.map((key: string, index: number) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={COLORS[index % COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data.chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey={config.valueKey}
            >
              {data.chartData?.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      default:
        return <div className="text-center text-gray-500">Unsupported chart type</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}