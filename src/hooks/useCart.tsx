import { Product } from "@/types/cartItems";
import { ReactNode, createContext, useContext, useState } from "react";

interface useCartProps {
  children: ReactNode;
}

interface CartContextData {
  cartItems: Product[];
  setCartItems: (cartItems: Product[]) => void;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: useCartProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { useCart, CartProvider };
