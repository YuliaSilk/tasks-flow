import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore, AnyAction} from "@reduxjs/toolkit";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import Card from "../Card";
import {SnackbarProvider} from "notistack";
import {deleteCard, editCard} from "../../../redux/cards/operations";

interface BoardState {
 currentBoard: {
  _id: string;
  columns: Array<{
   _id: string;
   cards?: Array<{_id: string}>;
  }>;
 };
}

jest.mock("../../../redux/cards/operations", () => ({
 deleteCard: jest.fn(),
 editCard: jest.fn(),
}));
jest.mock("../../../redux/boards/operations", () => ({
 getBoardById: jest.fn(),
}));

// Create a mock store
const createMockStore = (initialState = {}) =>
 configureStore({
  reducer: {
   boards: (
    state: BoardState = {
     currentBoard: {
      _id: "board-1",
      columns: [{_id: "column-1"}],
     },
     ...initialState,
    },
    action: AnyAction
   ) => {
    if (action.type === "boards/deleteCard/fulfilled" || action.type === "boards/editCard/fulfilled") {
     return {
      ...state,
      currentBoard: {
       ...state.currentBoard,
       columns: state.currentBoard.columns.map((col) => ({
        ...col,
        cards: (col.cards || []).filter((card) => card._id !== action.payload?._id),
       })),
      },
     };
    }
    return state;
   },
  },
 });

const mockStore = createMockStore();

// Mock dispatch function
jest.mock("react-redux", () => ({
 ...jest.requireActual("react-redux"),
 useDispatch: () => jest.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
 return render(
  <Provider store={mockStore}>
   <SnackbarProvider>
    <DragDropContext onDragEnd={() => {}}>
     <Droppable droppableId="test-droppable">
      {(provided) => (
       <div
        ref={provided.innerRef}
        {...provided.droppableProps}
       >
        {component}
        {provided.placeholder}
       </div>
      )}
     </Droppable>
    </DragDropContext>
   </SnackbarProvider>
  </Provider>
 );
};

describe("Card Component", () => {
 const mockProps = {
  _id: "test-card-1",
  title: "Test Card",
  description: "Test Description",
  index: 0,
  columnId: "column-1",
  boardId: "board-1",
 };

 it("renders card with title and description", () => {
  renderWithProviders(<Card {...mockProps} />);

  expect(screen.getByText("Test Card")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
 });

 it("opens edit modal when edit button is clicked", () => {
  renderWithProviders(<Card {...mockProps} />);

  const editButton = screen.getByLabelText("Edit card");
  fireEvent.click(editButton);

  expect(screen.getByText("Edit Card")).toBeInTheDocument();
 });

 it("opens delete dialog when delete button is clicked", () => {
  renderWithProviders(<Card {...mockProps} />);

  const deleteButton = screen.getByLabelText("Delete card");
  fireEvent.click(deleteButton);

  expect(screen.getByText("Delete Card")).toBeInTheDocument();
  expect(screen.getByText("Are you sure you want to delete this card?")).toBeInTheDocument();
 });

 it("calls deleteCard when confirming deletion", async () => {
  const mockDeleteCard = jest.fn().mockResolvedValueOnce(mockProps);
  (deleteCard as unknown as jest.Mock).mockReturnValue(mockDeleteCard);

  renderWithProviders(<Card {...mockProps} />);

  const deleteButton = screen.getByLabelText("Delete card");
  fireEvent.click(deleteButton);

  const confirmButton = screen.getByText("Yes, I want to delete");
  fireEvent.click(confirmButton);

  await waitFor(() => {
   expect(mockDeleteCard).toHaveBeenCalledWith({
    boardId: mockProps.boardId,
    columnId: mockProps.columnId,
    _id: mockProps._id,
   });
  });
 });

 it("calls editCard when saving edits", async () => {
  const updatedTitle = "Updated Title";
  const updatedDescription = "Updated Description";

  const mockEditCard = jest.fn().mockResolvedValueOnce({
   ...mockProps,
   title: updatedTitle,
   description: updatedDescription,
  });
  (editCard as unknown as jest.Mock).mockReturnValue(mockEditCard);

  renderWithProviders(<Card {...mockProps} />);

  const editButton = screen.getByLabelText("Edit card");
  fireEvent.click(editButton);

  const titleInput = screen.getByDisplayValue(mockProps.title);
  const descriptionInput = screen.getByDisplayValue(mockProps.description);

  fireEvent.change(titleInput, {target: {value: updatedTitle}});
  fireEvent.change(descriptionInput, {target: {value: updatedDescription}});

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  await waitFor(() => {
   expect(mockEditCard).toHaveBeenCalledWith({
    boardId: mockProps.boardId,
    columnId: mockProps.columnId,
    _id: mockProps._id,
    title: updatedTitle,
    description: updatedDescription,
   });
  });
 });

 it("handles error when deleting card fails", async () => {
  const mockError = new Error("Failed to delete card");
  const mockDeleteCard = jest.fn().mockRejectedValueOnce(mockError);
  (deleteCard as unknown as jest.Mock).mockReturnValue(mockDeleteCard);

  renderWithProviders(<Card {...mockProps} />);

  const deleteButton = screen.getByLabelText("Delete card");
  fireEvent.click(deleteButton);

  const confirmButton = screen.getByText("Yes, I want to delete");
  fireEvent.click(confirmButton);

  await waitFor(() => {
   expect(mockDeleteCard).toHaveBeenCalledWith({
    boardId: mockProps.boardId,
    columnId: mockProps.columnId,
    _id: mockProps._id,
   });
  });
 });

 it("handles error when editing card fails", async () => {
  const mockError = new Error("Failed to edit card");
  const mockEditCard = jest.fn().mockRejectedValueOnce(mockError);
  (editCard as unknown as jest.Mock).mockReturnValue(mockEditCard);

  renderWithProviders(<Card {...mockProps} />);

  const editButton = screen.getByLabelText("Edit card");
  fireEvent.click(editButton);

  const titleInput = screen.getByDisplayValue(mockProps.title);
  const updatedTitle = "Updated Title";
  fireEvent.change(titleInput, {target: {value: updatedTitle}});

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  await waitFor(() => {
   expect(mockEditCard).toHaveBeenCalledWith({
    boardId: mockProps.boardId,
    columnId: mockProps.columnId,
    _id: mockProps._id,
    title: updatedTitle,
    description: mockProps.description,
   });
  });
 });
});
