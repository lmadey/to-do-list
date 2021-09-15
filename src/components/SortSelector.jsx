import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { TodoListsContext } from "../contexts/TodoListsContext";
import { TokenContext } from "../contexts/TokenContext";
import { ReactComponent as ArrowUp } from "../icons/arrow-up.svg";
import api from "../api/todoLists"

const Selector = styled.div`
    height: 200px;
    width: 265px;
    background-color: ${Colors.white};
    color: ${Colors.black};
    border-radius: 8px;
    position: relative;
    font-weight: 300;
    font-size: 24px;
    cursor: pointer;
    overflow-y: hidden;
    z-index: 1;
`;

const SelectorMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${Colors.dark};
    width: 100%;
    height: 50px;
    padding-left: 15px;
`;

const SelectorOption = styled(SelectorMain)`
    :hover{
        background-color: ${Colors.outline};
        color: ${Colors.primary}
    }
`;

const IconWrapper = styled.div``;

const selectorOptions = [
    {value: "name"},
    {value: "most tasks"},
    {value: "most completed"},
    {value: "most uncompleted"},
]

export const SortSelector = () => {

    const [isSelectorActive, setIsSelectorActive] = useState(false);
    const [selectorValue, setSelectorValue] = useState(null);
    const [todoLists, setTodoLists] = useContext(TodoListsContext);
    const [token] = useContext(TokenContext);

    const selectorOptionHandler = (text) => {
        setSelectorValue(text);
        setIsSelectorActive(false);
    }

    const sortFunction = async () => {
        switch(selectorValue){
            case "most tasks":
                try{
                    const res = await api.get("/to-do-lists?_sort=task", {
                        headers: {
                           Authorization: `Bearer ${token}`
                        }
                    })
                    setTodoLists(res.data);
                }catch(err){
                    console.log(err);
                }
            break;
            case "name":
                try{
                    const res = await api.get("/to-do-lists?_sort=name", {
                        headers: {
                           Authorization: `Bearer ${token}`
                        }
                    })
                    setTodoLists(res.data);
                }catch(err){
                    console.log(err);
                }
            break;

            case "most completed":
                try{
                    const res = await api.get("/to-do-lists?_sort=task&_gt=isDone", {
                        headers: {
                           Authorization: `Bearer ${token}`
                        }
                    })
                    // setTodoLists(res.data);
                    console.log(res.data);
                }catch(err){
                    console.log(err);
                }
            break;

            case "most uncompleted":
                try{
                    const res = await api.get("/to-do-lists_sort=task.isDone", {
                        headers: {
                           Authorization: `Bearer ${token}`
                        }
                    })
                    // setTodoLists(res.data);
                    console.log(res.data);
                }catch(err){
                    console.log(err);
                }
            break;

            default:
                break;
        }
    }

    useEffect(() => {
        sortFunction();
        
    }, [selectorValue])

    return(
        <Selector style={{height: isSelectorActive ? "250px" : "50px"}}>
            <SelectorMain onClick={() => setIsSelectorActive(!isSelectorActive)}>
                <IconWrapper style={{transform: isSelectorActive ? "rotate(180deg)" : ""}}>
                    <ArrowUp />
                </IconWrapper>
            <p>{selectorValue ? selectorValue : "sort by"}</p>
            <span></span>
            </SelectorMain>
            {selectorOptions.map((option, index) => (
                <SelectorOption 
                key={index}
                onClick={() => selectorOptionHandler(option.value)}><p>{option.value}</p>
                </SelectorOption>
            ))}
        </Selector>
    )    


}