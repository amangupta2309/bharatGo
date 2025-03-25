import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";

// Define the shape of a cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
  amount: number;
  image: string
  // Add other properties as needed (e.g., image, description)
}

// Define the cart state
interface CartState {
  items: CartItem[];
  totalAmount: number;
  cartChanged: boolean;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalAmount: 0,
  cartChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },

    
    add(state, action: PayloadAction<CartItem>) {
      console.log("triggered")
      const prevTotalAmount = state.totalAmount;
      const updatedAmount = prevTotalAmount + action.payload.price * action.payload.amount;
      const updatedCartAmount = parseFloat(updatedAmount.toFixed(2));
      let updatedItems: CartItem[];

      const existedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existedItemIndex !== -1) {
        const existedItem = state.items[existedItemIndex];

        const updatedItem = {
          ...existedItem,
          amount: action.payload.amount + existedItem.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existedItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.payload];
      }
      state.cartChanged = true;
      state.totalAmount = updatedCartAmount;
      state.items = updatedItems;
    },

    remove(state, action: PayloadAction<{ id: number }>) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems: CartItem[];

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      state.cartChanged = true;
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => initialState);
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
export type RootCartState = ReturnType<typeof cartSlice.reducer>