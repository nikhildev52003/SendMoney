import axios from "axios";
import { USER_BACKEND_URL } from "../../config/config";

axios.defaults.withCredentials = true;

export const getBalanceApi = async () => {
  const token = localStorage.getItem("token");

  const fullUrl = `${USER_BACKEND_URL}/api/v1/account/balance`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const { data } = await axios.get(fullUrl, {
      headers: headers,
      withCredentials: true,
    });
    console.log("API Success Response Data:", data);
    return data;
  } catch (error) {
    console.error("API Error: getBalanceApi failed.", error.message);

    throw error;
  }
};

export const transferAmountApi = async (payload) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.post(
      `${USER_BACKEND_URL}/api/v1/account/transfer`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("✅ Transfer Successful:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ API Error: transferAmountApi failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
