import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {deleteBoard, fetchBoards} from "../redux/boards/operations";
import {BoardProps, CardProps} from "../types/interfaces";
import {AppDispatch} from "../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";

interface SearchFieldProps {
 onBoardSelected: (boardTitle: string) => void;
}

interface BoardOption {
 title: string;
 _id: string;
 columns: {
  cards: never[];
  name: string;
  _id: string;
  boardId: string;
  key: any;
 }[];
}

const SearchComponent = ({onBoardSelected}: SearchFieldProps) => {
 // const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

 const dispatch = useDispatch<AppDispatch>();
 const {currentBoard, boards} = useSelector((state: any) => state.boards);
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [selectedBoard, setSelectedBoard] = React.useState<BoardProps | null>(null);

 useEffect(() => {
  const getBoards = () => {
   dispatch(fetchBoards());
  };
  getBoards();
 }, [dispatch]);

 const handleDeleteBoard = (boardId: string) => {
  dispatch(deleteBoard(boardId)).then(() => {
   dispatch(fetchBoards());
  });
 };

 const board = boards.find((board: BoardProps) => board._id === currentBoard?._id);
 console.log("Board before updating:", board);

 const boardOptions: BoardOption[] = boards
  .filter(
   (
    board
   ): board is {
    title: string;
    _id: string;
    columns: {name: string; _id: string; boardId: string; cards: CardProps[]}[];
   } => Boolean(board.title && board._id)
  )
  .map((board) => ({
   title: board.title,
   _id: board._id,
   columns: board.columns.map((column) => ({...column, cards: column.cards || []})),
  }));

 console.log("BoardOptions:", boardOptions);
 const mapToBoardProps = (option: BoardOption): BoardProps => ({
  _id: option._id,
  title: option.title,
  columns: option.columns.map((column) => ({
   ...column,
   cards: column.cards || [],
  })),
 });

 return (
  <div className="w-[300px]">
   <Autocomplete
    freeSolo
    id="free-solo-2-demo"
    disableClearable
    options={boardOptions}
    getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
    // onChange={(event, value) => {
    //  console.log("SearchField:onChange", event, value);
    //  if (value && typeof value !== "string") {
    //   setSelectedBoard(value);
    //   onBoardSelected(value._id);
    //  } else {
    //   setSelectedBoard(null);
    //  }
    // }}
    onChange={(event, value) => {
     if (value && typeof value !== "string") {
      const boardProps = mapToBoardProps(value);
      setSelectedBoard(boardProps);
      onBoardSelected(boardProps._id);
     } else {
      setSelectedBoard(null);
     }
    }}
    renderOption={(props, option) => {
     const {key, ...restOfProps} = props;
     return (
      <li
       key={key}
       {...restOfProps}
      >
       <span>{option.title}</span>
       <IconButton
        onClick={(event) => {
         event.stopPropagation();
         handleDeleteBoard(option._id);
        }}
       >
        <DeleteIcon />
       </IconButton>
      </li>
     );
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
