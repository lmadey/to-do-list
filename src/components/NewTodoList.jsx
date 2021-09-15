import React, { useContext, useState, useEffect } from  "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { LoginInput } from "./Login";
import { TaskItem } from "./TaskItem";
import { NewTaskInput } from "./NewTaskInput";
import { TodoListsContext } from "../contexts/TodoListsContext";
import { TokenContext } from "../contexts/TokenContext";
import api from "../api/todoLists";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${Colors.darkHover};
    backdrop-filter: blur(25px);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 2;
`;

const NewTodo = styled.div`
    position: relative;
    width: 1162px;
    height: 1312px;
    background-color: ${Colors.grey};
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    width: 90%;
    border-bottom: 4px solid ${Colors.primary};
    `;

const NewTodoInput = styled(LoginInput)`
    width: 100%;
    margin: 36px 0 61px 0;
`;

const ButtonWrapper = styled.div`
    width: 90%;
    position: absolute;
    bottom: 43px;
    display: flex;
    justify-content: space-between;
`;

const SaveBtn = styled.button`
    width: 240px;
    height: 78px;
    background-color: ${Colors.primary};
    font-size: 36px;
    color: ${Colors.white};
    border-radius: 8px; 
    transition: color, background-color .3s;

    :hover{
        color: ${Colors.primary};
        background-color: ${Colors.white};
    }
`;

const CancelBtn = styled.button`
    font-size: 48px;
    color: ${Colors.primary};
    font-weight: 300;
    transition: color .3s;

    :hover{
        color: ${Colors.white};
    }
`;

export const NewTodoList = ({ setIsNewTodoList, setClickedList, clickedList }) => {

    const [ , fetchTodoLists] = useContext(TodoListsContext);
    const [token] = useContext(TokenContext);
    const [taskList, setTaskList] = useState([]);
    const [todoListName, setTodoListName] = useState("");

    const saveTodoList = async () => {
        try{
            await api.post("/to-do-lists", {name: todoListName, task: taskList }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchTodoLists();
        }catch(err){
            console.log(err.message);
        }
    }

    const todoListNameHandler = (e) => {
        setTodoListName(e.target.value)
    }

    const onChangeHandler = (item) => {
        setTaskList((currentTasks) => {
          return currentTasks.map((task) => {
              if(task === item) {
                  return item;
              }
              return task;
          })
        })
    }

    const onDeleteHandler = (task) => {
        setTaskList(taskList.filter(listItem => listItem !== task));
    }

    //EDIT LIST FUNCTIONS

    const [clickedId, setClickedId] = useState("")

    useEffect(() => {
        if(clickedList){
            setTaskList(clickedList[0].task)
            setTodoListName(clickedList[0].name)
            setClickedId(clickedList[0].id)
            // console.log(todoLists);
        }
    }, [clickedList]);

    const editTodo = async (id) => {
        if(clickedList){
            const updatedTodo = { name: todoListName, task: taskList }
            try{
                await api.put(`/to-do-lists/${id}`, updatedTodo, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })  
                fetchTodoLists()
            }catch(err) {
                console.log(err.message);
            }
        }
    }

    //ON SAVE, ON CANCEL

    const onSave = () => {
        if(todoListName){
            setIsNewTodoList(false);
            setClickedList(null);
            editTodo(clickedId);
            if(!clickedList){
                saveTodoList()
            }
        }else{
            alert("You try to add new list without name");
        }
    }
    
    const onCancel = () => {
        setIsNewTodoList(false);
        setClickedList(null);
    }

    return(
        <Wrapper>
            <NewTodo>
                <InputWrapper>
                    <NewTodoInput
                    value={todoListName} 
                    onChange={todoListNameHandler}
                    placeholder="List name"/>
                </InputWrapper>
                {taskList.map((task, index) => (
                    <TaskItem  
                    task={task}
                    onDelete={() => onDeleteHandler(task)}
                    onChange={onChangeHandler}
                    key={index}/>
                ))}
                <NewTaskInput 
                taskList={taskList}
                setTaskList={setTaskList}
                />

                <ButtonWrapper>
                    <CancelBtn onClick={onCancel}>CANCEL</CancelBtn>
                    <SaveBtn onClick={onSave}>SAVE</SaveBtn>
                </ButtonWrapper>
            </NewTodo>
        </Wrapper>
    )
}