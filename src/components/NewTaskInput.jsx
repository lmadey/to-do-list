import React, { useState } from "react";
import styled from "styled-components";
import { CheckBox } from "./TaskItem";
import { TaskWrapper } from "./TaskItem";
import { Colors } from "../Colors";

const Input = styled.input`
    width: 95%;
    overflow-x: hidden;
    height: 50px;
    border-bottom: 1px solid ${Colors.primary};
    padding-left: 20px;
    display: flex;
    align-items: flex-end;
    background-color: transparent;
    color: ${Colors.white};
    font-size: 24px;
    font-weight: 300;
`;

const ButtonWrapper = styled(TaskWrapper)`
    justify-content: flex-end;
    margin-top: 16px;
    `;

const AddBtn = styled.button`
    width: 128px;
    height: 44px;
    background-color: ${Colors.primary};
    border-radius: 8px;
    color: ${Colors.white};
    font-weight: 500;
    font-size: 24px;
    transition: color, background-color .3s;

    :hover{
        color: ${Colors.primary};
        background-color: ${Colors.white}
    }
`;

const CancelBtn = styled(AddBtn)`
    background-color: ${Colors.cancel};
    margin-right: 84px;
    :hover{
        color: ${Colors.cancel};
        background-color: ${Colors.white}
    }
`;

const CheckBoxInput = styled(CheckBox)`
    border: 2px solid ${Colors.black};
    cursor: default;
`;


export const NewTaskInput = ({ taskList, setTaskList, clickedList }) => {

    const [taskName, setTaskName] = useState("");
    
    const taskNameHandler = (e) => {
        setTaskName(e.target.value)
    }
    
    const onSave = () => {
        if(taskName){
            if(clickedList){
                setTaskList([...taskList, { name: taskName, isDone: false }]);
            }
            
            if(!clickedList){
                setTaskList([...taskList, { name: taskName, id: Math.random() * 1000, isDone: false }]);
            }
            setTaskName("");
        }else{
            alert("You try to add ampty task.")
        }
    }


    return(
        <>
            <TaskWrapper>
                <CheckBoxInput />
                <Input 
                placeholder="Task Name"
                value={taskName}
                onChange={taskNameHandler}/>
            </TaskWrapper>

            <ButtonWrapper>
                <CancelBtn onClick={() => setTaskName("")}>CANCEL</CancelBtn>
                <AddBtn onClick={onSave}>ADD</AddBtn>
            </ButtonWrapper>
        </>
    )
}