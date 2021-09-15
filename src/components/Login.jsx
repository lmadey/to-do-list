import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { TokenContext } from "../contexts/TokenContext";
import { Link } from "react-router-dom";
import api from "../api/todoLists";

export const LoginWrapper = styled.div`
    align-items: center;
    background-color: ${Colors.grey};
    display: flex;
    flex-direction: column;
    margin-top: 245px;
    position: relative;
`;

export const LoginH3 = styled.h3`
    font-size: 64px;
    margin: 70px 0 190px 0;
    color: ${Colors.primary};
`;

const LoginParagraph = styled.p`
    font-size: 24px;
    color: ${Colors.white};
`;

export const LoginInput = styled.input`
    border-radius: 8px;
    color: ${Colors.outline};
    font-weight: 300;
    font-size: 24px;
    padding: 11px 0 11px 18px;
    width: 600px;
    margin: 0 146px 36px 146px;
    height: 50px;
`;

export const LoginBtn = styled.button`
    background-color: ${Colors.primary};
    border-radius: 8px;
    color: ${Colors.white};
    font-size: 36px;
    font-weight: 500;
    margin: 28px 0 155px 0;
    transition: all .3s;
    width: 315px;
    height: 90px;

    :hover{
        background-color: ${Colors.white};
        color: ${Colors.primary}
    }
`;

const LoginBtnCreateAccount = styled.button`
    color: ${Colors.primary};
    font-weight: 300;
    font-size: 48px;
    background-color: transparent;
    margin: 65px 0 214px 0;
    transition: color .3s;

    :hover{
        color: ${Colors.white}        
    }
`;

export const Login = () => {

    const [token, setToken] = useContext(TokenContext);
    const [loginText, setLoginText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [error, setError] = useState("")

    const onLogin = async () => {
        try{
            const res = await api.post("/auth/local", { identifier: loginText, password: passwordText });
            setToken(res.data.jwt)
            console.log(token);
        }catch(err){
            setError("Wrong login or password");
        }
    }
    const checkData = token ? "/home" : "/login"

    return(
        <LoginWrapper>
            <LoginH3>Login</LoginH3>
            <LoginInput
                value={loginText} 
                onChange={(e) => setLoginText(e.target.value)}
                placeholder="Email or Username" 
                type="text" />
            <LoginInput
                value={passwordText} 
                onChange={(e) => setPasswordText(e.target.value)}
                placeholder="Password" 
                type="password" />
            <Link to={checkData}>
                <LoginBtn onClick={onLogin}>Login</LoginBtn>
            </Link>
            <p>{error}</p>
            <LoginParagraph>or</LoginParagraph>
            <Link to="/create-new-account">
                <LoginBtnCreateAccount>create an account</LoginBtnCreateAccount>
            </Link>
        </LoginWrapper>
    )
}