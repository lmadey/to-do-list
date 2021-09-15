import React, { useState } from "react";
import { LoginWrapper, LoginInput, LoginBtn, LoginH3, ErrorP } from "./Login";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { Colors } from "../Colors";
import { useHistory, Link } from "react-router-dom";
import api from "../api/todoLists";


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
    const [error, setError] = useState("")
    const history = useHistory();
    
    const onCreate = async () => {
        if(repeatPasswordText === passwordText){
            try{
                const res = await api.post("/auth/local/register", { username: usernameText, email: emailText, password: passwordText})
            }catch(err){
                console.log();
            }
            history.push("/login")
        }else{
            setError("passwords do not match")
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
            type="e-mail" />
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
            <ErrorP>{error}</ErrorP>
            <CreateBtn onClick={onCreate} >Create</CreateBtn>
            <Link to="login">
                <BackBtn> <BsArrowLeft /> </BackBtn>
            </Link>
        </LoginWrapper>
    )
}