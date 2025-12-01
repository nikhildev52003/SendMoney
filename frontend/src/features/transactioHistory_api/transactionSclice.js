import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionApi } from "./transctionApi";

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async () => {
    const data = await getTransactionApi();
    return data; 
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload; // ✅ Store transactions here
      })
      .addCase(fetchTransaction.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default transactionSlice.reducer;
