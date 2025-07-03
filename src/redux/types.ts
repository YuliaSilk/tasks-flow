import { BoardProps, CardProps, ColumnProps, BoardsState, CardsState, ColumnsState } from '../types/interfaces';
import { store } from './store';

// Root State Type
export type RootState = ReturnType<typeof store.getState>;

// Thunk Types
export type AppThunk<ReturnType = void> = (
  dispatch: AppDispatch,
  getState: () => RootState
) => ReturnType;

// Dispatch Type
export type AppDispatch = typeof store.dispatch;

// Action Types
export interface AsyncActionStatus {
  isLoading: boolean;
  error: string | null;
}

// Boards Action Types
export interface FetchBoardsAction {
  type: 'boards/getAllBoards';
  payload: BoardProps[];
}

export interface CreateBoardAction {
  type: 'boards/createBoard';
  payload: BoardProps;
}

export interface GetBoardByIdAction {
  type: 'boards/getBoardById';
  payload: BoardProps;
}

export interface DeleteBoardAction {
  type: 'boards/deleteBoard';
  payload: string; // board id
}

export type BoardsActionTypes = 
  | FetchBoardsAction 
  | CreateBoardAction 
  | GetBoardByIdAction 
  | DeleteBoardAction;

// Cards Action Types
export interface FetchCardsAction {
  type: 'cards/fetchTitleStatus';
  payload: {
    cards: CardProps[];
    columns: ColumnProps[];
  };
}

export interface CreateCardAction {
  type: 'cards/createCard';
  payload: {
    card: CardProps;
    columnId: string;
  };
}

export interface GetCardByIdAction {
  type: 'cards/getCardById';
  payload: CardProps;
}

export interface DeleteCardAction {
  type: 'cards/deleteCard';
  payload: {
    cardId: string;
    columnId: string;
  };
}

export interface EditCardAction {
  type: 'cards/editCard';
  payload: CardProps;
}

export type CardsActionTypes = 
  | FetchCardsAction 
  | CreateCardAction 
  | GetCardByIdAction 
  | DeleteCardAction 
  | EditCardAction;

// Columns Action Types
export interface FetchColumnsAction {
  type: 'columns/getAllColumns';
  payload: ColumnProps[];
}

export interface GetColumnByIdAction {
  type: 'columns/getById';
  payload: ColumnProps;
}

export interface AddColumnAction {
  type: 'columns/addColumn';
  payload: ColumnProps;
}

export type ColumnsActionTypes = 
  | FetchColumnsAction 
  | GetColumnByIdAction 
  | AddColumnAction;

// State Types with Status
export interface BoardsStateWithStatus extends BoardsState {
  isLoading: boolean;
  error: string | null;
}

export interface CardsStateWithStatus extends CardsState {
  isLoading: boolean;
  error: string | null;
}

export interface ColumnsStateWithStatus extends ColumnsState {
  isLoading: boolean;
  error: string | null;
} 