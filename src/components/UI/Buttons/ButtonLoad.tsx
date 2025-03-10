import React from "react";

interface ButtonLoadProps {
 onClick: () => void;
}
const ButtonLoad: React.FC<ButtonLoadProps> = ({onClick}) => {
 return (
  <button
   className="bg-primary-light dark:bg-primary-dark rounded-[20px] w-20 h-10 md:h-14 text-700 text-text-dark dark:text-text-light text-lg text-bold  hover:bg-secondary-light dark:hover:bg-secondary-dark dark:hover:text-primary-dark transition duration-300"
   //    variant="contained"
   onClick={onClick}
  >
   Load
  </button>
 );
};
export default ButtonLoad;

// {
//  /* <button
// className="bg-transparent text-blue-500 rounded-2xl w-30 h-12 border border-blue-500 hover:bg-transparent transition"
// onClick={onClick}
// >
// Load
// </button> */
// }
