import { ActionTypes } from "@/reducers/products/actionTypes";
import { cartItemsReducer } from "@/reducers/products/reducer";
import { Product, ProductProps } from "@/types/cartItems";
import { productsInCartKey } from "@/types/keys";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface useCartProps {
  children: ReactNode;
}

interface CartContextData {
  cartItems: Product[];
  addProductsInCart: (product: Product) => void;
  removeAllProducts: (product: Product) => void;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: useCartProps) {
  const [cartItems, dispatch] = useReducer(cartItemsReducer, [], () => {
    if (typeof window !== "undefined") {
      try {
        const storageStateAsJSON = localStorage.getItem(productsInCartKey);

        return storageStateAsJSON ? JSON.parse(storageStateAsJSON) : [];
      } catch (error) {
        console.error("Failed to parse localStorage data", error);
        return [];
      }
    }

    return [];
  });

  /**
   * Adiciona um novo produto ao carrinho de compras, com a quantidade informada.
   *
   * @param product Objeto do produto a ser adicionado ao carrinho.
   * @param productQuantity Quantidade do produto a ser adicionado ao carrinho.
   */
  function addProductsInCart(product: Product) {
    const newProduct = {
      ...product,
    };

    dispatch({
      type: ActionTypes.ADD_NEW_PRODUCT,
      payload: {
        newProduct,
      },
    });
  }

  /**
   * Remover completamente um produto do estado global do carrinho, independentemente da sua quantidade.
   *
   * @param product Objeto do produto que será removido do carrinho.
   */
  function removeAllProducts(product: Product) {
    dispatch({
      type: ActionTypes.REMOVE_PRODUCT,
      payload: {
        product,
      },
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined" && cartItems.length > 0) {
      const stateJSON = JSON.stringify(cartItems);

      localStorage.setItem(productsInCartKey, stateJSON);
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProductsInCart,
        removeAllProducts,
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
