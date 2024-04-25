import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState("")
    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    )
}

