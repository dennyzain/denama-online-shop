import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '../../interfaces/Cart';
import { IProduct } from '../../interfaces/Product';

// Define the initial state using that type
const initialState: ICart = {
  cartItems: [],
  cartTotalPrice: 0,
  cartQuantity: 0,
};

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadCartFromLocalStorage: (state, action: PayloadAction<ICart>) => {
      Object.assign(state, action.payload);
    },
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      const product = { ...action.payload, amount: 1, totalPrice: action.payload.price };
      state.cartItems.push(product);
      state.cartTotalPrice += product.totalPrice;
      state.cartQuantity += product.amount;
      localStorage.setItem('CART', JSON.stringify(state));
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const existProductIndex = state.cartItems.findIndex((item) => item.id === action.payload);
      state.cartTotalPrice -= state.cartItems[existProductIndex].totalPrice;
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartQuantity--;
      localStorage.setItem('CART', JSON.stringify(state));
    },
    increaseProductAmount: (state, action: PayloadAction<number>) => {
      const existProductIndex = state.cartItems.findIndex((item) => item.id === action.payload);
      const cartItems = [...state.cartItems];
      cartItems[existProductIndex].totalPrice += cartItems[existProductIndex].price;
      cartItems[existProductIndex].amount++;
      state.cartItems = cartItems;
      state.cartTotalPrice += cartItems[existProductIndex].price;
      localStorage.setItem('CART', JSON.stringify(state));
    },
    decreaseProductAmount: (state, action: PayloadAction<number>) => {
      const existProductIndex = state.cartItems.findIndex((item) => item.id === action.payload);
      const cartItems = [...state.cartItems];
      if (cartItems[existProductIndex].amount > 1) {
        cartItems[existProductIndex].totalPrice -= cartItems[existProductIndex].price;
        cartItems[existProductIndex].amount--;
        state.cartItems = cartItems;
        state.cartTotalPrice -= cartItems[existProductIndex].price;

        localStorage.setItem('CART', JSON.stringify(state));
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  loadCartFromLocalStorage,
  increaseProductAmount,
  decreaseProductAmount,
} = productSlice.actions;

export default productSlice.reducer;
