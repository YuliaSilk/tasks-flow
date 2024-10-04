import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {fetchBoards, getBoardById} from "../redux/boards/operations";
import {BoardProps} from "../types/types";
import {AppDispatch} from "../redux/store";

interface SearchFieldProps {
 onBoardSelected: (boardTitle: string) => void;
}

interface BoardOption {
 title: string;
 _id: string;
 columns: {name: string; _id: string; boardId: string}[];
}

const SearchComponent = ({onBoardSelected}: SearchFieldProps) => {
 const dispatch = useDispatch<AppDispatch>();
 const {currentBoard, boards} = useSelector((state: any) => state.boards);
 const [selectedBoard, setSelectedBoard] = React.useState<BoardProps | null>(null);

 useEffect(() => {
  const getBoards = () => {
   dispatch(fetchBoards());
  };
  getBoards();
 }, [dispatch]);

 const board = boards.find((board: BoardProps) => board._id === currentBoard?._id);
 //  console.log("Board before updating:", board);

 const boardOptions: BoardOption[] = boards
  .filter(
   (
    board
   ): board is {
    title: string;
    _id: string;
    columns: {name: string; _id: string}[];
   } => Boolean(board.title && board._id)
  )
  .map((board) => ({
   title: board.title,
   _id: board._id,
   columns: board.columns,
  }));

 console.log("BoardOptions:", boardOptions);

 return (
  <div className="w-[300px]">
   <Autocomplete
    freeSolo
    id="free-solo-2-demo"
    disableClearable
    options={boardOptions}
    getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
    onChange={(event, value) => {
     console.log("SearchField:onChange", event, value);
     if (value && typeof value !== "string") {
      setSelectedBoard(value);
      onBoardSelected(value._id);
     } else {
      setSelectedBoard(null);
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
};
export default SearchComponent;
