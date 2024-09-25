import React from "react";
import CardList from "../CardList/CardList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
interface CardColumnProps {
 title: string;
}
const CardColumn: React.FC<CardColumnProps> = ({title}) => {
 return (
  <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[80vh] p-3 bg-cyan-400/10 rounded-lg flex flex-col gap-4 justify-between items-center border-solid border-[1px] border-secondary">
   <h2 className="text-primary-accent text-[24px] font-bold">{title}</h2>
   <div className="h-[60vh] overflow-y-auto scroll-smooth">
    <CardList />
   </div>
   <div className="w-14 h-14 rounded-full flex justify-center items-center">
    <Button className="w-12 h-12 md:w-14 md:h-14 rounded-full text-primary-main hover:text-primary-accent focus:text-primary-accent bg-transparent hover:bg-transparent focus:bg-transparent">
     <AddRoundedIcon />
    </Button>
   </div>
  </div>
 );
};

export default CardColumn;
