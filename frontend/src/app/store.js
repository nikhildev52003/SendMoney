import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import transactionReducer  from '../features/transactioHistory_api/transactionSclice'
export const store = configureStore({
  reducer: {
    account: accountReducer,
    transaction:transactionReducer
  },
});
