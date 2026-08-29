import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- Imported Router
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* The Router wraps everything so we can navigate pages */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)