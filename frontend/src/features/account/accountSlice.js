
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBalanceApi, transferAmountApi } from "./accountAPI";

export const fetchBalance = createAsyncThunk(
  "account/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getBalanceApi();
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);


export const transferAmount = createAsyncThunk(
  "account/transferAmount",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await transferAmountApi(payload);
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Transfer failed");
    }
  }
);


const accountSlice = createSlice({
  name: "account",
  initialState: {
    balance: 0,
    status: "idle",
    transferStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload.balance;
        state.firstname=action.payload.firstname;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

     
      .addCase(transferAmount.pending, (state) => {
        state.transferStatus = "loading";
      })
      .addCase(transferAmount.fulfilled, (state) => {
        state.transferStatus = "succeeded";
      })
      .addCase(transferAmount.rejected, (state, action) => {
        state.transferStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
