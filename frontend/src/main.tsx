
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize dark/light mode before rendering to prevent flash
const initializeTheme = () => {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(theme);
};

initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
