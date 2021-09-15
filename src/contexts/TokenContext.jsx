import React, { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    
    useEffect(() => {
        if(token){
            localStorage.setItem("token", token)
        }
    }, [token])

    return(
        <TokenContext.Provider value={[token, setToken]}>
            {children}
        </TokenContext.Provider>
    )
}