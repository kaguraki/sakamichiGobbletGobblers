import styled from "styled-components";

export const Normal=(props)=>{
    const { cells, back, SelectPutCell, CheckGobblets, WillMoveGobblet }=props;

    return(
        <>
            <SGrids>
                {cells.map((cell,index)=>(
                    <SGrid key={cell.id} style={{backgroundSize:"cover", backgroundImage:`url(${back[index]})`}}>
                        <SButtons>
                        <SButton onClick={()=>SelectPutCell(index)}>置く</SButton>
                        <SButton onClick={()=>CheckGobblets(index)}>確認</SButton>
                        <SButton onClick={()=>WillMoveGobblet(index)}>移動</SButton>
                        </SButtons>
                    </SGrid>
                ))}
            </SGrids>
        </>
    )
}

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
    cursor: pointer;
`;
const SButtons=styled.div`
    position: absolute;
    bottom:0px;
`;
const SButton=styled.button`
    padding: 10px 15px;
    border-radius: 999px;
    cursor: pointer;
    background-color: rgb(247, 185, 195);
    color: blue;
    border: solid;
    &:hover{
        background-color: aqua;
    }
`;