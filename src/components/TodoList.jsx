import React, { useContext } from "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { TodoListsContext } from "../contexts/TodoListsContext";
import { TokenContext } from "../contexts/TokenContext";
import { MdDelete } from "react-icons/md";
import api from "../api/todoLists";

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    background-color: ${Colors.grey};
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 35px;
    color: ${Colors.white};
    cursor: pointer;
    transition: opacity .3s;
    font-size: 24px;
    margin-bottom: 36x;

    :hover{
        opacity: .7;
    }
`;

const DataWrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${Colors.white};
    font-size: 24px;
`;

const NameP = styled.p`
    font-weight: bold;
    width: 15%;
`;

const DateP = styled.p`
    font-weight: 400;
    font-style: italic;
`;

const CompletedP = styled.p`
    font-weight: 300;
`;

const IconWrapper = styled.div`
    font-size: 45px;
    margin-left: 25px;
    :hover{
        color: ${Colors.primary}
    }
`;

export const TodoList = ({ list, setClickedList, setIsNewTodoList }) => {

    const uncompletedTasks = list.task.filter(task => task.isDone === false);
    const completedTask = list.task.filter(task => task.isDone === true);
    const [todoLists, setTodoLists] = useContext(TodoListsContext);
    const [token] = useContext(TokenContext);
    
    const onDelete = async () => {
        try{
            await api.delete(`/to-do-lists/${list.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTodoLists(todoLists.filter(todoList => todoList.id !== list.id));
        }catch(err){
            console.log(err.message);
        }
    }
    
    const clickedListHandler = () => {
        setClickedList(todoLists.filter(todoList => todoList.id === list.id));
        setIsNewTodoList(true)
    }
    
    return(
        <Wrapper>
            <DataWrapper onClick={clickedListHandler}>
                <NameP>{list.name}</NameP>
                <DateP>Created at {list.published_at.slice(0, 10)}</DateP>
                <CompletedP>
                    {`
                    Completed: ${completedTask.length}
                    Uncompleted: ${uncompletedTasks.length}
                    All: ${list.task.length}`}
                </CompletedP>
            </DataWrapper>
            <IconWrapper>
                <MdDelete onClick={onDelete}/>
            </IconWrapper>
        </Wrapper>
    )
}