import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useBoards} from "../../hooks/useBoard";

interface BoardOption {
 title: string;
 _id: string;
}
interface SearchFieldProps {
 onBoardSelected: (boardTitle: string) => void;
}
export default function SearchField({onBoardSelected}: SearchFieldProps) {
 const {boards} = useBoards();
 console.log("SearchField:boards", boards);

 const boardOptions: BoardOption[] = boards
  .filter((board): board is {title: string; _id: string} => Boolean(board.title && board._id)) // Type guard to ensure correct types
  .map((board) => ({
   title: board.title,
   _id: board._id,
  }));
 console.log("SearchField:boardOptions", boardOptions);

 return (
  <div className="w-[300px]">
   <Autocomplete
    freeSolo
    id="free-solo-2-demo"
    disableClearable
    options={boardOptions}
    getOptionLabel={(option) => option.title}
    onChange={(event, value) => {
     console.log("SearchField:onChange", event, value);
     if (value) {
      onBoardSelected((value as BoardOption)._id);
     }
    }}
    renderInput={(params) => (
     <TextField
      {...params}
      label="Search your dashboard"
      slotProps={{
       input: {
        ...params.InputProps,
        type: "search",
       },
      }}
     />
    )}
   />
  </div>
 );
}
