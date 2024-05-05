import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../utilities/CartReducer";


export default configureStore({
    reducer: {
        cart: CartReducer
    }
})