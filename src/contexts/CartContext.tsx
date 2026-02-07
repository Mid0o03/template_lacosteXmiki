
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../config/products';

export interface CartItem extends Product {
    cartId: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    items: CartItem[];
    wishlist: string[];
    addToCart: (product: Product, size?: string) => void;
    removeFromCart: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    toggleWishlist: (productId: string) => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedCart) setItems(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product: Product, size: string = 'M') => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.size === size);
            if (existingItem) {
                return prev.map(item =>
                    item.cartId === existingItem.cartId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, cartId: `${product.id}-${size}-${Date.now()}`, quantity: 1, size }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId: string) => {
        setItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(cartId);
            return;
        }
        setItems(prev => prev.map(item =>
            item.cartId === cartId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleWishlist = (productId: string) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            wishlist,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleWishlist,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
