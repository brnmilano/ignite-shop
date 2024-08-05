import { Product } from "@/types/cartItems";
import { ActionTypes } from "./actionTypes";

export function cartItemsReducer(
  state: Product[],
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

    case "REMOVE_PRODUCT":
      return [...state.filter((product) => product !== action.payload.product)];
    default:
      return state;
  }
}
