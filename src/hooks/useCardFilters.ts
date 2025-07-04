// import { useMemo } from 'react';
// import { CardProps, FilterOptions } from '../types/interfaces';

// type SortableFields = Required<Pick<CardProps, 'title' | 'createdAt' | 'updatedAt'>>;
// type SortField = NonNullable<FilterOptions['sortBy']>;

// export const useCardFilters = (cards: CardProps[], filters: FilterOptions) => {
//   return useMemo(() => {
//     let filteredCards = [...cards];

//     // Apply title filter
//     if (filters.title) {
//       const searchTerm = filters.title.toLowerCase();
//       filteredCards = filteredCards.filter(
//         card => 
//           card.title.toLowerCase().includes(searchTerm) ||
//           card.description.toLowerCase().includes(searchTerm)
//       );
//     }

//     // Apply column filter
//     if (filters.columnId) {
//       filteredCards = filteredCards.filter(card => card.columnId === filters.columnId);
//     }

//     // Apply sorting
//     if (filters.sortBy) {
//       const sortField = filters.sortBy as SortField;
//       filteredCards.sort((a, b) => {
//         const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;

//         // Ensure we have the required fields for sorting
//         const cardA = a as SortableFields;
//         const cardB = b as SortableFields;

//         if (sortField === 'title') {
//           return sortOrder * cardA.title.localeCompare(cardB.title);
//         }

//         // Handle date fields
//         const aDate = new Date(cardA[sortField]).getTime();
//         const bDate = new Date(cardB[sortField]).getTime();
//         return sortOrder * (aDate - bDate);
//       });
//     }

//     return filteredCards;
//   }, [cards, filters]);
// };

// export default useCardFilters; 