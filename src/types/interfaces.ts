export interface CardProps  {
    _id: string ;
    title: string;
    description: string;
    columnId: string;
    boardId: string;
}

export interface CardsState {
    cards: CardProps[];
    isLoading: boolean;
    error: string | null;
    filter: string;
    columns: ColumnProps[];
  }

 export interface CardListProps  {
    columnId: string;
    cards: CardProps[];
 }
  
export  interface UpdateColumnCardsPayload {
    columnId: string;
    newCards: CardProps[];
  }
  
export interface ColumnProps  {
    _id: string;
    name: string;
    card?: CardProps[];
    cards: CardProps[];
    boardId: number | string;
}

export interface ColumnsState {
    columns: ColumnProps[];
    isLoading: boolean;
    error: string | null;
  }
  export interface CurrentColumnProps {
    _id: string | number;
    name: string;
    cards: {
      _id: string | number;
      title: string;
      description: string;
      boardId: string | number;
      columnId: string | number;
    } [];
  }
  
  export interface CurrentBoard {
    _id: string | number;
    title: string;
    columns: CurrentColumnProps[];
  }
  
  export interface BoardsState {
    currentBoard: CurrentBoard | null; 
    boards: BoardProps[]; 
    isLoading: boolean;
    error: string | null;
  }
  export interface BoardProps  {
    _id: string;
    title: string;
    columns: ColumnProps[];
    cards?: CardProps[];
}