import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useReducer } from 'react'
import cartReducer from '../utilities/reducer'


const CartContext = createContext()

export const useCart = () => useContext(CartContext)


const CartContextProvider = ({ children }) => {
    const initialState = {
        cart: [],
        total: 0,
    }
    const [cartState, dispatch] = useReducer(cartReducer, initialState )

    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider

