import styled from "styled-components";
import { CancelButton } from "../atoms/button/CancelButton";
import { WhichGobblet } from "../atoms/whichGobblet/WhichGobblet";
import { CheckGobblets } from "./CheckGobblets";

export const Turn2=(props)=>{
    const { putCard, yourGobblets, PutGobblet, CancelPut, checkGobblets, setCheckGobblets, cells, cellIndex2 }=props;

    return(
        <>
            <SPlayer style={{color:"blue"}}>Player2</SPlayer>

            {!putCard && 
                <SUl>
                    {yourGobblets.map((Gobblet)=>(
                            <SLi key={Gobblet.id}>
                                <SGobbletDefault
                                    src={Gobblet.pic}
                                />
                            </SLi>
                    ))}
                </SUl>
            }

            {putCard &&
                <SWhich>
                    <WhichGobblet />

                    <SUl>
                        {yourGobblets.map((Gobblet,index)=>(
                                <SLi key={Gobblet.id}>
                                    <SGobblet
                                        src={Gobblet.pic}
                                        onClick={()=>PutGobblet(index)}
                                    />
                                </SLi>
                        ))}
                    </SUl>

                    <CancelButton CancelPut={CancelPut} />

                </SWhich>
            }

            {checkGobblets &&
                <CheckGobblets
                    cells={cells}
                    cellIndex2={cellIndex2}
                    setCheckGobblets={setCheckGobblets}
                />
            }
        </>
    )
}

const SWhich=styled.div`
    margin-bottom: 10px;
`;
const SPlayer=styled.p`
    font-size: 60px;
    font-weight: bold;
`;
const SGobbletDefault=styled.img`
    width: 180px;
    height: 180px;
    border-radius: 5px;
`;
const SUl=styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    justify-content: center;
    height: 210px;
`;
const SLi=styled.li`
    min-width: 200px;
    min-height: 200px;
    margin: 0 5px;
    cursor: pointer;
`;
const SGobblet=styled.img`
    width: 180px;
    height: 180px;
    border-radius: 5px;
    &:hover{
        opacity: 0.8;
        width: 200px;
        height: 200px;
    }
`;
const SImg=styled.img`
    width: 200px;
    height: 200px;
    border-radius: 5px;
`;