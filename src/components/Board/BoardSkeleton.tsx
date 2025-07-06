import React from "react";

const BoardSkeleton: React.FC = () => {
 return (
  <div className="w-[96%] h-auto p-3 m-auto my-40 flex justify-center items-center align-middle animate-pulse">
   <div className="flex flex-col items-center space-y-4">
    <div className="h-8 w-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
   </div>
  </div>
 );
};

export default BoardSkeleton;
