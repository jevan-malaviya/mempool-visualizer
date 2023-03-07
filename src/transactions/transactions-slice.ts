import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionsState {
  transactions: string[];
}

const initialState: TransactionsState = {
  transactions: []
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addPending(state, tx) {
      state.transactions.push(tx.payload);
    },
    removePending() {{

    }}
  }
});

export const { addPending } = transactionsSlice.actions;
export default transactionsSlice.reducer;