import client from "./client";

export const getReceipt = async ({ receiptNumber }) => {
  try {
    const res = await client.get(`/orders/receipt/${receiptNumber}`);
    const receipt = res.data.receipt;
    console.log('Receipt:', receipt);
    return { receipt, error: null };
  } catch (err) {
    return { receipt: {}, error: err.response.data.message };
  }
};
