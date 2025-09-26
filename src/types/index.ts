export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  query?: string;
  results?: QueryResult;
  visualizations?: Visualization[];
}

export interface QueryResult {
  data: Record<string, any>[];
  columns: string[];
  rowCount: number;
  executionTime: number;
  query: string;
}

export interface Visualization {
  type: 'chart' | 'table' | 'metric';
  title: string;
  data: any;
  config?: any;
}

export interface DatabaseSchema {
  tables: Table[];
  relationships: Relationship[];
}

export interface Table {
  name: string;
  columns: Column[];
  rowCount: number;
  description?: string;
}

export interface Column {
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
}

export interface Relationship {
  from: string;
  to: string;
  type: 'one-to-many' | 'many-to-many' | 'one-to-one';
}