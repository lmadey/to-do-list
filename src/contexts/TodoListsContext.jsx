import React, { useState, createContext, useEffect, useContext } from "react";
import { TokenContext } from "./TokenContext"
import api from "../api/todoLists";

export const TodoListsContext = createContext();

export const TodoListsProvider = ({ children }) => {

    const [todoLists, setTodoLists] = useState([])
    const [token] = useContext(TokenContext)
    const [sort, setSort] = useState("");

    const fetchTodoLists = async () => {
        const params = {
            _sort: sort
        }

        const query = Object.keys(params).reduce((acc, curr) => acc + (params[curr] ? `${curr}=${params[curr]}` : ''), '');
        console.log(query);
        try{
            const res = await api.get(`/to-do-lists?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTodoLists(res.data);

        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchTodoLists();
    }, [sort])

    return(
        <TodoListsContext.Provider value={[todoLists, fetchTodoLists, setSort]}>
            {children}
        </TodoListsContext.Provider>
    )
}