import React, { useContext } from "react";
import styled from "styled-components";
import { Colors } from "../Colors";
import { TokenContext } from "../contexts/TokenContext"
import { ReactComponent as Logout} from "../icons/logout 2.svg";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
`;

const H1 = styled.h1`
    color: ${Colors.primary};
    font-family: 'ZCOOL KuaiLe';
    font-size: 64px;
    left: 40px;
    position: absolute;
    top: 40px;
`;

const LogoutBtn = styled.button`
    background-color: transparent;
    height: 85px;
    position: absolute;
    right: 40px;
    top: 40px;
    transition: color .3s;
`;

export const MainContainer = ({ children }) => {

    const [token, setToken] = useContext(TokenContext);

    return(
        <Wrapper>
            <H1>ToDo-List</H1>
            {token && 
            <Link to="/login">
                <LogoutBtn onClick={() => setToken(null)}>
                    <Logout />
                </LogoutBtn>
            </Link>}
            {children}
        </Wrapper>
    )
}