import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  page: 0,
  limit: 10,
  hasMore: true,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setProducts, setPage, setLimit, setHasMore} = adminSlice.actions;

export default adminSlice.reducer;
