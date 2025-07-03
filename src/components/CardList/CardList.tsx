import React, {useState} from "react";
import {CardListProps, FilterOptions} from "../../types/interfaces";
import Card from "../Card/Card";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import CardFilters from "./CardFilters";
import useCardFilters from "../../hooks/useCardFilters";

const CardList: React.FC<CardListProps> = ({cards, columnId, theme}) => {
 const [filters, setFilters] = useState<FilterOptions>({});
 const filteredCards = useCardFilters(cards, filters);

 return (
  <ErrorBoundary>
   <div className="flex flex-col gap-4">
    <CardFilters
     onFilterChange={setFilters}
     theme={theme}
     columns={[{_id: columnId, name: "Current Column"}]}
    />

    <div className="space-y-2">
     {filteredCards.map((card, index) => (
      <Card
       key={card._id}
       {...card}
       index={index}
      />
     ))}

     {filteredCards.length === 0 && (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">No cards found</div>
     )}
    </div>
   </div>
  </ErrorBoundary>
 );
};

export default CardList;
