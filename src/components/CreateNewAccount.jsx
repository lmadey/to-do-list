import React, { useState } from "react";
import { LoginWrapper, LoginInput, LoginBtn, LoginH3 } from "./Login";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Colors } from "../Colors";
import api from "../api/todoLists"


const H3 = styled(LoginH3)`
    margin: 80px 0 100px 0;
`;

const CreateBtn = styled(LoginBtn)`
    margin: 100px 0 300px 0;
`;

const BackBtn = styled.button`
    position: absolute;
    color: ${Colors.white};
    font-size: 50px;
    left: 20px;
    top: 20px;
    transition: color .3s;

    :hover{
        color: ${Colors.primary}
    }
`;

export const CreateNewAccount = () => {
    const [usernameText, setUsernameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [repeatPasswordText, setRepeatPasswordlText] = useState("");
    
    const onCreate = async () => {
        try{
            const res = await api.post("/auth-local-register", { username: usernameText, email: emailText, password: passwordText})
            console.log(res.data);
        }catch(err){
            console.log(err.message);
        }
    } 

    return(
        <LoginWrapper>
            <H3>Create an new account</H3>
            <LoginInput
            value={usernameText}
            onChange={(e) => setUsernameText(e.target.value)} 
            placeholder="Username" 
            type="text" />
            <LoginInput
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)} 
            placeholder="E-mail" 
            type="text" />
            <LoginInput
            value={passwordText}
            onChange={(e) => setPasswordText(e.target.value)} 
            placeholder="Password" 
            type="password" />
            <LoginInput
            value={repeatPasswordText}
            onChange={(e) => setRepeatPasswordlText(e.target.value)} 
            placeholder="Repeat password" 
            type="password" />
            <Link to="./login">
                <CreateBtn onClick={onCreate} >Create</CreateBtn>
            </Link>
            <Link to="login">
                <BackBtn> <BsArrowLeft /> </BackBtn>
            </Link>
        </LoginWrapper>
    )
}