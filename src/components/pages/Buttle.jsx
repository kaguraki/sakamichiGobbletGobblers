import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import nogi1 from "./../../img/nogi1.JPG";
import nogi2 from "./../../img/nogi2.jpeg";
import nogi3 from "./../../img/nogi3.jpeg";
import hina1 from "./../../img/hina1.jpg";
import hina2 from "./../../img/hina2.jpg";
import hina3 from "./../../img/hina3.jpg";
import sakura from "./../../img/sakura.jpg";
import { WillMove } from "../organisms/WillMove";
import { Normal } from "../organisms/Normal";
import { Turn1 } from "../organisms/Turn1";
import { Turn2 } from "../organisms/Turn2";

export const Buttle=()=>{

    /*gobblet 作成*/
    const [myGobblets, setMyGobblets]=useState([]);
    const [yourGobblets, setYourGobblets]=useState([]);

    let myAltGobblets=[];
    let yourAltGobblets=[];

    const gobbletIds=[...Array(6).keys()];
    const gobbletSizes=[...Array(3).keys(),...Array(3).keys()];
    const gobbletPlayers=[0,1];

    for(let i=0; i<gobbletIds.length; i++){
        const myGobblet={
            id: gobbletIds[i],
            size: gobbletSizes[i],
            player: gobbletPlayers[0]
        }

        const yourGobblet={
            id: gobbletIds[i],
            size: gobbletSizes[i],
            player: gobbletPlayers[1]
        }

        myAltGobblets=[...myAltGobblets, myGobblet];
        yourAltGobblets=[...yourAltGobblets, yourGobblet];
    }

    myAltGobblets[0].pic=nogi1;
    myAltGobblets[1].pic=nogi2;
    myAltGobblets[2].pic=nogi3;
    myAltGobblets[3].pic=nogi1;
    myAltGobblets[4].pic=nogi2;
    myAltGobblets[5].pic=nogi3;
    yourAltGobblets[0].pic=hina1;
    yourAltGobblets[1].pic=hina2;
    yourAltGobblets[2].pic=hina3;
    yourAltGobblets[3].pic=hina1;
    yourAltGobblets[4].pic=hina2;
    yourAltGobblets[5].pic=hina3;

    useEffect(()=>{
        setMyGobblets(myAltGobblets);
        setYourGobblets(yourAltGobblets);
    },[])


    /*cell 作成*/
    const [cells,setCells]=useState([]);

    const cellIds=[...Array(9).keys()];
    const [cellGobblets, setCellGobblets]=useState([[],[],[],[],[],[],[],[],[]]);

    let cellAlt=[];

    for(let i=0; i<cellIds.length; i++){
        const cell={
            id: cellIds[i],
            gobblets: cellGobblets[i],
        }

        cellAlt=[...cellAlt,cell];
    }

    useEffect(()=>{
        setCells(cellAlt);
    },[])
    

    /*ターンを切り替える*/
    const [myTurn, setMyTurn]=useState(true);

    const ChangeTurn=()=>{
        setMyTurn(!myTurn);
    }


    /*テーブルのback*/
    const [back, setBack]=useState([sakura,sakura,sakura,sakura,sakura,sakura,sakura,sakura,sakura]);


    /*「置く」ボタンを押した時の一連の処理*/
    const [putCard, setPutCard]=useState(false); //「カードを置くか」の選択画面を表示
    const [cellIndex, setCellIndex]=useState(0); //「置く」ボタンを押したマスのindex

    //「置く」ボタンを押した時の処理
    const SelectPutCell=(index)=>{
        setPutCard(true);
        setCellIndex(index); //cellIndexに「置く」ボタンを押したマスのindexを代入
    }

    //「キャンセル」ボタンを押した時の処理
    const CancelPut=()=>{
        setPutCard(false); //「カードを置くか」の選択画面を非表示
    }

    //「置く」ボタンを押した後の処理
    const PutGobblet=(index)=>{
        let ret=window.confirm("置きますか？");

        if(myTurn){
            //元々あったゴブレットのサイズの方が大きい時はゴブレットを置けない
            if(cells[cellIndex].gobblets.length != 0){
                if(cells[cellIndex].gobblets[0].size <= myGobblets[index].size){
                    ret=false;
                    alert("このゴブレットは置くことが出来ません。")
                }
            }
    
            //上の条件を満たした時に指定したゴブレットを置く
            if(ret){
                //選択したゴブレットを取り除く
                let newMyGobblets=[...myGobblets];
    
                const removeGobblet=newMyGobblets.splice(index,1)[0];
    
                setMyGobblets(newMyGobblets);
    
                //取り除いたゴブレットを指定したcellの配列に追加する
                let newCellGobblets=[...cellGobblets];
    
                newCellGobblets[cellIndex].unshift(removeGobblet);
    
                setCellGobblets(newCellGobblets);
    
                //取り除いたゴブレットをcellに置く
                let newBack=[...back];
    
                newBack[cellIndex]=cellGobblets[cellIndex][0].pic;
    
                setBack(newBack);

                //ターンエンド
                setMyTurn(!myTurn);
            }
        }else{
            //元々あったゴブレットのサイズの方が大きい時はゴブレットを置けない
            if(cells[cellIndex].gobblets.length != 0){
                if(cells[cellIndex].gobblets[0].size <= yourGobblets[index].size){
                    ret=false;
                    alert("このゴブレットは置くことが出来ません。")
                }
            }
    
            //上の条件を満たした時に指定したゴブレットを置く
            if(ret){
                //選択したゴブレットを取り除く
                let newYourGobblets=[...yourGobblets];
    
                const removeGobblet=newYourGobblets.splice(index,1)[0];
    
                setYourGobblets(newYourGobblets);
    
                //取り除いたゴブレットを指定したcellの配列に追加する
                let newCellGobblets=[...cellGobblets];
    
                newCellGobblets[cellIndex].unshift(removeGobblet);
    
                setCellGobblets(newCellGobblets);
    
                //取り除いたゴブレットをcellに置く
                let newBack=[...back];
    
                newBack[cellIndex]=cellGobblets[cellIndex][0].pic;
    
                setBack(newBack);

                setMyTurn(!myTurn); //ターンエンド
            }
        }

        setPutCard(false)
    }


    /*「確認」ボタンを押した時の処理*/
    const [checkGobblets, setCheckGobblets]=useState(false);
    const [cellIndex2, setCellIndex2]=useState(0);

    const CheckGobblets=(index)=>{
        setCheckGobblets(!checkGobblets);
        setCellIndex2(index);
    }


    /*「移動」ボタンを押した時の一連の処理*/
    const [willMove, setWillMove]=useState(false); //「移動」ボタンを押した時の画面切り替え
    const [cellIndex3, setCellIndex3]=useState(0); //元々置いてあったマスのindex

    //「移動」ボタンを押した時の処理
    //index: 元々置いてあったマスのindex
    const WillMoveGobblet=(index)=>{
        let ret=true;

        if(cells[index].gobblets.length === 0){
            alert("ゴブレットが存在しないので、移動出来ません。");
        }else{
            if(myTurn){
                if(cells[index].gobblets[0].player != 0){
                    ret=false;
                    alert("このゴブレットは相手のゴブレットです。");
                }
            }else{
                if(cells[index].gobblets[0].player != 1){
                    ret=false;
                    alert("このゴブレットは相手のゴブレットです。");
                }
            }

            if(ret){
                setWillMove(true);
                setCellIndex3(index);
            }
        }
    }

    //「移動」ボタンを押した後の処理
    //index: 移動させた後のマスのindex
    const MoveGobblet=(index)=>{
        let ret=false;

        if(cells[index].gobblets.length === 0){
            ret=window.confirm("移動しますか？");
        }else{
            if(cells[cellIndex3].gobblets[0].size >= cells[index].gobblets[0].size){
                alert("このマスには移動できません。");
            }else{
                ret=window.confirm("移動しますか？");
            }
        }

        if(ret){
            //「移動」ボタンを押したマスのcells[0]を取り除く
            const removeGobblet=cells[cellIndex3].gobblets.splice(0,1)[0];

            //取り除いたマスに新しい背景を入れる
            let newBack=[...back]; //新しい背景を入れる配列

            newBack[index]=removeGobblet.pic;
            if(cells[cellIndex3].gobblets.length != 0){
                newBack[cellIndex3]=cells[cellIndex3].gobblets[0].pic;
            }else{
                newBack[cellIndex3]=sakura;
            }

            //取り除いたゴブレットをcells[index]に入れる
            let newCells=[...cells];
            newCells[index].gobblets.unshift(removeGobblet);
            
            setBack(newBack);
            setCells(newCells);

            setWillMove(false);
            setMyTurn(!myTurn);
        }
    }


    /*勝敗判定*/

    //縦・横・斜めに3つ揃ったら勝ち
    const Win1=(cells)=>{
        let player0;
        let player1;

        if((cells[0].gobblets.length != 0) && (cells[1].gobblets.length != 0) && (cells[2].gobblets.length != 0)){
            if(cells[0].gobblets[0].player===0 && cells[1].gobblets[0].player===0 && cells[2].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[3].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[5].gobblets.length != 0)){
            if(cells[3].gobblets[0].player===0 && cells[4].gobblets[0].player===0 && cells[5].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[6].gobblets.length != 0) && (cells[7].gobblets.length != 0) && (cells[8].gobblets.length != 0)){
            if(cells[6].gobblets[0].player===0 && cells[7].gobblets[0].player===0 && cells[8].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[0].gobblets.length != 0) && (cells[3].gobblets.length != 0) && (cells[6].gobblets.length != 0)){
            if(cells[0].gobblets[0].player===0 && cells[3].gobblets[0].player===0 && cells[6].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[1].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[7].gobblets.length != 0)){
            if(cells[1].gobblets[0].player===0 && cells[4].gobblets[0].player===0 && cells[7].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[2].gobblets.length != 0) && (cells[5].gobblets.length != 0) && (cells[8].gobblets.length != 0)){
            if(cells[2].gobblets[0].player===0 && cells[5].gobblets[0].player===0 && cells[8].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[0].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[8].gobblets.length != 0)){
            if(cells[0].gobblets[0].player===0 && cells[4].gobblets[0].player===0 && cells[8].gobblets[0].player===0){
                player0=0;
            }
        }
        if((cells[2].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[6].gobblets.length != 0)){
            if(cells[2].gobblets[0].player===0 && cells[4].gobblets[0].player===0 && cells[6].gobblets[0].player===0){
                player0=0;
            }
        }

        if((cells[0].gobblets.length != 0) && (cells[1].gobblets.length != 0) && (cells[2].gobblets.length != 0)){
            if(cells[0].gobblets[0].player===1 && cells[1].gobblets[0].player===1 && cells[2].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[3].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[5].gobblets.length != 0)){
            if(cells[3].gobblets[0].player===1 && cells[4].gobblets[0].player===1 && cells[5].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[6].gobblets.length != 0) && (cells[7].gobblets.length != 0) && (cells[8].gobblets.length != 0)){
            if(cells[6].gobblets[0].player===1 && cells[7].gobblets[0].player===1 && cells[8].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[0].gobblets.length != 0) && (cells[3].gobblets.length != 0) && (cells[6].gobblets.length != 0)){
            if(cells[0].gobblets[0].player===1 && cells[3].gobblets[0].player===1 && cells[6].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[1].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[7].gobblets.length != 0)){
            if(cells[1].gobblets[0].player===1 && cells[4].gobblets[0].player===1 && cells[7].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[2].gobblets.length != 0) && (cells[5].gobblets.length != 0) && (cells[8].gobblets.length != 0)){
            if(cells[2].gobblets[0].player===1 && cells[5].gobblets[0].player===1 && cells[8].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[0].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[8].gobblets.length != 0)){
            if(cells[0].gobblets[0].player===1 && cells[4].gobblets[0].player===1 && cells[8].gobblets[0].player===1){
                player1=1;
            }
        }
        if((cells[2].gobblets.length != 0) && (cells[4].gobblets.length != 0) && (cells[6].gobblets.length != 0)){
            if(cells[2].gobblets[0].player===1 && cells[4].gobblets[0].player===1 && cells[6].gobblets[0].player===1){
                player1=1;
            }
        }

        if(player0 === 0 && player1 === 1){
            return 2
        }else if(player0 === 0){
            return 0
        }else if(player1 === 1){
            return 1
        }
    }

    //同じマスに3つの置けたら勝ち
    const Win2=(cells)=>{
        let player0;
        let player1;

        if(cells[0].gobblets.length === 3){
            if(cells[0].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[1].gobblets.length === 3){
            if(cells[1].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[2].gobblets.length === 3){
            if(cells[2].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[3].gobblets.length === 3){
            if(cells[3].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[4].gobblets.length === 3){
            if(cells[4].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[5].gobblets.length === 3){
            if(cells[5].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[6].gobblets.length === 3){
            if(cells[6].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[7].gobblets.length === 3){
            if(cells[7].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }else if(cells[8].gobblets.length === 3){
            if(cells[8].gobblets.every((gobblet)=>gobblet.player === 0)){
                player0=0;
            }
        }

        if(cells[0].gobblets.length === 3){
            if(cells[0].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[1].gobblets.length === 3){
            if(cells[1].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[2].gobblets.length === 3){
            if(cells[2].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[3].gobblets.length === 3){
            if(cells[3].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[4].gobblets.length === 3){
            if(cells[4].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[5].gobblets.length === 3){
            if(cells[5].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[6].gobblets.length === 3){
            if(cells[6].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[7].gobblets.length === 3){
            if(cells[7].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }else if(cells[8].gobblets.length === 3){
            if(cells[8].gobblets.every((gobblet)=>gobblet.player === 1)){
                player1=1;
            }
        }

        if(player0 === 0 && player1 ===1){
            return 2
        }else if(player0 === 0){
            return 0
        }else if(player1 === 1){
            return 1
        }
    }

    //勝敗判定
    const winFlg=useRef(false);

    useEffect(()=>{
        if(winFlg.current){
            let win1=Win1(cells);
            let win2=Win2(cells);

            if(win1 === 2 || win2 === 2 || (win1 === 0 && win2 === 1) || (win1 === 1 && win2 === 0)){
                alert("引き分けです！");
            }else if(win1 === 0 || win2 === 0){
                alert("Player1の勝ち！")
            }else if(win1 === 1 || win2 === 1){
                alert("Player2の勝ち！");
            }
        }else{
            winFlg.current=true;
        }
    },[cellGobblets, cells])

    

    return(
        <SContainer>
            <SLink to="/"><SHeader>Gobblet Gobblers</SHeader></SLink>

            {willMove ?
                <WillMove
                    cells={cells}
                    back={back}
                    MoveGobblet={MoveGobblet}
                    setWillMove={setWillMove}
                />
            :
                 <Normal
                    cells={cells}
                    back={back}
                    SelectPutCell={SelectPutCell}
                    CheckGobblets={CheckGobblets}
                    WillMoveGobblet={WillMoveGobblet}
                 />
            }

            {myTurn &&
                <Turn1
                    putCard={putCard}
                    myGobblets={myGobblets}
                    PutGobblet={PutGobblet}
                    CancelPut={CancelPut}
                    checkGobblets={checkGobblets}
                    cells={cells}
                    cellIndex2={cellIndex2}
                />
            }


            {!myTurn &&
                <Turn2
                    putCard={putCard}
                    yourGobblets={yourGobblets}
                    PutGobblet={PutGobblet}
                    CancelPut={CancelPut}
                    checkGobblets={checkGobblets}
                    setCheckGobblets={setCheckGobblets}
                    cells={cells}
                    cellIndex2={cellIndex2}
                />
            }
        </SContainer>
    )
}

const SContainer=styled.div`
    text-align: center;
    margin-top: 10px;
`;
const SLink=styled(Link)`
    text-decoration: none;
`;
const SHeader=styled.header`
    font-size: 50px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: white;
    font-family: 'Are You Serious', cursive;
    margin-bottom: 30px;
`;