import React, { useState, createContext, useEffect, useContext } from "react";
import { TokenContext } from "./TokenContext"
import api from "../api/todoLists";

export const TodoListsContext = createContext();

export const TodoListsProvider = ({ children }) => {

    const [todoLists, setTodoLists] = useState([])
    const [token] = useContext(TokenContext)

    useEffect(() => {
        const fetchTodos = async () => {
            try{
                const res = await api.get("/to-do-lists", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setTodoLists(res.data);

            }catch(err){
                console.log(err.message);
            }
        } 
        fetchTodos();
    }, [])
    return(
        <TodoListsContext.Provider value={[todoLists, setTodoLists]}>
            {children}
        </TodoListsContext.Provider>
    )
}