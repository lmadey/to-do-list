import React from "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { ReactComponent as CheckMark } from "../icons/check.svg";
import { MdDelete } from "react-icons/md";

export const TaskWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    margin: 10px 53px 0 53px;
`;

export const CheckBox = styled.div`
    width: 24px;
    height: 24px;
    margin: 0 10px 0 20px;
    cursor: pointer;
    position: relative;
`;

const TaskName = styled.div`
    width: 95%;
    overflow-x: hidden;
    height: 50px;
    border-bottom: 1px solid ${Colors.primary};
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    p{  
        font-size: 24px;
        font-weight: 300;
        color: ${Colors.white};
        margin-bottom: 6px;
        width: 90%;
        overflow-x: hidden;
    }
`;

const IconWrapper = styled.div`
    color: ${Colors.white};
    font-size: 35px;
    cursor: pointer;
    margin-right: 25px;

    :hover{
        color: ${Colors.cancel}
    }
`;

const CheckMarkWrapper = styled.div`
    position: absolute;
    left: 2px;
    bottom: 1px;
`;

export const TaskItem = ({ task, onChange, onDelete }) => {

    const isDoneHandler = () => {
        task.isDone = !task.isDone
        onChange(task)
    }

    return(
        <TaskWrapper>
            <CheckBox
            style={{border: task.isDone ? `2px solid ${Colors.done}` : `2px solid ${Colors.black}`}}
            onClick={isDoneHandler}>
                <CheckMarkWrapper>
                    {task.isDone && <CheckMark />}
                </CheckMarkWrapper>
            </CheckBox>
            
            <TaskName>
                <p>{task.name}</p>
                <IconWrapper>
                    <MdDelete onClick={onDelete}/>
                </IconWrapper>
            </TaskName>

        </TaskWrapper>
    )
}