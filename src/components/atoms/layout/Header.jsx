import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header=()=>{
    return <SLink to="/"><SHeader>Gobblet Gobblers</SHeader></SLink>
}

const SLink=styled(Link)`
    text-decoration: none;
`;
const SHeader=styled.header`
    font-size: 30px;
    height: 60px;
    line-height: 60px;
    background-color: lightgreen;
    text-align: center;
    background-image: radial-gradient(aqua, blue);
    color: white;
    font-family: 'Are You Serious', cursive;
`;