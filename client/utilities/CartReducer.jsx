import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { _id } = action.payload;
            const existingProduct = state.cart.find((item) => item._id === _id);

            if (existingProduct) {
                // If the product already exists in the cart, increment its quantity
                existingProduct.quantity++;
            } else {
                // If the product is not already in the cart, add it with quantity 1
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const { _id } = action.payload;
            state.cart = state.cart.filter((item) => item._id !== _id);
        },
        incrementQuantity: (state, action) => {
            const { _id } = action.payload;
            const existingProduct = state.cart.find((item) => item._id === _id);

            if (existingProduct) {
                existingProduct.quantity++;
            }

        },
        decrementQuantity: (state, action) => {
            const { _id } = action.payload;
            const existingProduct = state.cart.find((item) => item._id === _id);

            if (existingProduct.quantity === 1) {
                const removeItem = state.cart.filter((item) => item._id !== _id);
                state.cart = removeItem
            } else {
                existingProduct.quantity--;
            }

        },
        clearCart: (state) => {
            state.cart = [];
        }
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;