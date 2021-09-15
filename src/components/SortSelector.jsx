import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { TodoListsContext } from "../contexts/TodoListsContext";
import { ReactComponent as ArrowUp } from "../icons/arrow-up.svg";

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
    {value: "name", label: "name"},
    {value: "published_at", label: "published at"}
]

export const SortSelector = () => {

    const [isSelectorActive, setIsSelectorActive] = useState(false);
    const [selectorValue, setSelectorValue] = useState(null);
    const [ , , setSort] = useContext(TodoListsContext);

    useEffect(() => {
        if(selectorValue){
            setSort(selectorValue.value)
        }
        setIsSelectorActive(false);
    }, [selectorValue])

    return(
        <Selector style={{height: isSelectorActive ? "150px" : "50px"}}>
            <SelectorMain onClick={() => setIsSelectorActive(!isSelectorActive)}>
                <IconWrapper style={{transform: isSelectorActive ? "rotate(180deg)" : ""}}>
                    <ArrowUp />
                </IconWrapper>
            <p>{selectorValue ? selectorValue.label : "sort by"}</p>
            <span></span>
            </SelectorMain>
            {selectorOptions.map((option, index) => (
                <SelectorOption 
                key={index}
                onClick={() => setSelectorValue(option)}><p>{option.label}</p>
                </SelectorOption>
            ))}
        </Selector>
    )    


}