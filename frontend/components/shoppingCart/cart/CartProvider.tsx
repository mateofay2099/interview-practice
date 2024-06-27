import { createContext, useCallback, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((acc, product) => acc + product.count, 0);

  const updateCartItemCount = (product, count) => {
    setCart((prevCart) => {
      const filteredCart = prevCart.filter((p) => p.id !== product.id);

      if (count <= 0) {
        return filteredCart;
      }

      return [...filteredCart, { ...product, count }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
