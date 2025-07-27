"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/lib/types';

interface CartContextType {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (item: Product) => {
    // Avoid adding duplicates
    if (!cartItems.find(cartItem => cartItem.id === item.id)) {
      setCartItems(prevItems => [...prevItems, item]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
