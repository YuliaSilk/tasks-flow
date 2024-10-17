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

export interface GetCardByIdProps {
    boardId: string; 
    columnId: string; 
    _id: string;
}
  
export  interface EditCardProps {
    boardId: string ; 
    columnId: string ; 
    title: string;
    description: string;
    _id: string;
}
  
export  interface DeleteCardProps {
    boardId: string; 
    columnId: string; 
    _id: string;
}
  
export interface DndMovementPayload {
    boardId: string;
    cardId: string;
    sourceColumnId: string;
    destinationColumnId: string;
    destinationIndex: number;
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
    key: any;
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

export interface SearchFieldProps {
    onBoardSelected: (boardTitle: string) => void;
}
   
export  interface BoardOption {
    title: string;
    _id: string;
    columns: {
     cards: CardProps[];
     name: string;
     _id: string;
     boardId: string;
     key: any;
    }[];
}

export interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    width?: number;
    onClick: () => void;
   }