import { IProduct } from "@/types/cartItems";
import { productsInCartKey } from "@/types/keys";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface useCartProps {
  children: ReactNode;
}

interface CartContextData {
  cartItems: IProduct[];
  cartTotal: number;
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  checkIfItemAlreadyExists: (productId: string) => boolean;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: useCartProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  // console.log(cartItems.length);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => {
      const newProduct = [...state, product];

      localStorage.setItem(productsInCartKey, JSON.stringify(newProduct));

      return newProduct;
    });
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId));
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  // useEffect(() => {
  //
  // }, [cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storageStateAsJSON = localStorage.getItem(productsInCartKey);

        console.log(storageStateAsJSON);

        setCartItems(storageStateAsJSON ? JSON.parse(storageStateAsJSON) : []);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeCartItem,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const value = useContext(CartContext);

  console.log(value);

  if (!value) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return value;
}

export { useCart, CartProvider };
