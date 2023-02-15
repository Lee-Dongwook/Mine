import React, {useContext} from "react";
import {TableContext} from "./MineSearch";
import MineTr from "./MineTr";

const MineTable = () => {
    const {tableData} = useContext(TableContext);

    return(
        <div>
            <table>
                <tbody>
                    {Array(tableData.length)
                    .fill()
                    .map((tr,i)=> (
                        <MineTr rowIndex = {i} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MineTable;