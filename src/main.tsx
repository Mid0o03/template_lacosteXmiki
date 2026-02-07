
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { I18nProvider } from './contexts/I18nContext';
import { CartProvider } from './contexts/CartContext';
import '../style.css'; // Global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <I18nProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </I18nProvider>
        </BrowserRouter>
    </React.StrictMode>
);
