import React, {useContext} from "react";
import { TableContext } from "./MineSearch";
import MineTd from "./MineTd";

const MineTr = ({rowIndex}) => {
    const {tableData} = useContext(TableContext);
    return(
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td,i) => <MineTd rowIndex ={rowIndex} cellIndex={i} />)}
        </tr>
    );
};

export default MineTr;
