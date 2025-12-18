import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// 🔹 STEP 1: Create anonymous userId
let userId = localStorage.getItem("userId");

if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("userId", userId);
  console.log("New userId created:", userId);
} else {
  console.log("Existing userId:", userId);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
