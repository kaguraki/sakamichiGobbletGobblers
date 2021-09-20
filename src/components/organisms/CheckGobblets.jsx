import styled from "styled-components";

export const CheckGobblets=(props)=>{
    const { cells, cellIndex2, setCheckGobblets }=props;

    const FinishCheck=()=>{
        setCheckGobblets(false);
    }

    return(
        <div>
            <SP>このマスのゴブレットは</SP>

            {cells[cellIndex2].gobblets.map((cell)=>(
                <SImg key={cell.size} src={cell.pic} />
            ))}

            <br />
            <SButton onClick={FinishCheck}>確認完了</SButton>
        </div>
    )
}

const SP=styled.p`
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
`;
const SImg=styled.img`
    width: 180px;
    height: 180px;
    border-radius: 5px;
    margin: 0 5px;
`;
const SButton=styled.button`
    background-color: white;
`;