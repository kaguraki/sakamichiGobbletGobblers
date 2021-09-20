import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "./../../logo.svg";

export const Home=()=>{
    const history=useHistory();

    const StartButtle=()=>history.push("/buttle");

    return(
        <SContainer>
            <SH1>Gobblet Gobblers</SH1>
            <img src={logo} className="App-logo" alt="logo" />
            <br />
            <SButton onClick={StartButtle}>START</SButton>
        </SContainer>
    )
}

const SContainer=styled.div`
    min-height: 100vh;
    text-align:center;
`;
const SH1=styled.h1`
    font-size: 100px;
    padding-top: 50px;
    padding-bottom: 30px;
    color: white;
    font-family: 'Are You Serious', cursive;
`;
const SButton=styled.button`
    font-size: 50px;
    font-weight: bold;
    background-color: #eee;
    color: blue;
    border-radius: 9999px;
    margin-top: 30px;
    padding: 20px 60px;
    cursor: pointer;
    &:hover{
        background-color: aqua;
        color: white;
    }
`;
