"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext({
  items: [],
  addToCart: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((state) => {
      const numericId = Number(product.id);
      const productInCart = state.some(
        (item) => item.id === numericId && item.size === product.size
      );

      if (productInCart) {
        return state.map((item) => {
          if (item.id === numericId && item.size === product.size) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      return [...state, { ...product, id: numericId, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
