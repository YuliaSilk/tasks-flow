// Base Types
export interface BaseProps {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Card Types
export interface CardProps extends BaseProps {
  title: string;
  description: string;
  boardId: string;
  columnId: string;
  order?: number;
}

// Column Types
export interface ColumnProps extends BaseProps {
  name: string;
  boardId: string;
  cards: CardProps[];
  order?: number;
}

// Board Types
export interface BoardProps extends BaseProps {
  title: string;
  columns: ColumnProps[];
}

// State Types
export interface BoardsState {
  boards: BoardProps[];
  currentBoard: BoardProps | null;
  isLoading: boolean;
}

export interface CardsState {
  cards: CardProps[];
  columns: ColumnProps[];
  filter: string;
}

export interface ColumnsState {
  columns: ColumnProps[];
}

// Theme Types
export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// DnD Types
export interface DragItem {
  index: number;
  id: string;
  type: string;
}

export interface DndMovementPayload {
  card: CardProps;
  cardId: string;
  finishTaskIndex: number;
  sourceColumnId: string;
  destinationColumnId: string;
  boardId: string;
  destinationIndex: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Form Types
export interface BoardFormData {
  title: string;
  columns: { name: string }[];
}

export interface CardFormData {
  title: string;
  description: string;
  columnId: string;
  boardId: string;
}

// Search Types
export interface SearchResult {
  id: string;
  title: string;
  type: 'board' | 'card';
  description?: string;
}

// Filter Types
export interface FilterOptions {
  title?: string;
  columnId?: string;
  boardId?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Async State Types
export interface AsyncState {
  isLoading: boolean;
  error: string | null;
}

// Redux Action Types
export interface UpdateColumnCardsPayload {
  columnId: string;
  newCards: CardProps[];
}

export interface UpdateCardStatusPayload {
  card: CardProps;
  currentColumnId: string;
  newColumnId: string;
  newCardIdx: number;
}

// Component Props Types
export interface CardComponentProps extends CardProps {
  index: number;
}

export interface CardListProps {
  cards: CardProps[];
  columnId: string;
  boardId: string;
  theme: 'light' | 'dark';
}

export interface CurrentColumnProps {
  _id: string;
  name: string;
  cards: CardProps[];
}

export interface CurrentBoard {
  _id: string;
  title: string;
  columns: CurrentColumnProps[];
}

export interface SearchFieldProps {
  onBoardSelected: (boardId: string) => void;
  theme: 'light' | 'dark';
  width?: number;
}

export interface AddButtonProps {
  actionType: 'board' | 'card';
  title: string;
  columnId?: string;
  boardId?: string;
}

export interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    content: string;
    // onClick: () => void;
    children?: React.ReactNode;
    width?: number;
}

export interface BaseModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    width?: number;
}

export interface CreateCardModalProps {
    open: boolean;
    onClose: () => void;
    columnId: string;
    boardId: string;
}

export interface ButtonLoadProps {
 onClick: () => void;
}

export interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export interface DeleteCardProps extends BaseProps {
  boardId: string;
  columnId: string;
  _id: string;
}

export interface EditCardProps extends DeleteCardProps {
  title: string;
  description: string;
}

export interface CardFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  theme: 'light' | 'dark';
  columns: { _id: string; name: string; }[];
}

export interface GetCardByIdProps extends BaseProps {
  boardId: string;
  columnId: string;
}