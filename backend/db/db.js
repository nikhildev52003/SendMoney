import mongoose from "mongoose";

export async function db(url) {
  try {
    await mongoose.connect(url);
    console.log("Ddatabase connected ");
  } catch (err) {
    console.error("Database connection failed",err);
    process.exit(1);
  }
}
