# AI Data Agent

## Overview

**AI Data Agent** is an advanced analytics platform that enables users to interact with their SQL databases using natural language. It is designed to answer complex business questions, even on databases with challenging schemas and dirty data, and presents responses in plain language with relevant tables and charts. This project was developed as part of an SDE hiring assessment.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [File & Directory Structure](#file--directory-structure)
- [Technologies Used](#technologies-used)
- [Setup & Running Locally](#setup--running-locally)
- [Usage](#usage)
- [Example Queries](#example-queries)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Conversational Interface:** Ask analytical and business questions in natural language.
- **Database Schema Explorer:** Visualize tables, columns, and data issues (including messy schemas and NULLs).
- **Automated Analytics:** Get natural language answers, tables, and charts for your queries.
- **Dirty Data Handling:** Built-in strategies for dealing with missing, inconsistent, or unnamed data.
- **Multi-Tab UI:** Switch easily between Chat, Schema, Analytics, Settings, and Help.
- **Mock Data & Query Simulation:** The current version uses realistic mock data and query simulation to demonstrate capabilities.

---

## Architecture

The project is structured as a modern **React + TypeScript** SPA (Single Page Application), styled with **TailwindCSS** and leveraging animation and icon libraries for a polished UI. The analytics agent logic and database interactions are simulated in the frontend, but the architecture is ready for backend extension.

### Core Components

- **App.tsx:** Main application controller, handles tab navigation and state.
- **Sidebar:** Navigation for switching between main features.
- **ChatInterface:** The conversational AI chat window.
- **SchemaViewer:** Schema exploration and data quality visualization.
- **queryProcessor.ts:** Simulates the backend logic for query interpretation and response generation.

---

## File & Directory Structure

```
AI-Data-Agent/
│
├── index.html                   # Main HTML entry point
├── tailwind.config.js           # TailwindCSS configuration
├── README.md                    # Project documentation
│
└── src/
    ├── App.tsx                  # Main React component
    ├── lib/
    │   └── utils.ts             # Utility functions (ID gen, formatting, etc.)
    ├── components/
    │   ├── Sidebar/
    │   │   └── Sidebar.tsx      # Sidebar navigation
    │   ├── Chat/
    │   │   └── ChatInterface.tsx# Conversational chat UI
    │   └── DatabaseSchema/
    │       └── SchemaViewer.tsx # Database schema explorer
    ├── services/
    │   └── queryProcessor.ts    # Simulated query engine
    └── types.ts                 # TypeScript type definitions
```

### File Purposes

- **index.html:** Boots the React application.
- **tailwind.config.js:** Styles the app using utility-first CSS.
- **src/App.tsx:** Orchestrates the main UI, tab switching, and chat state.
- **src/components/Sidebar/Sidebar.tsx:** Sidebar with navigation and quick info.
- **src/components/Chat/ChatInterface.tsx:** Handles message input, display, and quick-suggestion queries.
- **src/components/DatabaseSchema/SchemaViewer.tsx:** Visualizes tables, columns, and highlights data issues using mock data.
- **src/services/queryProcessor.ts:** Contains the logic to parse user queries, simulate SQL generation, and return mock analytics and visualizations.
- **src/lib/utils.ts:** General utility functions (class merging, number formatting, ID generation).
- **src/types.ts:** Type definitions for messages and data structures.

---

## Technologies Used

- **React 18** (TypeScript) – SPA frontend framework
- **TailwindCSS** – Utility-first styling
- **Framer Motion** – Animations and transitions
- **Lucide-react** – Icon set
- **(Mocked) SQL backend** – Simulated in queryProcessor.ts
- **(Ready for) GenAI/LLM integration** – Designed for future integration with real LLM APIs (e.g., OpenAI, Anthropic)
- **Charting Library** – (Expected for full analytics; currently visualization is described in mock responses)

---

## Setup & Running Locally

1. **Clone the repository**

   ```sh
   git clone https://github.com/BalaPrakash-rakoti/AI-Data-Agent.git
   cd AI-Data-Agent
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Run the development server**

   ```sh
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173`

---

## Usage

- **AI Assistant Tab:** Type any business or analytics question. The agent will interpret your question, simulate SQL, and return natural language answers with mock tables/metrics.
- **Database Schema Tab:** View discovered tables, columns, row counts, column types, and warnings about data quality or schema issues.
- **Analytics Tab:** Placeholder for future dashboard features.
- **Settings Tab:** Placeholder for configuration in future versions.
- **Help Tab:** Shows example questions, feature explanations, and technical capabilities.

---

## Example Queries

- "Show me sales trends over time"
- "Compare revenue by region"
- "Which customers have the highest lifetime value?"
- "Find anomalies in product sales"
- "How are different categories performing?"

---

## Screenshots

> You can add screenshots here to illustrate the UI and features.

---

## License

This project is for assessment and demonstration purposes only.

---

## Author

[BalaPrakash-rakoti](https://github.com/BalaPrakash-rakoti)
