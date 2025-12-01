import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
    },
    amount: {
      type: Number,
      require: true,
    },
    balanceAfter: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
      maxLength: 200,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, createdAt: -1 });
export const transfer=mongoose.model('transfer',transactionSchema)