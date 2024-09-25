import React from "react";

import {CardProps} from "../../types/types";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {Button} from "@mui/material";

const Card: React.FC<CardProps> = ({title, description}) => {
 return (
  <div className="w-[260px] md:w-[320px] lg:w-[340px] h-[200px] p-3 bg-white rounded-lg flex flex-col gap-4  border-solid border-[1px] border-secondary shadow-card-shadow">
   <h3 className="text-primary-tertiary text-[24px] font-bold">{title}</h3>
   <div className="w-full h-[120px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg">
    <p className="text-text text-[16px]">{description}</p>
   </div>
   <div className="flex w-full justify-end gap-4 items-center">
    <Button
     //  variant="contained"
     className="w-8 h-8 text-primary-main hover:text-primary-secondary focus:text-primary-secondary bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <EditNoteRoundedIcon />
    </Button>
    <Button
     //  variant="contained"
     className=" w-8 h-8  text-primary-main  hover:text-primary-red focus:text-primary-red bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <DeleteRoundedIcon />
    </Button>
   </div>
  </div>
 );
};

export default Card;
