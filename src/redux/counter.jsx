import { createSlice } from '@reduxjs/toolkit';
import Receipt from '../pages/receipt/Receipt';
// import Receipt from '../pages/receipt/receipt';


export const counterSlice = createSlice({
  name: 'bought',
  initialState: {
    
    purchases: [],
    receipt: []
    
  
  },
  reducers: {
    addtoPurchase: (state, action)=>{
           
            const items = state.purchases.find(item => item._id === action.payload)
            if(items){

              state.purchases.quantity += action.payload.quantity
            }else{
             
              state.purchases.push(action.payload)
            }
           
    },

addtoReceipt: (state, action) => {
  const receiptItem = state.purchases.find(item => item._id === action.payload._id);
  
  if (receiptItem) {
    state.receipt = [receiptItem]; // Replace the receipt with the new item
  } else {
    state.receipt = []; // Clear the receipt if the item is not found
  }
}
,
    
    deleteAll: (state, action) => {
     state.purchases = []
    },
    deleteRceipt: (state, action) => {
      state.receipt = []
     },
  },
  
});

// Action creators are generated for each case reducer function
export const { addtoPurchase, deleteAll, addtoReceipt , deleteRceipt} = counterSlice.actions;

export default counterSlice.reducer;