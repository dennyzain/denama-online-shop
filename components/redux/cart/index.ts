import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CartState {
  isCart: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  isCart: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    cartIsOpen: (state) => {
      state.isCart = true;
    },
  },
});

export const { cartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
