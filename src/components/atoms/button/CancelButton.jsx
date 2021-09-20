import styled from "styled-components";

export const CancelButton=(props)=>{
    const {CancelPut}=props;

    return <SButton onClick={CancelPut}>キャンセル</SButton>
}

const SButton=styled.button`
    background-color: white;
    color: blue;
    padding: 10px 15px;
    border-radius: 999px;
    cursor: pointer;
    &:hover{
        background-color: aqua;
    }
`;