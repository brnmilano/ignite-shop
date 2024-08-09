import { IProduct } from "@/types/cartItems";
import { ActionTypes } from "./actionTypes";

export function cartItemsReducer(
  state: IProduct[],
  action: { type: ActionTypes; payload: any }
) {
  switch (action.type) {
    case "ADD_NEW_PRODUCT": {
      const productExists = state.find(
        (product) => product.id === action.payload.newProduct.id
      );

      if (productExists) {
        return state;
      }

      return [...state, action.payload.newProduct];
    }

    case "INCREASE_PRODUCT_QUANTITY":
      return state.map((product) =>
        product.id === action.payload.increaseOneItem.id
          ? {
              ...product,
              //quantity: product.quantity + 1,
              //totalItemPrice: product.price * (product.quantity + 1),
            }
          : product
      );

    case "DECREASE_PRODUCT_QUANTITY":
      return state.map((product) =>
        product.id === action.payload.decreaseOneItem.id
          ? {
              ...product,
              //quantity: product.quantity - 1,
              //totalItemPrice: product.price * (product.quantity - 1),
            }
          : product
      );

    case "REMOVE_PRODUCT":
      return [...state.filter((product) => product !== action.payload.product)];
    default:
      return state;
  }
}
