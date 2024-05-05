import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "./actionTypes";

const initialState = {
  cart: [],
  total: 0,
  quantity: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      } else {
        //if product is not in the cart
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }], // Add quantity field to the product
          total: state.total + action.payload.price,
        };
      }
    case DECREMENT_QUANTITY:
      const existingCartItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingCartItem && existingCartItem.quantity > 1) {
        //IF quantity is greater than 1
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          ),
          total: state.total - action.payload.price,
        };
      }
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: state.total + action.payload.price,
      };

    case REMOVE_FROM_CART: //removing item from cart
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),

        total: state.total - action.payload.price * action.payload.quantity,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        total: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
