// transactionApi.js
import axios from "axios";
import { USER_BACKEND_URL } from "../../config/config";

export const getTransactionApi = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `${USER_BACKEND_URL}/api/v1/account/transaction`,
    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
  );
  return data.transactions; 
};
