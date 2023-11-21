import { CreateSlice, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProducts: (state, action) => {
      // console.log(action);
      state.productList = [...action.payload];
    },

    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      console.log(check);
      if (check) {
        toast("Already in Cart");
      } else {
        toast("Item Added Successfully");
        const total = action.payload.price;
        const index = state.cartItem.findIndex(
          (e1) => e1._id === action.payload
        );

        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },

    deleteCartItem: (state, action) => {
      // console.log(action);

      const index = state.cartItem.findIndex((e1) => e1._id === action.payload);
      state.cartItem.splice(index, 1);

      toast("One Item Deleted");
    },

    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((e1) => e1._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price
      const total = price*qtyInc

      state.cartItem[index].total = total;

    },

    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((e1) => e1._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price
        const total = price*qtyDec
  
        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDataProducts,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
