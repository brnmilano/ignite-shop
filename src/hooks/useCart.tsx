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
  /**
   * @description Estado que armazena os produtos no carrinho.
   */
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  /**
   * @description Calcula o valor total dos itens no carrinho.
   * @returns {number} Retorna o valor somado entre a quantidade de itens e
   * valor dos itens.
   */
  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  /**
   * @description Adiciona um novo produto ao carrinho.
   * @param product - Objeto do produto a ser adicionado ao carrinho.
   */
  function addToCart(product: IProduct) {
    setCartItems((state) => {
      const newProduct = [...state, product];

      localStorage.setItem(productsInCartKey, JSON.stringify(newProduct));

      return newProduct;
    });
  }

  /**
   * @description Remove um produto específico do carrinho.
   * @param productId - ID do produto a ser removido do carrinho.
   */
  function removeCartItem(productId: string) {
    setCartItems((state) => {
      const removeProduct = [...state.filter((item) => item.id !== productId)];

      localStorage.setItem(productsInCartKey, JSON.stringify(removeProduct));

      return removeProduct;
    });
  }

  /**
   * @description Verifica se um produto específico já existe no carrinho.
   * @param productId - ID do produto a ser verificado.
   * @returns {boolean} Retorna true se o produto já existir no carrinho.
   */
  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  /**
   * @description Verifica se o objeto window existe, ou seja, está do lado do
   * cliente (navegador). Caso a condição seja true, obtem o valor do localStorage
   * e seta o estado de cartItems com o valor obtido. Caso ocorra algum erro, seta
   * o estado de cartItems com um array vazio.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storageStateAsJSON = localStorage.getItem(productsInCartKey);

        setCartItems(storageStateAsJSON ? JSON.parse(storageStateAsJSON) : []);
      } catch (error) {
        setCartItems([]);
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

  return value;
}

export { useCart, CartProvider };
