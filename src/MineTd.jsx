import React, {useCallback, useContext} from "react";
import {CODE, OPEN_CELL, TableContext} from "./MineSearch";

const getTdStyle = (code) => {
    switch(code){
        case CODE.NOMARL:
        case CODE.MINE:
        return{
            background: "#444",
        };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
        return{
            background: "#fff",
        };
        case CODE.FLAG_MINE:
        case CODE.FALG:
        return{
            background: "pink",
        };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
        return{
            background: "aqua",
        };

        default:
            return{
                background: "#fff",
            };

    }
};

const getTdText = (code) => {
    switch(code){
        case CODE.NORMAL:
            return "";
        case CODE.MINE:
            return "X";
        case CODE.CLICKED_MINE:
            return "꽝";
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return "!";
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return "?";
    }
};

const MineTd = ({rowIndex, cellIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(()=>{
        if(halted) {
            return;
        }
        switch(tableData[rowIndex][cellIndex])
        {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                    return;

            case CODE.NORMAL:
                dispatch({type: "OPEN_CELL", row: rowIndex, cell: cellIndex});
                return;

            case CODE.MINE:
                dispatch({type: "CLICK_MINE", row: rowIndex, cell: cellIndex});

                }        
    },[tableData[rowIndex][cellIndex],halted]);

    const onContextMenuTd = useCallback((e) => {
        e.preventDefault();
        if(halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex])
        {
            case CODE.NORMAL:
            case CODE.MINE:
              dispatch({type: "FLAG_CELL", row: rowIndex, cell: cellIndex});
              return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type: "QUESTION_CELL", row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type: "NORMAL_CELL", row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return(
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu = {onContextMenuTd}>
        {getTdText(tableData[rowIndex][cellIndex])}        
        </td>
    );

};

export default MineTd;