import { Account, User } from "../model/userSchema.js";
import { transfer } from "../model/Transaction.js";
import mongoose from "mongoose";

export const fetchBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId })
      .populate("userId", "firstname")
      .lean();

    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }
    console.log(account.userId.firstname);

    res.status(200).json({
      balance: account.balance,
      firstname: account.userId.firstname,
      Message: "Balance fetch successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const TransferAmount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to, note } = req.body;

    const senderaccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!senderaccount || senderaccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const receiverUser = await User.findOne({ username: to }).session(session);
    if (!receiverUser) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User not found" });
    }

    const receiverAccount = await Account.findOne({
      userId: receiverUser._id,
    }).session(session);
    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "No user account found" });
    }
    const senderNewbalance = senderaccount.balance - amount;
    const receiverNewbalance = receiverAccount.balance + amount;

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: receiverUser._id },
      { $inc: { balance: amount } }
    ).session(session);

    await transfer.create(
      [
        {
          userId: req.userId,
          amount,
          type: "debit",
          note,
          to: receiverUser._id,
          balanceAfter: senderNewbalance,
          description: "Money Sent",
        },
        {
          userId: receiverUser._id,
          amount,
          type: "credit",
          note,
          from: req.userId,
          balanceAfter: receiverNewbalance,
          description: "Money Recived",
        },
      ],
      { session, ordered: true }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Transfer failed", error: error.message });
  }
};

export const TransactionHstry = async (req, res) => {
  try {
    const transactionHistory = await transfer
      .find({ userId: req.userId })
      .populate("to", "username")
      .populate("from", "username")
      .select("type amount balanceAfter note to from createdAt")
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      transactions: transactionHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction history",
    });
  }
};
