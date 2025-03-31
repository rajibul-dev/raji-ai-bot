import mongoose from "mongoose";

async function connectDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

export default connectDB;
