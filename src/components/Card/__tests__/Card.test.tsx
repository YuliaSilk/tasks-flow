import React from "react";
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import Card from "../Card";
import {SnackbarProvider} from "notistack";
import {DeleteCardProps, EditCardProps} from "../../../types/interfaces";

const mockDeleteCard = jest.fn().mockImplementation(() => Promise.resolve({unwrap: () => Promise.resolve()}));
const mockEditCard = jest.fn().mockImplementation(() => Promise.resolve({unwrap: () => Promise.resolve()}));
const mockGetBoardById = jest.fn().mockImplementation(() => Promise.resolve({unwrap: () => Promise.resolve()}));

jest.mock("../../../redux/cards/operations", () => ({
 deleteCard: (args: DeleteCardProps) => mockDeleteCard(args),
 editCard: (args: EditCardProps) => mockEditCard(args),
}));

jest.mock("../../../redux/boards/operations", () => ({
 getBoardById: (id: string) => mockGetBoardById(id),
}));

const mockDispatch = jest.fn((action) => {
 if (typeof action === "function") {
  const result = action(mockDispatch);
  if (result && typeof result.then === "function") {
   return Promise.resolve({
    unwrap: () => result,
   });
  }
  return result;
 }
 return action;
});

const mockStore = configureStore({
 reducer: {
  boards: (
   state = {
    currentBoard: {
     _id: "board-1",
     columns: [{_id: "column-1"}],
    },
   }
  ) => state,
  cards: (state = {}) => state,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   thunk: {
    extraArgument: {
     dispatch: mockDispatch,
    },
   },
  }),
});

jest.mock("react-redux", () => ({
 ...jest.requireActual("react-redux"),
 useDispatch: () => mockDispatch,
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
  boardId: "board-1",
  columnId: "column-1",
 };

 beforeEach(() => {
  jest.clearAllMocks();
 });

 it("renders card with title and description", async () => {
  renderWithProviders(<Card {...mockProps} />);

  await waitFor(() => {
   expect(screen.getByText("Test Card")).toBeInTheDocument();
   expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
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
  mockDeleteCard.mockResolvedValueOnce({success: true});

  renderWithProviders(<Card {...mockProps} />);

  const deleteButton = screen.getByLabelText("Delete card");
  fireEvent.click(deleteButton);

  const confirmButton = screen.getByText("Yes, I want to delete");
  fireEvent.click(confirmButton);

  await waitFor(() => {
   expect(mockDispatch).toHaveBeenCalled();
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

  mockEditCard.mockResolvedValueOnce({
   ...mockProps,
   title: updatedTitle,
   description: updatedDescription,
  });

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
   expect(mockDispatch).toHaveBeenCalled();
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
  mockDeleteCard.mockImplementationOnce(() =>
   Promise.resolve({
    unwrap: () => Promise.reject(new Error("Failed to delete card")),
   })
  );

  renderWithProviders(<Card {...mockProps} />);

  const deleteButton = screen.getByRole("button", {name: /delete card/i});
  fireEvent.click(deleteButton);

  const confirmButton = screen.getByRole("button", {name: /yes, i want to delete/i});
  await act(async () => {
   fireEvent.click(confirmButton);
  });

  expect(mockDeleteCard).toHaveBeenCalledWith({
   boardId: mockProps.boardId,
   columnId: mockProps.columnId,
   _id: mockProps._id,
  });

  await waitFor(() => {
   expect(screen.getByText("Error deleting card!")).toBeInTheDocument();
  });
 });

 it("handles error when editing card fails", async () => {
  mockEditCard.mockImplementationOnce(() =>
   Promise.resolve({
    unwrap: () => Promise.reject(new Error("Failed to edit card")),
   })
  );

  renderWithProviders(<Card {...mockProps} />);

  const editButton = screen.getByRole("button", {name: /edit card/i});
  fireEvent.click(editButton);

  const saveButton = screen.getByRole("button", {name: /save/i});
  await act(async () => {
   fireEvent.click(saveButton);
  });

  expect(mockEditCard).toHaveBeenCalledWith({
   boardId: mockProps.boardId,
   columnId: mockProps.columnId,
   _id: mockProps._id,
   title: mockProps.title,
   description: mockProps.description,
  });

  await waitFor(() => {
   expect(screen.getByText("Error editing card!")).toBeInTheDocument();
  });
 });
});
