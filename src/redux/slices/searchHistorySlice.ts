import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface SearchHistoryState {
  value: string[];
}

const initialState: SearchHistoryState = {
  value: [],
};

export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    // add a new item to the search history that is max 20 items long and deduped
    addSearchHistoryItem: (state, action: PayloadAction<string>) => {
      const newArr = [...new Set([action.payload, ...state.value])];
      // limit to 20 items
      newArr.length = Math.min(newArr.length, 20);
      state.value = newArr;
    },
    // remove an item from the search history
    removeSearchHistoryItem: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => item !== action.payload);
    },
    // remove all items from the search history
    clearSearchHistory: (state) => {
      state.value = [];
    },
    // set the search history to a new array of items
    setSearchHistory: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const {
  addSearchHistoryItem,
  removeSearchHistoryItem,
  clearSearchHistory,
  setSearchHistory,
} = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
