const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.ACCOUNT_MONGO_DB}:${process.env.PASSWORD_MONGO_DB}@cluster0.mratp.mongodb.net/moon-social?retryWrites=true&w=majority`,
    () => {
      console.log("Database connected");
    }
  )
  .catch((err) => {
    console.log("Database connect error: ", err);
  });

// mongodb://localhost:27017/moon-project

module.exports = mongoose;
