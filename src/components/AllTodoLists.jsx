import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SearchAllTodoLists } from "./SearchAllTodoLists";
import { TodoList } from "./TodoList";
import { NewTodoList } from "./NewTodoList";
import { SortSelector } from "./SortSelector"
import { TodoListsContext } from "../contexts/TodoListsContext";
import { TodoListsProvider } from "../contexts/TodoListsContext";
import { ReactComponent as AddBtn } from "../icons/Add-btn.svg";
import { Colors } from "../Colors"

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 170px;
    width: 1175px;
    height: 100%;
`;

const SearchSortWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100px;
`;

const AddBtnWrapper = styled.button`
    position: absolute;
    bottom: -100px;
    right: 0;
    transition: transform .3s;

    :hover{
        transform: scale(1.1);
    }
`;

export const AllTodoLists = () => {
    const [isNewTodoList, setIsNewTodoList] = useState(false);
    const [clickedList, setClickedList] = useState();
    const [filter, setFilter] = useState("")
    
    return(
        <TodoListsProvider>
            <Wrapper>
                <SearchSortWrapper>
                    <SearchAllTodoLists onChange={(value) => setFilter(value)}/>
                    <SortSelector />
                </SearchSortWrapper>
            
                <TodoListsContext.Consumer>
                    {([todoLists]) => (
                        todoLists.filter(item => item.name.includes(filter)).map((list) => (
                            <TodoList
                            list={list}
                            setClickedList={setClickedList}
                            setIsNewTodoList={setIsNewTodoList}
                            key={list.id}/>
                        ))
                    )}
                </TodoListsContext.Consumer>
                
                <AddBtnWrapper>
                    <AddBtn 
                    onClick={() => setIsNewTodoList(true)}/>
                </AddBtnWrapper>
            </Wrapper>
            
            {isNewTodoList && 
            <NewTodoList 
            clickedList={clickedList}
            setClickedList={setClickedList}
            setIsNewTodoList={setIsNewTodoList}/>}
        </TodoListsProvider>
    )
}