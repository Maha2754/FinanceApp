import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./index.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";



const data = {
  unpaid_dues: [
  { client: { id: 1, name: "John Doe" }, due_amount: 500, due_date: "2025-12-01" },
  { client: { id: 2, name: "Jane Smith" }, due_amount: 200, due_date: "2025-12-03" },
    { client: { id: 3, name: "Anushree" }, due_amount: 500, due_date: "2025-12-04" },
  { client: { id: 4, name: "Lakshmi" }, due_amount: 100, due_date: "2025-12-03" },

],
  recent_transactions: [
    { id: 101, name: "Jane Smith", client: { id: 2, phone: "0987654321" }, amount: 200, date: "2025-12-03" }
  ],
  results: [
    { id: 3, name: "Mike Ross", amount: "10000", partner: "Partner A", category: "Gold", dues_unpaid: 3 }
  ],
  charts: [
    { partner_id: 1, data: [], layout: {}, chart: "<div>Chart Placeholder</div>" }
  ]
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard data={data} />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
