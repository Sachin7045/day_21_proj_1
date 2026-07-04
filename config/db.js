const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Unable to connect database:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;