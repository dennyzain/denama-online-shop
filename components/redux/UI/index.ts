import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CartState {
  isCart: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  isCart: false,
};

export const uiSlice = createSlice({
  name: 'UI',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showCart: (state, action: PayloadAction<boolean>) => {
      state.isCart = action.payload;
    },
  },
});

export const { showCart } = uiSlice.actions;

export default uiSlice.reducer;
