import styled from "styled-components";

export const WillMove=(props)=>{
    const { cells, back, MoveGobblet, setWillMove }=props;

    const CancelMove=()=>{
        setWillMove(false);
    }

    return(
        <>
            <SP>どこに移動しますか？</SP>

            <SGrids>
                {cells.map((cell,index)=>(
                        <SGrid key={cell.id} style={{backgroundSize:"cover", backgroundImage:`url(${back[index]})`}}>
                            <SButton onClick={()=>MoveGobblet(index)}>このマスに移動する</SButton>
                        </SGrid>
                ))}
            </SGrids>

            <SCancel onClick={CancelMove}>キャンセル</SCancel>
        </>
    )
}

const SP=styled.p`
    font-size: 20px;
    color: white;
`;
const SGrids=styled.div`
    display: grid;
    grid-template-columns: repeat(3, 200px);
    justify-content: center;
`;
const SGrid=styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    border: solid 1px;
`;
const SButton=styled.button`
    color: blue;
    background-color: rgb(247, 185, 195);
    padding: 10px 15px;
    border-radius: 999px;
    cursor: pointer;
    border: solid;
    &:hover{
        background-color: aqua;
    }
`;
const SCancel=styled.button`
    background-color: white;
    color: blue;
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 999px;
    cursor: pointer;
    &:hover{
        background-color: aqua;
    }
`;