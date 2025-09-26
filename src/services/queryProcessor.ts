import { QueryResult, Visualization } from '../types';

// Mock database with realistic but messy data
const mockDatabase = {
  sales_data_2023: [
    { id: 1, region: 'North America', product_cat: 'Electronics', revenue: 150000, quarter: 'Q1' },
    { id: 2, region: 'Europe', product_cat: 'Clothing', revenue: 89000, quarter: 'Q1' },
    { id: 3, region: 'Asia', product_cat: 'Electronics', revenue: 234000, quarter: 'Q1' },
    { id: 4, region: 'North America', product_cat: 'Electronics', revenue: 178000, quarter: 'Q2' },
    { id: 5, region: 'Europe', product_cat: 'Clothing', revenue: 92000, quarter: 'Q2' },
    { id: 6, region: 'Asia', product_cat: 'Electronics', revenue: 267000, quarter: 'Q2' },
    { id: 7, region: 'North America', product_cat: 'Home & Garden', revenue: 143000, quarter: 'Q3' },
    { id: 8, region: 'Europe', product_cat: 'Electronics', revenue: 198000, quarter: 'Q3' },
    { id: 9, region: 'Asia', product_cat: 'Clothing', revenue: 156000, quarter: 'Q3' },
  ],
  customer_metrics: [
    { cust_id: 101, lifetime_val: 5420, acquisition_date: '2023-01-15', status: 'active' },
    { cust_id: 102, lifetime_val: 3210, acquisition_date: '2023-02-03', status: 'active' },
    { cust_id: 103, lifetime_val: 8901, acquisition_date: '2023-01-28', status: 'churned' },
    { cust_id: 104, lifetime_val: 2156, acquisition_date: '2023-03-10', status: 'active' },
    { cust_id: 105, lifetime_val: 6789, acquisition_date: '2023-02-14', status: 'active' },
  ]
};

interface ProcessedQuery {
  naturalLanguageResponse: string;
  query: string;
  results: QueryResult;
  visualizations: Visualization[];
}

export async function processUserQuery(userInput: string): Promise<ProcessedQuery> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerInput = userInput.toLowerCase();
  
  // Revenue trends analysis
  if (lowerInput.includes('revenue') || lowerInput.includes('sales') || lowerInput.includes('trend')) {
    return {
      naturalLanguageResponse: `Based on your sales data, I can see clear revenue trends across different regions and quarters. **North America** shows consistent performance in Electronics with growth from Q1 to Q2 ($150K to $178K). **Asia** is your strongest market for Electronics, generating $234K in Q1 and $267K in Q2. **Europe** has diversified performance across categories. Overall, there's a positive growth trajectory in Electronics across most regions.`,
      query: `SELECT region, product_cat, quarter, SUM(revenue) as total_revenue FROM sales_data_2023 GROUP BY region, product_cat, quarter ORDER BY quarter, total_revenue DESC`,
      results: {
        data: mockDatabase.sales_data_2023,
        columns: ['region', 'product_cat', 'quarter', 'revenue'],
        rowCount: 9,
        executionTime: 45
      },
      visualizations: [
        {
          type: 'chart',
          title: 'Revenue Trends by Quarter',
          data: {
            chartData: [
              { quarter: 'Q1', 'North America': 150000, 'Europe': 89000, 'Asia': 234000 },
              { quarter: 'Q2', 'North America': 178000, 'Europe': 92000, 'Asia': 267000 },
              { quarter: 'Q3', 'North America': 143000, 'Europe': 198000, 'Asia': 156000 }
            ]
          },
          config: { type: 'line', xKey: 'quarter', yKeys: ['North America', 'Europe', 'Asia'] }
        },
        {
          type: 'metric',
          title: 'Key Revenue Metrics',
          data: {
            metrics: [
              { type: 'revenue', label: 'Total Revenue', value: 1820000, change: 12.5 },
              { type: 'growth', label: 'Q2 Growth', value: 15.2, change: 15.2 },
              { type: 'products', label: 'Top Category', value: 'Electronics' },
              { type: 'users', label: 'Best Region', value: 'Asia' }
            ]
          }
        }
      ]
    };
  }

  // Customer analysis
  if (lowerInput.includes('customer') || lowerInput.includes('lifetime') || lowerInput.includes('churn')) {
    return {
      naturalLanguageResponse: `Your customer analysis reveals interesting insights: The **average customer lifetime value is $5,295**, with significant variation. Customer 103 has the highest LTV at $8,901 but has churned, indicating potential retention issues with high-value customers. **80% of customers remain active**, which is a healthy retention rate. New customer acquisition peaked in February with strategic onboarding timing.`,
      query: `SELECT cust_id, lifetime_val, acquisition_date, status FROM customer_metrics ORDER BY lifetime_val DESC`,
      results: {
        data: mockDatabase.customer_metrics,
        columns: ['cust_id', 'lifetime_val', 'acquisition_date', 'status'],
        rowCount: 5,
        executionTime: 32
      },
      visualizations: [
        {
          type: 'chart',
          title: 'Customer Lifetime Value Distribution',
          data: {
            chartData: [
              { range: '0-3K', count: 2 },
              { range: '3K-6K', count: 2 },
              { range: '6K+', count: 2 }
            ]
          },
          config: { type: 'bar', xKey: 'range', yKeys: ['count'] }
        },
        {
          type: 'chart',
          title: 'Customer Status Breakdown',
          data: {
            chartData: [
              { name: 'Active', value: 4 },
              { name: 'Churned', value: 1 }
            ]
          },
          config: { type: 'pie', valueKey: 'value' }
        },
        {
          type: 'table',
          title: 'Top Customers by Lifetime Value',
          data: {
            columns: ['Customer ID', 'Lifetime Value', 'Status', 'Acquisition Date'],
            rows: [
              [103, 8901, 'churned', '2023-01-28'],
              [105, 6789, 'active', '2023-02-14'],
              [101, 5420, 'active', '2023-01-15'],
              [102, 3210, 'active', '2023-02-03'],
              [104, 2156, 'active', '2023-03-10']
            ]
          }
        }
      ]
    };
  }

  // Product performance
  if (lowerInput.includes('product') || lowerInput.includes('category') || lowerInput.includes('performance')) {
    return {
      naturalLanguageResponse: `Product category analysis shows **Electronics dominates with 67% of total revenue** ($837K out of $1.25M tracked). This category shows consistent growth across quarters and regions. **Clothing generates $337K (27% of revenue)** with steady performance in Europe and emerging strength in Asia. **Home & Garden is the smallest category at $143K (11%)** but shows promise in North America. I recommend focusing marketing spend on Electronics expansion and investigating Home & Garden growth potential.`,
      query: `SELECT product_cat, SUM(revenue) as total_revenue, COUNT(*) as transactions FROM sales_data_2023 GROUP BY product_cat ORDER BY total_revenue DESC`,
      results: {
        data: mockDatabase.sales_data_2023,
        columns: ['product_cat', 'total_revenue', 'transactions'],
        rowCount: 3,
        executionTime: 28
      },
      visualizations: [
        {
          type: 'chart',
          title: 'Revenue by Product Category',
          data: {
            chartData: [
              { name: 'Electronics', value: 837000 },
              { name: 'Clothing', value: 337000 },
              { name: 'Home & Garden', value: 143000 }
            ]
          },
          config: { type: 'pie', valueKey: 'value' }
        },
        {
          type: 'chart',
          title: 'Category Performance by Quarter',
          data: {
            chartData: [
              { quarter: 'Q1', Electronics: 384000, Clothing: 89000, 'Home & Garden': 0 },
              { quarter: 'Q2', Electronics: 445000, Clothing: 92000, 'Home & Garden': 0 },
              { quarter: 'Q3', Electronics: 198000, Clothing: 156000, 'Home & Garden': 143000 }
            ]
          },
          config: { type: 'bar', xKey: 'quarter', yKeys: ['Electronics', 'Clothing', 'Home & Garden'] }
        }
      ]
    };
  }

  // Regional performance
  if (lowerInput.includes('region') || lowerInput.includes('geographic') || lowerInput.includes('compare')) {
    return {
      naturalLanguageResponse: `Regional analysis reveals distinct market characteristics: **Asia leads with $657K total revenue (51% of business)**, showing exceptional strength in Electronics. **North America contributes $471K (37%)** with consistent Electronics performance and emerging Home & Garden presence. **Europe generates $379K (30%)** but shows the most diversified product mix and recent growth in Electronics. Asia and North America show complementary strengths, while Europe presents expansion opportunities across all categories.`,
      query: `SELECT region, SUM(revenue) as total_revenue, COUNT(DISTINCT product_cat) as categories FROM sales_data_2023 GROUP BY region ORDER BY total_revenue DESC`,
      results: {
        data: mockDatabase.sales_data_2023,
        columns: ['region', 'total_revenue', 'categories'],
        rowCount: 3,
        executionTime: 41
      },
      visualizations: [
        {
          type: 'chart',
          title: 'Revenue by Region',
          data: {
            chartData: [
              { region: 'Asia', revenue: 657000, growth: 14.1 },
              { region: 'North America', revenue: 471000, growth: 8.3 },
              { region: 'Europe', revenue: 379000, growth: 22.7 }
            ]
          },
          config: { type: 'bar', xKey: 'region', yKeys: ['revenue'] }
        },
        {
          type: 'metric',
          title: 'Regional Performance Metrics',
          data: {
            metrics: [
              { type: 'revenue', label: 'Top Region', value: 'Asia' },
              { type: 'growth', label: 'Fastest Growing', value: 'Europe', change: 22.7 },
              { type: 'products', label: 'Most Diverse', value: 'Europe' },
              { type: 'users', label: 'Total Regions', value: 3 }
            ]
          }
        }
      ]
    };
  }

  // Default response for unrecognized queries
  return {
    naturalLanguageResponse: `I understand you're looking for insights about your data. I can help you analyze **revenue trends**, **customer metrics**, **product performance**, and **regional comparisons**. I work with complex datasets that may have unclear schema or dirty data. 

Try asking me questions like:
- "Show me sales trends by region"
- "Which customers have the highest lifetime value?"
- "How are different product categories performing?"
- "Compare performance across regions"

I'll generate the appropriate SQL queries, analyze the results, and provide visualizations to help you understand your data better.`,
    query: `SELECT COUNT(*) as total_records FROM sales_data_2023`,
    results: {
      data: [{ total_records: 9 }],
      columns: ['total_records'],
      rowCount: 1,
      executionTime: 15
    },
    visualizations: [
      {
        type: 'metric',
        title: 'Database Overview',
        data: {
          metrics: [
            { type: 'database', label: 'Total Records', value: 14 },
            { type: 'products', label: 'Tables', value: 2 },
            { type: 'activity', label: 'Data Sources', value: 'Sales, Customers' },
            { type: 'users', label: 'Ready to Query', value: '✓' }
          ]
        }
      }
    ]
  };
}