import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { LoginInput } from "./Login";
import { TodoListsContext } from "../contexts/TodoListsContext";
import { TokenContext } from "../contexts/TokenContext";
import api from "../api/todoLists";

const SearchInput = styled(LoginInput)`
    width: 482px;
    margin: 0;
`;

export const SearchAllTodoLists = () => {

    const [todoLists, setTodoLists] = useContext(TodoListsContext);
    const [token] = useContext(TokenContext)
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const search = async () => {
            try{
                const res = await api.get(`/to-do-lists?%3D=${inputText}`, {
                    headers: {
                       Authorization: `Bearer ${token}`
                    }
                })
                setTodoLists(res.data);
            }catch(err){
                console.log(err);
            }
        }
        console.log(inputText);
        search()
    }, [inputText])

    return(
        <>
        <SearchInput
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)}
        placeholder="search" 
        type="text" />
        </>
    )
} 