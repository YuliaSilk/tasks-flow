// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, {useState} from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import {useBoards} from "../../hooks/useBoard";
// import axios from "axios";
// interface BoardOption {
//  title: string;
//  _id: string;
//  columns: {name: string; _id: string}[];
// }
// interface SearchFieldProps {
//  onBoardSelected: (boardTitle: string) => void;
// }
// export default function SearchField({onBoardSelected}: SearchFieldProps) {
//  const [selectedBoard, setSelectedBoard] = useState<BoardOption | null>(null);
//  const [columns, setColumns] = useState<any[]>([]);

//  const {boards} = useBoards();
//  //  console.log("SearchField:boards", boards);

//  const boardOptions: BoardOption[] = boards
//   .filter(
//    (
//     board
//    ): board is {
//     title: string;
//     _id: string;
//     columns: {name: string; _id: string}[];
//    } => Boolean(board.title && board._id)
//   )
//   .map((board) => ({
//    title: board.title,
//    _id: board._id,
//    columns: board.columns,
//   }));
//  //  console.log("SearchField:boardOptions", boardOptions);

//  return (
//   <div className="w-[300px]">
//    <Autocomplete
//     freeSolo
//     id="free-solo-2-demo"
//     disableClearable
//     options={boardOptions}
//     getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
//     onChange={(event, value) => {
//      console.log("SearchField:onChange", event, value);
//      if (value && typeof value !== "string") {
//       setSelectedBoard(value);
//       onBoardSelected(value._id);
//      } else {
//       setSelectedBoard(null);
//      }
//     }}
//     renderInput={(params) => (
//      <TextField
//       {...params}
//       label="Search your dashboard"
//       slotProps={{
//        input: {
//         ...params.InputProps,
//         type: "search",
//        },
//       }}
//      />
//     )}
//    />
//    {/* <ButtonLoad onClick={handleLoad} />
//    {selectedBoard && (
//     <div>
//      <p>{selectedBoard.title}</p>
//     </div>
//    )} */}
//   </div>
//  );
// }
