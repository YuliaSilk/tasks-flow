import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { ColumnProps } from '../../types/types';
import { getAllColumns, getColumnsById, getColumnsAndCardsByBoardId } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
interface ColumnsState {
  columns: ColumnProps[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ColumnsState = {
  columns: [] as ColumnProps[], 
  isLoading: false,
  error: null as string | null,
};

const columnSlice = createSlice({
  name: 'columns',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColumnsById.pending, handlePending)
      .addCase(getColumnsById.rejected, handleRejected)
      .addCase(getColumnsById.fulfilled, (state, action: PayloadAction<ColumnProps>) => {
        state.isLoading = false;
        state.error = null;

        // Додаємо колонку в масив колонок, якщо її там ще немає
        const existingColumnIndex = state.columns.findIndex(column => column._id === action.payload._id);
        if (existingColumnIndex === -1) {
          state.columns.push(action.payload);
        } else {
          // Можна оновити існуючу колонку, якщо це потрібно
          state.columns[existingColumnIndex] = action.payload;
        }

        console.log('getColumnsById.fulfilled: ', action.payload);
      })
      // .addCase(getColumnsById.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = null;
      //   state.columns = action.payload;
        // if (!Array.isArray(action.payload)) {
        //   console.error('Payload is not an array: ', action.payload);
        // }
        // console.log('getColumnsById.fulfilled: ', action.payload);
      // })
      .addCase(getAllColumns.pending, handlePending)
      .addCase(getAllColumns.rejected, handleRejected)
      .addCase(getAllColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.columns = action.payload;
        console.log('getAllColumns.fulfilled: ', action.payload);
      })
      .addCase(getColumnsAndCardsByBoardId.pending, handlePending)
      .addCase(getColumnsAndCardsByBoardId.fulfilled, handleRejected)
      .addCase(getColumnsAndCardsByBoardId.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load columns and cards';
      });
  },
});

export const columnReducer = columnSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { ColumnProps } from '../../types/types';
// import { getAllColumns,  getColumnsById, getColumnsAndCardsByBoardId } from './operations';


// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };
// const initialState = {
//   columns: [] as ColumnProps[],
//   isLoading: false,
//   error: null as string | null,
// };

// const columnSlice = createSlice({
//     name: 'columns',

//     initialState: 
//     {
//       columns: [{
//         _id: '',
//         name: 'To Do',
//         card: [{
//           _id: '',
//           title: '',
//           description: '',
//           boardId: '',
//           columnId: '',
//         }],
//       }] as ColumnProps[],
//       isLoading: false,
//       error: null as string | null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//       .addCase(getColumnsById.pending, handlePending)
//       .addCase(getColumnsById.rejected, handleRejected)
//       .addCase(getColumnsById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         state.columns = action.payload;
//         if (Array.isArray(action.payload)) {
//           state.columns = action.payload;
//         } else {
//           console.error('Payload is not an array: ', action.payload);
//         }
//         console.log('getColumnsById.fulfilled: ', action.payload);
//       })

//       .addCase(getAllColumns.pending, handlePending)
//       .addCase(getAllColumns.rejected, handleRejected)
//       .addCase(getAllColumns.fulfilled, (state, action) => {
//           state.isLoading = false;
//           state.error = null;
//           state.columns = action.payload;
//           console.log('getAllColumns.fulfilled: ', action.payload);
//         })

//         .addCase(getColumnsAndCardsByBoardId.pending, handlePending)
//         .addCase(getColumnsAndCardsByBoardId.fulfilled, handleRejected)
//         .addCase(getColumnsAndCardsByBoardId.rejected, (state, action) => {
//           state.error = action.error.message || 'Failed to load columns and cards'; 
//         })
        
//         ;
//     },
//   });
  

// export const columnReducer = columnSlice.reducer;