import React from "react";

import {BoardProps} from "../../types/types";
import columns from "../../helpers/colums-data.json";
import CardColumn from "../CardColumn/CardColumn";

const Board: React.FC<BoardProps> = ({id, title}) => {
 return (
  <div>
   <ul className="flex gap-10 mx-auto">
    {columns.map((column, id) => (
     <CardColumn
      key={id}
      title={column.title}
     />
    ))}
   </ul>
  </div>
 );
};
export default Board;
