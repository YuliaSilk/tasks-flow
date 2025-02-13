

# Tasks Folw Application

This project is a task management application that allows users to create boards with columns and cards. Users can drag and drop cards between columns and boards, and perform CRUD operations on both boards and cards. The project is built with React, TypeScript, Redux Toolkit, and Tailwind CSS, and includes drag-and-drop functionality powered by `react-beautiful-dnd`.

## Features

- **Create, Read, Update, Delete (CRUD) Operations**: Users can manage boards, columns, and cards.
- **Drag-and-Drop**: Cards can be moved between columns using drag-and-drop functionality.
- **Responsive Design**: The layout is fully responsive, ensuring a good user experience on both mobile and desktop devices.
- **Loading Spinner**: A loader is displayed while data is being fetched or while cards are being dragged between columns.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Redux Toolkit
- **Drag-and-Drop**: `react-beautiful-dnd`
- **State Management**: Redux Toolkit with `createAsyncThunk` for async actions
- **UI Components**: Material-UI (MUI) and custom reusable components
- **HTTP Client**: Axios for API requests

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject

	2.	Install dependencies:
Make sure you have Node.js installed, then run:

npm install


	3.	Create a .env file:
Add your environment variables such as API base URL:

REACT_APP_API_URL=http://localhost:3000/api


	4.	Run the application:
Start the development server:

npm start

The app should now be running on http://localhost:3000.

### Available Scripts

In the project directory, you can run the following scripts:

npm start

Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

npm test

Launches the test runner.

npm run build

Builds the app for production to the build folder.

npm run lint

Runs the linter to check for TypeScript and JavaScript errors.

## Usage

Boards and Columns

	•	When a board is created, it automatically comes with three columns: “TODO”, “IN_PROGRESS”, and “DONE”.
	•	You can create, edit, and delete boards from the UI.
	•	Cards can be dragged and dropped between columns.

### Drag and Drop

The app supports drag-and-drop functionality using the react-beautiful-dnd library. Cards can be moved between columns and reordered within a column.

### Loading State

The app uses a DotLoader spinner from react-spinners to indicate when data is being fetched or when an action is in progress (such as dragging and dropping cards).

### Error Handling

Errors during API requests are caught and logged to the console. In future iterations, user-friendly error messages could be displayed in the UI.

Redux Store Structure

The project uses Redux Toolkit’s createSlice and createAsyncThunk for managing state and handling async operations. The store is structured as follows:

	•	Boards: Manages boards, columns, and cards data.
	•	Cards: Handles CRUD operations and drag-and-drop updates for cards.

### Example Redux Structure

{
  boards: {
    currentBoard: {
      _id: string;
      title: string;
      columns: [
        {
          _id: string;
          name: string;
          cards: [
            {
              _id: string;
              title: string;
              description: string;
            }
          ];
        }
      ];
    };
  },
  cards: {
    isLoading: boolean;
    error: string | null;
  }
}

### Optimistic Updates

For drag-and-drop functionality, the app implements optimistic updates. When a card is dragged and dropped into a new column, the UI updates instantly without waiting for the backend response. If the backend request fails, the state can be rolled back to its previous state.

Future Improvements

	•	Error Handling: Improve UI feedback for errors, such as showing error messages to the user when a request fails.
	•	Undo Feature: Add the ability to undo actions (like moving a card) in case of user mistakes.
	•	Testing: Add more unit and integration tests to ensure code reliability.

### Contributing

If you’d like to contribute to the project:

	1.	Fork the repository.
	2.	Create a new feature branch: git checkout -b feature/my-new-feature.
	3.	Commit your changes: git commit -m 'Add some feature'.
	4.	Push to the branch: git push origin feature/my-new-feature.
	5.	Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

