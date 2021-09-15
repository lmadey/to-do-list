import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LoginInput } from "./Login";
import { TokenContext } from "../contexts/TokenContext";

const SearchInput = styled(LoginInput)`
    width: 482px;
    margin: 0;
`;

export const SearchAllTodoLists = ({ onChange }) => {

    const [inputText, setInputText] = useState("");

    const inputHandler = (e) => {
        setInputText(e.target.value)
        onChange(e.target.value);
    }
    

    return(
        <>
        <SearchInput
        value={inputText} 
        onChange={inputHandler}
        placeholder="search" 
        type="text" />
        </>
    )
} 